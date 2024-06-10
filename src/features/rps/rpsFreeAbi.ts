export const abi = [
  {
    inputs: [
      {
        name: 'spender',
        type: 'address',
      },
      {
        name: 'allowance',
        type: 'uint256',
      },
      {
        name: 'needed',
        type: 'uint256',
      },
    ],
    name: 'ERC20InsufficientAllowance',
    type: 'error',
  },
  {
    inputs: [
      {
        name: 'sender',
        type: 'address',
      },
      {
        name: 'balance',
        type: 'uint256',
      },
      {
        name: 'needed',
        type: 'uint256',
      },
    ],
    name: 'ERC20InsufficientBalance',
    type: 'error',
  },
  {
    inputs: [
      {
        name: 'approver',
        type: 'address',
      },
    ],
    name: 'ERC20InvalidApprover',
    type: 'error',
  },
  {
    inputs: [
      {
        name: 'receiver',
        type: 'address',
      },
    ],
    name: 'ERC20InvalidReceiver',
    type: 'error',
  },
  {
    inputs: [
      {
        name: 'sender',
        type: 'address',
      },
    ],
    name: 'ERC20InvalidSender',
    type: 'error',
  },
  {
    inputs: [
      {
        name: 'spender',
        type: 'address',
      },
    ],
    name: 'ERC20InvalidSpender',
    type: 'error',
  },
  {
    inputs: [],
    name: 'MustBeAdmin',
    type: 'error',
  },
  {
    inputs: [],
    name: 'MustBeOwner',
    type: 'error',
  },
  {
    inputs: [
      { indexed: true, name: 'id', type: 'uint256' },
      { indexed: true, name: 'game', type: 'address' },
      { indexed: true, name: 'stakes', type: 'uint256' },
    ],
    name: 'GameCreated',
    type: 'event',
  },
  {
    inputs: [
      { indexed: true, name: 'id', type: 'uint256' },
      { indexed: true, name: 'game', type: 'address' },
      { indexed: true, name: 'player', type: 'address' },
    ],
    name: 'GameJoined',
    type: 'event',
  },
  {
    inputs: [
      { indexed: true, name: 'id', type: 'uint256' },
      { indexed: true, name: 'game', type: 'address' },
      { indexed: true, name: 'player', type: 'address' },
    ],
    name: 'GameLeft',
    type: 'event',
  },
  {
    inputs: [
      { indexed: true, name: 'id', type: 'uint256' },
      { indexed: true, name: 'game', type: 'address' },
    ],
    name: 'GameOver',
    type: 'event',
  },
  {
    inputs: [
      { indexed: true, name: 'from', type: 'address' },
      { indexed: true, name: 'to', type: 'address' },
      { indexed: false, name: 'value', type: 'uint256' },
    ],
    name: 'Transfer',
    type: 'event',
  },
  {
    inputs: [{ name: 'account', type: 'address' }],
    name: 'balances',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ name: 'stakes_', type: 'uint256' }],
    name: 'createGame',
    outputs: [
      { name: 'id', type: 'uint256' },
      { name: 'game', type: 'address' },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    type: 'function',
    name: 'deposit',
    stateMutability: 'nonpayable',
    inputs: [{ name: 'amount', type: 'uint256' }],
    outputs: [{ type: 'bool' }],
  },
  {
    inputs: [{ name: 'scores', type: 'uint256[]' }],
    name: 'finalizeGame',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ name: '', type: 'uint256' }],
    name: 'games',
    outputs: [{ name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ name: '', type: 'address' }],
    name: 'instances',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ name: 'id', type: 'uint256' }],
    name: 'joinGame',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ name: 'id', type: 'uint256' }],
    name: 'leaveGame',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ name: 'pick', type: 'uint8' }],
    name: 'playFreeStake',
    outputs: [{ name: 'isWinner', type: 'bool' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'source',
    outputs: [{ name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ name: 'amount', type: 'uint256' }],
    name: 'splitFee',
    outputs: [
      { name: 'fee', type: 'uint256' },
      { name: 'net', type: 'uint256' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ name: '', type: 'uint256' }],
    name: 'stakes',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'totalBalance',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'totalGames',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'totalSupply',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'treasury',
    outputs: [{ name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'winReward',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ name: 'amount', type: 'uint256' }],
    name: 'withdraw',
    outputs: [{ name: '', type: 'bool' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
] as const
