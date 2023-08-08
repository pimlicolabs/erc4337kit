import { getContract, createPublicClient, http, encodeFunctionData, PublicClient, HttpTransport, Chain } from "viem"
import { EntryPointAbi } from "../EntryPointAbi"
import { ethers } from "ethers"
import Safe from "@safe-global/protocol-kit"

export interface UserOperationData {
    to: string
    data: string
    value: bigint
    isSponsored: boolean
}

export interface UserOperation {
    sender: string
    nonce: bigint
    initCode: string
    callData: string
    callGasLimit: bigint
    verificationGasLimit: bigint
    preVerificationGas: bigint
    maxPriorityFeePerGas: bigint
    maxFeePerGas: bigint
    paymasterAndData: string
    signature: string
}

export class PimlicoRelay {
    apiKey: string
    provider: ethers.providers.Provider
    safeSDK: Safe
    static entryPointAddress: `0x${string}` = "0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789"
    static erc4337moduleAddress: `0x${string}` = "0x86A74784381f8A28465383a6cA40C82d28f9895f"

    chainIdToChainName: Record<number, string> = {
        5: "goerli",
        80001: "mumbai",
        137: "polygon",
        100: "gnosis"
    }

    getPimlicoBundlerProvider(chainId: number): PublicClient<HttpTransport, undefined> {
        const chainName = this.chainIdToChainName[chainId]

        return createPublicClient({
            transport: http(`https://api.pimlico.io/v1/${chainName}/rpc?apikey=${this.apiKey}`)
        })
    }

    getPimlicoPaymasterProvider(chainId: number): PublicClient<HttpTransport, undefined> {
        const chainName = this.chainIdToChainName[chainId]

        return createPublicClient({
            transport: http(`https://api.pimlico.io/v2/${chainName}/rpc?apikey=${this.apiKey}`)
        })
    }

    constructor(apiKey: string, provider: ethers.providers.Provider, safeSDK: Safe) {
        this.apiKey = apiKey
        this.provider = provider
        this.safeSDK = safeSDK
    }

    private async getNonce(sender: string) {
        const entryPoint = new ethers.Contract(PimlicoRelay.entryPointAddress, EntryPointAbi, this.provider)
        const nonce = await entryPoint.getNonce(sender, 0)

        return BigInt(nonce)
    }

    private async verify4337ModuleEnabled() {
        // verify it is even deployed
        const code = await this.provider.getCode(PimlicoRelay.erc4337moduleAddress)
        if (code === "0x") {
            throw new Error(`ERC4337 module at ${PimlicoRelay.erc4337moduleAddress} not deployed`)
        }

        const enabled = await this.safeSDK.isModuleEnabled(PimlicoRelay.erc4337moduleAddress)
        if (!enabled) {
            throw new Error(`ERC4337 module at ${PimlicoRelay.erc4337moduleAddress} not enabled for this Safe`)
        }
    }

    async createUserOperation(data: UserOperationData) {
        await this.verify4337ModuleEnabled()

        const sender = await this.safeSDK.getAddress()
        const chainId = await this.safeSDK.getChainId()

        const bundlerProvider = this.getPimlicoBundlerProvider(chainId)
        const paymasterProvider = this.getPimlicoPaymasterProvider(chainId)

        const abiItem = {
            inputs: [
                { name: "to", type: "address" },
                { name: "value", type: "uint256" },
                { name: "data", type: "bytes" }
            ],
            name: "execTransaction",
            type: "function"
        }

        const opCallData = encodeFunctionData({
            abi: [abiItem] as const,
            functionName: "execTransaction",
            args: [data.to, data.value, data.data]
        })

        const nonce = await this.getNonce(sender)
        const op: Partial<UserOperation> = {
            sender: sender,
            nonce: `0x${nonce.toString(16)}` as any,
            initCode: "0x",
            callData: opCallData,
            paymasterAndData: "0x",
            signature: "0x"
        }

        // @ts-ignore
        const gasPriceResponse: any = await bundlerProvider.request({ method: "pimlico_getUserOperationGasPrice" })
        const maxFeePerGas = gasPriceResponse.fast.maxFeePerGas
        const maxPriorityFeePerGas = gasPriceResponse.fast.maxPriorityFeePerGas
        op.maxFeePerGas = maxFeePerGas
        op.maxPriorityFeePerGas = maxPriorityFeePerGas

        if (data.isSponsored) {
            const sponsorResponse: any = await paymasterProvider.request({
                // @ts-ignore
                method: "pm_sponsorUserOperation",
                params: [
                    // @ts-ignore
                    { ...op, preVerificationGas: "0x1", verificationGasLimit: "0x1", callGasLimit: "0x1" },
                    PimlicoRelay.entryPointAddress
                ]
            })

            op.paymasterAndData = sponsorResponse.paymasterAndData
            op.preVerificationGas = sponsorResponse.preVerificationGas
            op.verificationGasLimit = sponsorResponse.verificationGasLimit
            op.callGasLimit = sponsorResponse.callGasLimit
        } else {
            const estimateResponse: any = await bundlerProvider.request({
                // @ts-ignore
                method: "eth_estimateUserOperationGas",
                // @ts-ignore
                params: [op, this.entryPointAddress]
            })
            op.preVerificationGas = estimateResponse.preVerificationGas
            op.verificationGasLimit = estimateResponse.verificationGasLimit
            op.callGasLimit = estimateResponse.callGasLimit
            op.paymasterAndData = "0x"
        }

        return op as UserOperation
    }

    async relayUserOperation(userOperation: UserOperation) {
        await this.verify4337ModuleEnabled()

        const chainId = await this.safeSDK.getChainId()
        const bundlerProvider = this.getPimlicoBundlerProvider(chainId)

        const opHash = await bundlerProvider.request({
            // @ts-ignore
            method: "eth_sendUserOperation",
            // @ts-ignore
            params: [userOperation, this.entryPointAddress]
        })
        return opHash as string
    }

    async waitForUserOperationReceipt(opHash: string) {
        const chainId = await this.safeSDK.getChainId()
        const bundlerProvider = this.getPimlicoBundlerProvider(chainId)

        let receipt: any
        receipt = await bundlerProvider.request({
            // @ts-ignore
            method: "eth_getUserOperationReceipt",
            // @ts-ignore
            params: [opHash]
        })
        while (!receipt) {
            await new Promise((resolve) => setTimeout(resolve, 500))
            receipt = await bundlerProvider.request({
                // @ts-ignore
                method: "eth_getUserOperationReceipt",
                // @ts-ignore
                params: [opHash]
            })
        }

        return receipt
    }
}
