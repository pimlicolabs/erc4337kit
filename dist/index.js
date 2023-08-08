"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// sdk/index.ts
var sdk_exports = {};
__export(sdk_exports, {
  PimlicoRelay: () => PimlicoRelay
});
module.exports = __toCommonJS(sdk_exports);

// sdk/pimlicoRelay.ts
var import_viem = require("viem");

// EntryPointAbi.ts
var EntryPointAbi = [
  {
    inputs: [
      {
        internalType: "uint256",
        name: "preOpGas",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "paid",
        type: "uint256"
      },
      {
        internalType: "uint48",
        name: "validAfter",
        type: "uint48"
      },
      {
        internalType: "uint48",
        name: "validUntil",
        type: "uint48"
      },
      {
        internalType: "bool",
        name: "targetSuccess",
        type: "bool"
      },
      {
        internalType: "bytes",
        name: "targetResult",
        type: "bytes"
      }
    ],
    name: "ExecutionResult",
    type: "error"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "opIndex",
        type: "uint256"
      },
      {
        internalType: "string",
        name: "reason",
        type: "string"
      }
    ],
    name: "FailedOp",
    type: "error"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "sender",
        type: "address"
      }
    ],
    name: "SenderAddressResult",
    type: "error"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "aggregator",
        type: "address"
      }
    ],
    name: "SignatureValidationFailed",
    type: "error"
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "preOpGas",
            type: "uint256"
          },
          {
            internalType: "uint256",
            name: "prefund",
            type: "uint256"
          },
          {
            internalType: "bool",
            name: "sigFailed",
            type: "bool"
          },
          {
            internalType: "uint48",
            name: "validAfter",
            type: "uint48"
          },
          {
            internalType: "uint48",
            name: "validUntil",
            type: "uint48"
          },
          {
            internalType: "bytes",
            name: "paymasterContext",
            type: "bytes"
          }
        ],
        internalType: "struct IEntryPoint.ReturnInfo",
        name: "returnInfo",
        type: "tuple"
      },
      {
        components: [
          {
            internalType: "uint256",
            name: "stake",
            type: "uint256"
          },
          {
            internalType: "uint256",
            name: "unstakeDelaySec",
            type: "uint256"
          }
        ],
        internalType: "struct IStakeManager.StakeInfo",
        name: "senderInfo",
        type: "tuple"
      },
      {
        components: [
          {
            internalType: "uint256",
            name: "stake",
            type: "uint256"
          },
          {
            internalType: "uint256",
            name: "unstakeDelaySec",
            type: "uint256"
          }
        ],
        internalType: "struct IStakeManager.StakeInfo",
        name: "factoryInfo",
        type: "tuple"
      },
      {
        components: [
          {
            internalType: "uint256",
            name: "stake",
            type: "uint256"
          },
          {
            internalType: "uint256",
            name: "unstakeDelaySec",
            type: "uint256"
          }
        ],
        internalType: "struct IStakeManager.StakeInfo",
        name: "paymasterInfo",
        type: "tuple"
      }
    ],
    name: "ValidationResult",
    type: "error"
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "preOpGas",
            type: "uint256"
          },
          {
            internalType: "uint256",
            name: "prefund",
            type: "uint256"
          },
          {
            internalType: "bool",
            name: "sigFailed",
            type: "bool"
          },
          {
            internalType: "uint48",
            name: "validAfter",
            type: "uint48"
          },
          {
            internalType: "uint48",
            name: "validUntil",
            type: "uint48"
          },
          {
            internalType: "bytes",
            name: "paymasterContext",
            type: "bytes"
          }
        ],
        internalType: "struct IEntryPoint.ReturnInfo",
        name: "returnInfo",
        type: "tuple"
      },
      {
        components: [
          {
            internalType: "uint256",
            name: "stake",
            type: "uint256"
          },
          {
            internalType: "uint256",
            name: "unstakeDelaySec",
            type: "uint256"
          }
        ],
        internalType: "struct IStakeManager.StakeInfo",
        name: "senderInfo",
        type: "tuple"
      },
      {
        components: [
          {
            internalType: "uint256",
            name: "stake",
            type: "uint256"
          },
          {
            internalType: "uint256",
            name: "unstakeDelaySec",
            type: "uint256"
          }
        ],
        internalType: "struct IStakeManager.StakeInfo",
        name: "factoryInfo",
        type: "tuple"
      },
      {
        components: [
          {
            internalType: "uint256",
            name: "stake",
            type: "uint256"
          },
          {
            internalType: "uint256",
            name: "unstakeDelaySec",
            type: "uint256"
          }
        ],
        internalType: "struct IStakeManager.StakeInfo",
        name: "paymasterInfo",
        type: "tuple"
      },
      {
        components: [
          {
            internalType: "address",
            name: "aggregator",
            type: "address"
          },
          {
            components: [
              {
                internalType: "uint256",
                name: "stake",
                type: "uint256"
              },
              {
                internalType: "uint256",
                name: "unstakeDelaySec",
                type: "uint256"
              }
            ],
            internalType: "struct IStakeManager.StakeInfo",
            name: "stakeInfo",
            type: "tuple"
          }
        ],
        internalType: "struct IEntryPoint.AggregatorStakeInfo",
        name: "aggregatorInfo",
        type: "tuple"
      }
    ],
    name: "ValidationResultWithAggregation",
    type: "error"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "userOpHash",
        type: "bytes32"
      },
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address"
      },
      {
        indexed: false,
        internalType: "address",
        name: "factory",
        type: "address"
      },
      {
        indexed: false,
        internalType: "address",
        name: "paymaster",
        type: "address"
      }
    ],
    name: "AccountDeployed",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [],
    name: "BeforeExecution",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "totalDeposit",
        type: "uint256"
      }
    ],
    name: "Deposited",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "aggregator",
        type: "address"
      }
    ],
    name: "SignatureAggregatorChanged",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "totalStaked",
        type: "uint256"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "unstakeDelaySec",
        type: "uint256"
      }
    ],
    name: "StakeLocked",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "withdrawTime",
        type: "uint256"
      }
    ],
    name: "StakeUnlocked",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address"
      },
      {
        indexed: false,
        internalType: "address",
        name: "withdrawAddress",
        type: "address"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256"
      }
    ],
    name: "StakeWithdrawn",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "userOpHash",
        type: "bytes32"
      },
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address"
      },
      {
        indexed: true,
        internalType: "address",
        name: "paymaster",
        type: "address"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "nonce",
        type: "uint256"
      },
      {
        indexed: false,
        internalType: "bool",
        name: "success",
        type: "bool"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "actualGasCost",
        type: "uint256"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "actualGasUsed",
        type: "uint256"
      }
    ],
    name: "UserOperationEvent",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "userOpHash",
        type: "bytes32"
      },
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "nonce",
        type: "uint256"
      },
      {
        indexed: false,
        internalType: "bytes",
        name: "revertReason",
        type: "bytes"
      }
    ],
    name: "UserOperationRevertReason",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address"
      },
      {
        indexed: false,
        internalType: "address",
        name: "withdrawAddress",
        type: "address"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256"
      }
    ],
    name: "Withdrawn",
    type: "event"
  },
  {
    inputs: [],
    name: "SIG_VALIDATION_FAILED",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "bytes",
        name: "initCode",
        type: "bytes"
      },
      {
        internalType: "address",
        name: "sender",
        type: "address"
      },
      {
        internalType: "bytes",
        name: "paymasterAndData",
        type: "bytes"
      }
    ],
    name: "_validateSenderAndPaymaster",
    outputs: [],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint32",
        name: "unstakeDelaySec",
        type: "uint32"
      }
    ],
    name: "addStake",
    outputs: [],
    stateMutability: "payable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address"
      }
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address"
      }
    ],
    name: "depositTo",
    outputs: [],
    stateMutability: "payable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address"
      }
    ],
    name: "deposits",
    outputs: [
      {
        internalType: "uint112",
        name: "deposit",
        type: "uint112"
      },
      {
        internalType: "bool",
        name: "staked",
        type: "bool"
      },
      {
        internalType: "uint112",
        name: "stake",
        type: "uint112"
      },
      {
        internalType: "uint32",
        name: "unstakeDelaySec",
        type: "uint32"
      },
      {
        internalType: "uint48",
        name: "withdrawTime",
        type: "uint48"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address"
      }
    ],
    name: "getDepositInfo",
    outputs: [
      {
        components: [
          {
            internalType: "uint112",
            name: "deposit",
            type: "uint112"
          },
          {
            internalType: "bool",
            name: "staked",
            type: "bool"
          },
          {
            internalType: "uint112",
            name: "stake",
            type: "uint112"
          },
          {
            internalType: "uint32",
            name: "unstakeDelaySec",
            type: "uint32"
          },
          {
            internalType: "uint48",
            name: "withdrawTime",
            type: "uint48"
          }
        ],
        internalType: "struct IStakeManager.DepositInfo",
        name: "info",
        type: "tuple"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "sender",
        type: "address"
      },
      {
        internalType: "uint192",
        name: "key",
        type: "uint192"
      }
    ],
    name: "getNonce",
    outputs: [
      {
        internalType: "uint256",
        name: "nonce",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "bytes",
        name: "initCode",
        type: "bytes"
      }
    ],
    name: "getSenderAddress",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "address",
            name: "sender",
            type: "address"
          },
          {
            internalType: "uint256",
            name: "nonce",
            type: "uint256"
          },
          {
            internalType: "bytes",
            name: "initCode",
            type: "bytes"
          },
          {
            internalType: "bytes",
            name: "callData",
            type: "bytes"
          },
          {
            internalType: "uint256",
            name: "callGasLimit",
            type: "uint256"
          },
          {
            internalType: "uint256",
            name: "verificationGasLimit",
            type: "uint256"
          },
          {
            internalType: "uint256",
            name: "preVerificationGas",
            type: "uint256"
          },
          {
            internalType: "uint256",
            name: "maxFeePerGas",
            type: "uint256"
          },
          {
            internalType: "uint256",
            name: "maxPriorityFeePerGas",
            type: "uint256"
          },
          {
            internalType: "bytes",
            name: "paymasterAndData",
            type: "bytes"
          },
          {
            internalType: "bytes",
            name: "signature",
            type: "bytes"
          }
        ],
        internalType: "struct UserOperation",
        name: "userOp",
        type: "tuple"
      }
    ],
    name: "getUserOpHash",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        components: [
          {
            components: [
              {
                internalType: "address",
                name: "sender",
                type: "address"
              },
              {
                internalType: "uint256",
                name: "nonce",
                type: "uint256"
              },
              {
                internalType: "bytes",
                name: "initCode",
                type: "bytes"
              },
              {
                internalType: "bytes",
                name: "callData",
                type: "bytes"
              },
              {
                internalType: "uint256",
                name: "callGasLimit",
                type: "uint256"
              },
              {
                internalType: "uint256",
                name: "verificationGasLimit",
                type: "uint256"
              },
              {
                internalType: "uint256",
                name: "preVerificationGas",
                type: "uint256"
              },
              {
                internalType: "uint256",
                name: "maxFeePerGas",
                type: "uint256"
              },
              {
                internalType: "uint256",
                name: "maxPriorityFeePerGas",
                type: "uint256"
              },
              {
                internalType: "bytes",
                name: "paymasterAndData",
                type: "bytes"
              },
              {
                internalType: "bytes",
                name: "signature",
                type: "bytes"
              }
            ],
            internalType: "struct UserOperation[]",
            name: "userOps",
            type: "tuple[]"
          },
          {
            internalType: "contract IAggregator",
            name: "aggregator",
            type: "address"
          },
          {
            internalType: "bytes",
            name: "signature",
            type: "bytes"
          }
        ],
        internalType: "struct IEntryPoint.UserOpsPerAggregator[]",
        name: "opsPerAggregator",
        type: "tuple[]"
      },
      {
        internalType: "address payable",
        name: "beneficiary",
        type: "address"
      }
    ],
    name: "handleAggregatedOps",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "address",
            name: "sender",
            type: "address"
          },
          {
            internalType: "uint256",
            name: "nonce",
            type: "uint256"
          },
          {
            internalType: "bytes",
            name: "initCode",
            type: "bytes"
          },
          {
            internalType: "bytes",
            name: "callData",
            type: "bytes"
          },
          {
            internalType: "uint256",
            name: "callGasLimit",
            type: "uint256"
          },
          {
            internalType: "uint256",
            name: "verificationGasLimit",
            type: "uint256"
          },
          {
            internalType: "uint256",
            name: "preVerificationGas",
            type: "uint256"
          },
          {
            internalType: "uint256",
            name: "maxFeePerGas",
            type: "uint256"
          },
          {
            internalType: "uint256",
            name: "maxPriorityFeePerGas",
            type: "uint256"
          },
          {
            internalType: "bytes",
            name: "paymasterAndData",
            type: "bytes"
          },
          {
            internalType: "bytes",
            name: "signature",
            type: "bytes"
          }
        ],
        internalType: "struct UserOperation[]",
        name: "ops",
        type: "tuple[]"
      },
      {
        internalType: "address payable",
        name: "beneficiary",
        type: "address"
      }
    ],
    name: "handleOps",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint192",
        name: "key",
        type: "uint192"
      }
    ],
    name: "incrementNonce",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "bytes",
        name: "callData",
        type: "bytes"
      },
      {
        components: [
          {
            components: [
              {
                internalType: "address",
                name: "sender",
                type: "address"
              },
              {
                internalType: "uint256",
                name: "nonce",
                type: "uint256"
              },
              {
                internalType: "uint256",
                name: "callGasLimit",
                type: "uint256"
              },
              {
                internalType: "uint256",
                name: "verificationGasLimit",
                type: "uint256"
              },
              {
                internalType: "uint256",
                name: "preVerificationGas",
                type: "uint256"
              },
              {
                internalType: "address",
                name: "paymaster",
                type: "address"
              },
              {
                internalType: "uint256",
                name: "maxFeePerGas",
                type: "uint256"
              },
              {
                internalType: "uint256",
                name: "maxPriorityFeePerGas",
                type: "uint256"
              }
            ],
            internalType: "struct EntryPoint.MemoryUserOp",
            name: "mUserOp",
            type: "tuple"
          },
          {
            internalType: "bytes32",
            name: "userOpHash",
            type: "bytes32"
          },
          {
            internalType: "uint256",
            name: "prefund",
            type: "uint256"
          },
          {
            internalType: "uint256",
            name: "contextOffset",
            type: "uint256"
          },
          {
            internalType: "uint256",
            name: "preOpGas",
            type: "uint256"
          }
        ],
        internalType: "struct EntryPoint.UserOpInfo",
        name: "opInfo",
        type: "tuple"
      },
      {
        internalType: "bytes",
        name: "context",
        type: "bytes"
      }
    ],
    name: "innerHandleOp",
    outputs: [
      {
        internalType: "uint256",
        name: "actualGasCost",
        type: "uint256"
      }
    ],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address"
      },
      {
        internalType: "uint192",
        name: "",
        type: "uint192"
      }
    ],
    name: "nonceSequenceNumber",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "address",
            name: "sender",
            type: "address"
          },
          {
            internalType: "uint256",
            name: "nonce",
            type: "uint256"
          },
          {
            internalType: "bytes",
            name: "initCode",
            type: "bytes"
          },
          {
            internalType: "bytes",
            name: "callData",
            type: "bytes"
          },
          {
            internalType: "uint256",
            name: "callGasLimit",
            type: "uint256"
          },
          {
            internalType: "uint256",
            name: "verificationGasLimit",
            type: "uint256"
          },
          {
            internalType: "uint256",
            name: "preVerificationGas",
            type: "uint256"
          },
          {
            internalType: "uint256",
            name: "maxFeePerGas",
            type: "uint256"
          },
          {
            internalType: "uint256",
            name: "maxPriorityFeePerGas",
            type: "uint256"
          },
          {
            internalType: "bytes",
            name: "paymasterAndData",
            type: "bytes"
          },
          {
            internalType: "bytes",
            name: "signature",
            type: "bytes"
          }
        ],
        internalType: "struct UserOperation",
        name: "op",
        type: "tuple"
      },
      {
        internalType: "address",
        name: "target",
        type: "address"
      },
      {
        internalType: "bytes",
        name: "targetCallData",
        type: "bytes"
      }
    ],
    name: "simulateHandleOp",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "address",
            name: "sender",
            type: "address"
          },
          {
            internalType: "uint256",
            name: "nonce",
            type: "uint256"
          },
          {
            internalType: "bytes",
            name: "initCode",
            type: "bytes"
          },
          {
            internalType: "bytes",
            name: "callData",
            type: "bytes"
          },
          {
            internalType: "uint256",
            name: "callGasLimit",
            type: "uint256"
          },
          {
            internalType: "uint256",
            name: "verificationGasLimit",
            type: "uint256"
          },
          {
            internalType: "uint256",
            name: "preVerificationGas",
            type: "uint256"
          },
          {
            internalType: "uint256",
            name: "maxFeePerGas",
            type: "uint256"
          },
          {
            internalType: "uint256",
            name: "maxPriorityFeePerGas",
            type: "uint256"
          },
          {
            internalType: "bytes",
            name: "paymasterAndData",
            type: "bytes"
          },
          {
            internalType: "bytes",
            name: "signature",
            type: "bytes"
          }
        ],
        internalType: "struct UserOperation",
        name: "userOp",
        type: "tuple"
      }
    ],
    name: "simulateValidation",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [],
    name: "unlockStake",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address payable",
        name: "withdrawAddress",
        type: "address"
      }
    ],
    name: "withdrawStake",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address payable",
        name: "withdrawAddress",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "withdrawAmount",
        type: "uint256"
      }
    ],
    name: "withdrawTo",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  }
  // {
  //     stateMutability: "payable",
  //     type: "receive"
  // }
];

