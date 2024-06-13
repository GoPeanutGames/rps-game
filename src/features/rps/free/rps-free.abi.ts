export const abi = [
  {
    type: 'function',
    name: 'playFreeStake',
    inputs: [
      {
        name: 'pick',
        type: 'uint8',
      },
    ],
    outputs: [
      {
        name: 'isWinner',
        type: 'bool',
      },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'setReward',
    inputs: [
      {
        name: 'winReward_',
        type: 'uint256',
      },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'winReward',
    inputs: [],
    outputs: [
      {
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
  },
] as const
