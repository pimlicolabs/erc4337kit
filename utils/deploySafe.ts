import { SafeAccountConfig, SafeFactory } from "@safe-global/protocol-kit"
import { EthersAdapter } from "@safe-global/protocol-kit"
import { ethers } from "ethers"
import hre from "hardhat"
import "@nomiclabs/hardhat-ethers"

// This file can be used to play around with the Safe Core SDK

const entryPointAddress = "0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789"

if (process.env.SIGNER_PRIVATE_KEY === undefined) {
    throw new Error("SIGNER_PRIVATE_KEY not set")
}

const wallet = new ethers.Wallet(process.env.SIGNER_PRIVATE_KEY, hre.ethers.provider)
interface Config {
    RPC_URL: string
    DEPLOYER_ADDRESS_PRIVATE_KEY: string
    DEPLOY_SAFE: {
        OWNERS: string[]
        THRESHOLD: number
        SALT_NONCE: string
    }
}

const config: Config = {
    RPC_URL: "https://goerli.rpc.thirdweb.com/",
    DEPLOYER_ADDRESS_PRIVATE_KEY: wallet.privateKey,
    DEPLOY_SAFE: {
        OWNERS: [wallet.address],
        THRESHOLD: 1, // <SAFE_THRESHOLD>
        SALT_NONCE: "313287"
    }
}

async function deploy4337Module() {
    const erc4337ModuleAndHandlerFactory = (await hre.ethers.getContractFactory("Test4337ModuleAndHandler")).connect(
        wallet
    )
    const erc4337ModuleAndHandler = await erc4337ModuleAndHandlerFactory.deploy(entryPointAddress)
    console.log("deployed erc4337moduleAndHandler", erc4337ModuleAndHandler.address)
    throw new Error("stop")
}

const goerliModule = "0x86A74784381f8A28465383a6cA40C82d28f9895f"

async function main() {
    // await deploy4337Module()
    //const provider = new ethers.providers.JsonRpcProvider(config.RPC_URL)
    const provider = hre.ethers.provider
    const deployerSigner = new ethers.Wallet(config.DEPLOYER_ADDRESS_PRIVATE_KEY, provider)

    // Create EthAdapter instance
    const ethAdapter = new EthersAdapter({
        ethers,
        signerOrProvider: deployerSigner
    })

    // Create SafeFactory instance
    const safeFactory = await SafeFactory.create({ ethAdapter })

    // Config of the deployed Safe
    const safeAccountConfig: SafeAccountConfig = {
        owners: config.DEPLOY_SAFE.OWNERS,
        threshold: config.DEPLOY_SAFE.THRESHOLD,
        fallbackHandler: goerliModule
    }
    const saltNonce = config.DEPLOY_SAFE.SALT_NONCE

    // Predict deployed address
    const predictedDeploySafeAddress = await safeFactory.predictSafeAddress(safeAccountConfig, saltNonce)

    console.log("Predicted deployed Safe address:", predictedDeploySafeAddress)

    function callback(txHash: string) {
        console.log("Transaction hash:", txHash)
    }

    // Deploy Safe
    const safe = await safeFactory.deploySafe({
        safeAccountConfig,
        saltNonce,
        callback
    })

    console.log("Deployed Safe:", await safe.getAddress())
}

main()