// sdk/pimlicoRelay.ts
var import_ethers = require("ethers");
var _PimlicoRelay = class _PimlicoRelay {
  constructor(apiKey, provider, safeSDK) {
    this.chainIdToChainName = {
      5: "goerli",
      80001: "mumbai",
      137: "polygon",
      100: "gnosis"
    };
    this.apiKey = apiKey;
    this.provider = provider;
    this.safeSDK = safeSDK;
  }
  getPimlicoBundlerProvider(chainId) {
    const chainName = this.chainIdToChainName[chainId];
    return (0, import_viem.createPublicClient)({
      transport: (0, import_viem.http)(`https://api.pimlico.io/v1/${chainName}/rpc?apikey=${this.apiKey}`)
    });
  }
  getPimlicoPaymasterProvider(chainId) {
    const chainName = this.chainIdToChainName[chainId];
    return (0, import_viem.createPublicClient)({
      transport: (0, import_viem.http)(`https://api.pimlico.io/v2/${chainName}/rpc?apikey=${this.apiKey}`)
    });
  }
  async getNonce(sender) {
    const entryPoint = new import_ethers.ethers.Contract(_PimlicoRelay.entryPointAddress, EntryPointAbi, this.provider);
    const nonce = await entryPoint.getNonce(sender, 0);
    return BigInt(nonce);
  }
  async verify4337ModuleEnabled() {
    const code = await this.provider.getCode(_PimlicoRelay.erc4337moduleAddress);
    if (code === "0x") {
      throw new Error(`ERC4337 module at ${_PimlicoRelay.erc4337moduleAddress} not deployed`);
    }
    const enabled = await this.safeSDK.isModuleEnabled(_PimlicoRelay.erc4337moduleAddress);
    if (!enabled) {
      throw new Error(`ERC4337 module at ${_PimlicoRelay.erc4337moduleAddress} not enabled for this Safe`);
    }
  }
  async createUserOperation(data) {
    await this.verify4337ModuleEnabled();
    const sender = await this.safeSDK.getAddress();
    const chainId = await this.safeSDK.getChainId();
    const bundlerProvider = this.getPimlicoBundlerProvider(chainId);
    const paymasterProvider = this.getPimlicoPaymasterProvider(chainId);
    const abiItem = {
      inputs: [
        { name: "to", type: "address" },
        { name: "value", type: "uint256" },
        { name: "data", type: "bytes" }
      ],
      name: "execTransaction",
      type: "function"
    };
    const opCallData = (0, import_viem.encodeFunctionData)({
      abi: [abiItem],
      functionName: "execTransaction",
      args: [data.to, data.value, data.data]
    });
    const nonce = await this.getNonce(sender);
    const op = {
      sender,
      nonce: `0x${nonce.toString(16)}`,
      initCode: "0x",
      callData: opCallData,
      paymasterAndData: "0x",
      signature: "0x"
    };
    const gasPriceResponse = await bundlerProvider.request({ method: "pimlico_getUserOperationGasPrice" });
    const maxFeePerGas = gasPriceResponse.fast.maxFeePerGas;
    const maxPriorityFeePerGas = gasPriceResponse.fast.maxPriorityFeePerGas;
    op.maxFeePerGas = maxFeePerGas;
    op.maxPriorityFeePerGas = maxPriorityFeePerGas;
    if (data.isSponsored) {
      const sponsorResponse = await paymasterProvider.request({
        // @ts-ignore
        method: "pm_sponsorUserOperation",
        params: [
          // @ts-ignore
          { ...op, preVerificationGas: "0x1", verificationGasLimit: "0x1", callGasLimit: "0x1" },
          _PimlicoRelay.entryPointAddress
        ]
      });
      op.paymasterAndData = sponsorResponse.paymasterAndData;
      op.preVerificationGas = sponsorResponse.preVerificationGas;
      op.verificationGasLimit = sponsorResponse.verificationGasLimit;
      op.callGasLimit = sponsorResponse.callGasLimit;
    } else {
      const estimateResponse = await bundlerProvider.request({
        // @ts-ignore
        method: "eth_estimateUserOperationGas",
        // @ts-ignore
        params: [op, this.entryPointAddress]
      });
      op.preVerificationGas = estimateResponse.preVerificationGas;
      op.verificationGasLimit = estimateResponse.verificationGasLimit;
      op.callGasLimit = estimateResponse.callGasLimit;
      op.paymasterAndData = "0x";
    }
    return op;
  }
  async relayUserOperation(userOperation) {
    await this.verify4337ModuleEnabled();
    const chainId = await this.safeSDK.getChainId();
    const bundlerProvider = this.getPimlicoBundlerProvider(chainId);
    const opHash = await bundlerProvider.request({
      // @ts-ignore
      method: "eth_sendUserOperation",
      // @ts-ignore
      params: [userOperation, this.entryPointAddress]
    });
    return opHash;
  }
  async waitForUserOperationReceipt(opHash) {
    const chainId = await this.safeSDK.getChainId();
    const bundlerProvider = this.getPimlicoBundlerProvider(chainId);
    let receipt;
    receipt = await bundlerProvider.request({
      // @ts-ignore
      method: "eth_getUserOperationReceipt",
      // @ts-ignore
      params: [opHash]
    });
    while (!receipt) {
      await new Promise((resolve) => setTimeout(resolve, 500));
      receipt = await bundlerProvider.request({
        // @ts-ignore
        method: "eth_getUserOperationReceipt",
        // @ts-ignore
        params: [opHash]
      });
    }
    return receipt;
  }
};
_PimlicoRelay.entryPointAddress = "0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789";
_PimlicoRelay.erc4337moduleAddress = "0x86A74784381f8A28465383a6cA40C82d28f9895f";
var PimlicoRelay = _PimlicoRelay;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  PimlicoRelay
});
//# sourceMappingURL=index.js.map