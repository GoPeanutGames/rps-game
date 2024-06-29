export const abi = [
  {
    inputs: [],
    name: 'factory',
    outputs: [{ name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { name: 'minStake', type: 'uint256' },
      { name: 'maxStake', type: 'uint256' },
      { name: 'players', type: 'address[]' },
      { name: 'offset', type: 'uint256' },
      { name: 'limit', type: 'uint256' },
    ],
    name: 'finalizedWithStakesWithPlayers',
    outputs: [
      {
        components: [
          { name: 'addr', type: 'address' },
          { name: 'stakes', type: 'uint256' },
          { name: 'numPlayers', type: 'uint256' },
        ],
        name: 'games',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { name: 'players', type: 'address[]' },
      { name: 'offset', type: 'uint256' },
      { name: 'limit', type: 'uint256' },
    ],
    name: 'hasPlayers',
    outputs: [
      {
        components: [
          { name: 'addr', type: 'address' },
          { name: 'stakes', type: 'uint256' },
          { name: 'numPlayers', type: 'uint256' },
        ],
        name: 'games',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { name: 'offset', type: 'uint256' },
      { name: 'limit', type: 'uint256' },
    ],
    name: 'index',
    outputs: [
      {
        components: [
          { name: 'addr', type: 'address' },
          { name: 'stakes', type: 'uint256' },
          { name: 'numPlayers', type: 'uint256' },
        ],
        name: 'games',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ name: 'rps', type: 'address' }],
    name: 'listPlayers',
    outputs: [{ name: 'players', type: 'address[]' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { name: 'players', type: 'address[]' },
      { name: 'offset', type: 'uint256' },
      { name: 'limit', type: 'uint256' },
    ],
    name: 'nonFinalizedHasPlayers',
    outputs: [
      {
        components: [
          { name: 'addr', type: 'address' },
          { name: 'stakes', type: 'uint256' },
          { name: 'numPlayers', type: 'uint256' },
        ],
        name: 'games',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { name: 'minStake', type: 'uint256' },
      { name: 'maxStake', type: 'uint256' },
      { name: 'players', type: 'address[]' },
      { name: 'offset', type: 'uint256' },
      { name: 'limit', type: 'uint256' },
    ],
    name: 'nonFinalizedWithStakesHasPlayers',
    outputs: [
      {
        components: [
          { name: 'addr', type: 'address' },
          { name: 'stakes', type: 'uint256' },
          { name: 'numPlayers', type: 'uint256' },
        ],
        name: 'games',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { name: 'offset', type: 'uint256' },
      { name: 'limit', type: 'uint256' },
    ],
    name: 'open',
    outputs: [
      {
        components: [
          { name: 'addr', type: 'address' },
          { name: 'stakes', type: 'uint256' },
          { name: 'numPlayers', type: 'uint256' },
        ],
        name: 'games',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { name: 'minStake', type: 'uint256' },
      { name: 'maxStake', type: 'uint256' },
      { name: 'offset', type: 'uint256' },
      { name: 'limit', type: 'uint256' },
    ],
    name: 'openWithStakes',
    outputs: [
      {
        components: [
          { name: 'addr', type: 'address' },
          { name: 'stakes', type: 'uint256' },
          { name: 'numPlayers', type: 'uint256' },
        ],
        name: 'games',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { name: 'minStake', type: 'uint256' },
      { name: 'maxStake', type: 'uint256' },
      { name: 'players', type: 'address[]' },
      { name: 'offset', type: 'uint256' },
      { name: 'limit', type: 'uint256' },
    ],
    name: 'openWithStakesHasPlayers',
    outputs: [
      {
        components: [
          { name: 'addr', type: 'address' },
          { name: 'stakes', type: 'uint256' },
          { name: 'numPlayers', type: 'uint256' },
        ],
        name: 'games',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { name: 'minStake', type: 'uint256' },
      { name: 'maxStake', type: 'uint256' },
      { name: 'offset', type: 'uint256' },
      { name: 'limit', type: 'uint256' },
    ],
    name: 'withStakes',
    outputs: [
      {
        components: [
          { name: 'addr', type: 'address' },
          { name: 'stakes', type: 'uint256' },
          { name: 'numPlayers', type: 'uint256' },
        ],
        name: 'games',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
] as const
