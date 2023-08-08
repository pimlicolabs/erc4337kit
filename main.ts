import { ethers } from "ethers"
import Safe, { EthersAdapter } from "@safe-global/protocol-kit"
import { parseEther } from "viem"
import { PimlicoRelay, UserOperationData } from "./sdk/pimlicoRelay"

require("dotenv").config()

const PIMLICO_API_KEY = process.env.PIMLICO_API_KEY
if (!PIMLICO_API_KEY) {
    throw new Error("PIMLICO_API_KEY not set")
}

const RPC_URL = "https://goerli.rpc.thirdweb.com"
const provider = new ethers.providers.StaticJsonRpcProvider(RPC_URL)
const wallet = new ethers.Wallet("0x22a61c16b2fba3ee185d9bb17afdb5cb913456c0c20259f36e1f53770374cb81", provider)
const safeAddress = "0x1ca7f3F32A65e1CAa71DF6726cF4446524355F69"

// Create a transaction object
const safeTransactionData: UserOperationData = {
    to: "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045",
    data: "0x", // leave blank for ETH transfers
    value: parseEther("0.0005"),
    isSponsored: true
}

async function enableModuleIfNotEnabled(safeSdk: Safe) {
    const isEnabled = await safeSdk.isModuleEnabled(PimlicoRelay.erc4337moduleAddress)

    if (isEnabled) {
        console.log("ERC-4337 MODULE ENABLED")
        return
    }

    console.log("ERC-4337 MODULE NOT ENABLED")

    const safeTransaction = await safeSdk.createEnableModuleTx(PimlicoRelay.erc4337moduleAddress)
    const txResponse = await safeSdk.executeTransaction(safeTransaction)
    await txResponse.transactionResponse?.wait()
}

async function fundSafeIfNotFunded(safeSdk: Safe) {
    const addr = safeSdk.getAddress()

    const balance = await provider.getBalance(addr)

    if (balance.gt(ethers.utils.parseEther("0.1"))) {
        return
    }

    const tx = await wallet.sendTransaction({ to: addr, value: ethers.utils.parseEther("0.1") })
    await tx.wait()
}

async function relayTransaction() {
    const ethAdapter = new EthersAdapter({
        ethers,
        signerOrProvider: wallet
    })

    const safeSDK = await Safe.create({
        ethAdapter,
        safeAddress
    })

    await enableModuleIfNotEnabled(safeSDK)
    // await fundSafeIfNotFunded(safeSDK)

    // rome-ignore lint/style/noNonNullAssertion:
    const pimlicoRelay = new PimlicoRelay(PIMLICO_API_KEY!, wallet.provider, safeSDK)
    const op = await pimlicoRelay.createUserOperation(safeTransactionData)

    const useropHash = await pimlicoRelay.relayUserOperation(op)

    console.log(`userop ${useropHash}`)

    const rcp = await pimlicoRelay.waitForUserOperationReceipt(useropHash)
    console.log(rcp)
}

relayTransaction()
