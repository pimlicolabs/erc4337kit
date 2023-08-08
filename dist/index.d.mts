import { PublicClient, HttpTransport } from 'viem';
import { ethers } from 'ethers';
import Safe from '@safe-global/protocol-kit';

interface UserOperationData {
    to: string;
    data: string;
    value: bigint;
    isSponsored: boolean;
}
interface UserOperation {
    sender: string;
    nonce: bigint;
    initCode: string;
    callData: string;
    callGasLimit: bigint;
    verificationGasLimit: bigint;
    preVerificationGas: bigint;
    maxPriorityFeePerGas: bigint;
    maxFeePerGas: bigint;
    paymasterAndData: string;
    signature: string;
}
declare class PimlicoRelay {
    apiKey: string;
    provider: ethers.providers.Provider;
    safeSDK: Safe;
    static entryPointAddress: `0x${string}`;
    static erc4337moduleAddress: `0x${string}`;
    chainIdToChainName: Record<number, string>;
    getPimlicoBundlerProvider(chainId: number): PublicClient<HttpTransport, undefined>;
    getPimlicoPaymasterProvider(chainId: number): PublicClient<HttpTransport, undefined>;
    constructor(apiKey: string, provider: ethers.providers.Provider, safeSDK: Safe);
    private getNonce;
    private verify4337ModuleEnabled;
    createUserOperation(data: UserOperationData): Promise<UserOperation>;
    relayUserOperation(userOperation: UserOperation): Promise<string>;
    waitForUserOperationReceipt(opHash: string): Promise<any>;
}

export { PimlicoRelay, UserOperation, UserOperationData };
