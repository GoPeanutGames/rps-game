export const abi = [
  {
    type: 'function',
    name: 'balances',
    inputs: [{ name: 'account', type: 'address' }],
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'createGame',
    inputs: [{ name: 'stakes_', type: 'uint256' }],
    outputs: [
      { name: 'id', type: 'uint256' },
      { name: 'game', type: 'address' },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'deposit',
    inputs: [{ name: 'amount', type: 'uint256' }],
    outputs: [{ name: '', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'finalizeGame',
    inputs: [{ name: 'scores', type: 'uint256[]' }],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'games',
    inputs: [{ name: '', type: 'uint256' }],
    outputs: [{ name: '', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'instances',
    inputs: [{ name: '', type: 'address' }],
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'joinGame',
    inputs: [{ name: 'id', type: 'uint256' }],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'leaveGame',
    inputs: [{ name: 'id', type: 'uint256' }],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'owner',
    inputs: [],
    outputs: [{ name: '', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'playFreeStake',
    inputs: [{ name: 'pick', type: 'uint8' }],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'setAdmin',
    inputs: [{ name: 'admin_', type: 'address' }],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'setReward',
    inputs: [{ name: 'winReward_', type: 'uint256' }],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'setTreasury',
    inputs: [{ name: 'treasury_', type: 'address' }],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'source',
    inputs: [],
    outputs: [{ name: '', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'splitFee',
    inputs: [{ name: 'amount', type: 'uint256' }],
    outputs: [
      { name: 'fee', type: 'uint256' },
      { name: 'net', type: 'uint256' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'stakes',
    inputs: [{ name: '', type: 'uint256' }],
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'totalBalance',
    inputs: [],
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'totalGames',
    inputs: [],
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'totalSupply',
    inputs: [],
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'transferOwnership',
    inputs: [{ name: 'newOwner', type: 'address' }],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'treasury',
    inputs: [],
    outputs: [{ name: '', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'winReward',
    inputs: [],
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'withdraw',
    inputs: [{ name: 'amount', type: 'uint256' }],
    outputs: [{ name: '', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'event',
    name: 'GameCreated',
    inputs: [
      { name: 'id', type: 'uint256', indexed: true },
      { name: 'game', type: 'address', indexed: true },
      {
        name: 'stakes',
        type: 'uint256',
        indexed: true,
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'GameJoined',
    inputs: [
      { name: 'id', type: 'uint256', indexed: true },
      { name: 'game', type: 'address', indexed: true },
      {
        name: 'player',
        type: 'address',
        indexed: true,
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'GameLeft',
    inputs: [
      { name: 'id', type: 'uint256', indexed: true },
      { name: 'game', type: 'address', indexed: true },
      {
        name: 'player',
        type: 'address',
        indexed: true,
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'GameOver',
    inputs: [
      { name: 'id', type: 'uint256', indexed: true },
      { name: 'game', type: 'address', indexed: true },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'GameResult',
    inputs: [
      { name: 'pick0', type: 'uint8', indexed: true },
      { name: 'pick1', type: 'uint8', indexed: true },
      {
        name: 'winner',
        type: 'address',
        indexed: true,
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'OwnershipTransferred',
    inputs: [
      {
        name: 'previousOwner',
        type: 'address',
        indexed: true,
      },
      {
        name: 'newOwner',
        type: 'address',
        indexed: true,
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'Transfer',
    inputs: [
      { name: 'from', type: 'address', indexed: true },
      { name: 'to', type: 'address', indexed: true },
      {
        name: 'value',
        type: 'uint256',
        indexed: false,
      },
    ],
    anonymous: false,
  },
  { type: 'error', name: 'ERC1167FailedCreateClone', inputs: [] },
  {
    type: 'error',
    name: 'ERC20InsufficientAllowance',
    inputs: [
      { name: 'spender', type: 'address' },
      { name: 'allowance', type: 'uint256' },
      { name: 'needed', type: 'uint256' },
    ],
  },
  {
    type: 'error',
    name: 'ERC20InsufficientBalance',
    inputs: [
      { name: 'sender', type: 'address' },
      { name: 'balance', type: 'uint256' },
      { name: 'needed', type: 'uint256' },
    ],
  },
  {
    type: 'error',
    name: 'ERC20InvalidApprover',
    inputs: [{ name: 'approver', type: 'address' }],
  },
  {
    type: 'error',
    name: 'ERC20InvalidReceiver',
    inputs: [{ name: 'receiver', type: 'address' }],
  },
  {
    type: 'error',
    name: 'ERC20InvalidSender',
    inputs: [{ name: 'sender', type: 'address' }],
  },
  {
    type: 'error',
    name: 'ERC20InvalidSpender',
    inputs: [{ name: 'spender', type: 'address' }],
  },
  { type: 'error', name: 'MustBeAdmin', inputs: [] },
  { type: 'error', name: 'MustBeOwner', inputs: [] },
] as const
