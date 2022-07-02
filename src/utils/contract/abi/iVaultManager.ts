export default [
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: '_lender',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'enum IVaultManager.TokenType',
        name: '_tkType',
        type: 'uint8',
      },
      {
        indexed: false,
        internalType: 'address',
        name: '_NFTaddr',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: '_tokenID',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'bool',
        name: '_renewable',
        type: 'bool',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: '_coinIndex',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint8',
        name: '_minimumLeaseTime',
        type: 'uint8',
      },
      {
        indexed: false,
        internalType: 'uint8',
        name: '_maximumLeaseTime',
        type: 'uint8',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: '_price',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint8',
        name: '_gameBonus',
        type: 'uint8',
      },
    ],
    name: 'Deposit',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: '_lendItemID',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'bool',
        name: '_renewable',
        type: 'bool',
      },
    ],
    name: 'RenewableStatus',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: '_lendItemID',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'address',
        name: '_NFTaddr',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: '_tokenID',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'address',
        name: '_renter',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: '_starttime',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: '_endtime',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint8',
        name: '_gameBonus',
        type: 'uint8',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: '_rentTimes',
        type: 'uint256',
      },
    ],
    name: 'Rent',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: '_lendItemID',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint8',
        name: '_minimumLeaseTime',
        type: 'uint8',
      },
      {
        indexed: false,
        internalType: 'uint8',
        name: '_maximumLeaseTime',
        type: 'uint8',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: '_price',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint8',
        name: '_gameBonus',
        type: 'uint8',
      },
    ],
    name: 'ResetDeposit',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint8',
        name: '_plantformBonus',
        type: 'uint8',
      },
    ],
    name: 'SetPlantformBonus',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: '_lendItemID',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'address',
        name: '_NFTaddr',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: '_tokenID',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'address',
        name: '_lender',
        type: 'address',
      },
    ],
    name: 'Withdraw',
    type: 'event',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_rentCoin',
        type: 'address',
      },
    ],
    name: 'addRentCoin',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'enum IVaultManager.TokenType',
        name: '_tkType',
        type: 'uint8',
      },
      {
        internalType: 'address',
        name: '_NFTaddr',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: '_tokenID',
        type: 'uint256',
      },
      {
        internalType: 'bool',
        name: '_renewable',
        type: 'bool',
      },
      {
        internalType: 'uint256',
        name: '_coinIndex',
        type: 'uint256',
      },
      {
        internalType: 'uint8',
        name: '_minimumLeaseTime',
        type: 'uint8',
      },
      {
        internalType: 'uint8',
        name: '_maximumLeaseTime',
        type: 'uint8',
      },
      {
        internalType: 'uint256',
        name: '_price',
        type: 'uint256',
      },
      {
        internalType: 'uint8',
        name: '_gameBonus',
        type: 'uint8',
      },
    ],
    name: 'deposit',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_lendItemID',
        type: 'uint256',
      },
    ],
    name: 'getLendItemMsg',
    outputs: [
      {
        components: [
          {
            internalType: 'enum IVaultManager.TokenType',
            name: 'tkType',
            type: 'uint8',
          },
          {
            internalType: 'address',
            name: 'NFTaddr',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'tokenID',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: 'lender',
            type: 'address',
          },
          {
            internalType: 'bool',
            name: 'renewable',
            type: 'bool',
          },
          {
            internalType: 'address',
            name: 'rentCoinType',
            type: 'address',
          },
          {
            internalType: 'bool',
            name: 'withdrawed',
            type: 'bool',
          },
          {
            internalType: 'uint8',
            name: 'minimumLeaseTime',
            type: 'uint8',
          },
          {
            internalType: 'uint8',
            name: 'maximumLeaseTime',
            type: 'uint8',
          },
          {
            internalType: 'uint256',
            name: 'price',
            type: 'uint256',
          },
          {
            internalType: 'uint8',
            name: 'gameBonus',
            type: 'uint8',
          },
          {
            internalType: 'address',
            name: 'renter',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'endtime',
            type: 'uint256',
          },
        ],
        internalType: 'struct IVaultManager.AllMsg',
        name: '_AllMsg',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getMyDepositsList',
    outputs: [
      {
        components: [
          {
            internalType: 'enum IVaultManager.TokenType',
            name: 'tkType',
            type: 'uint8',
          },
          {
            internalType: 'address',
            name: 'NFTaddr',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'tokenID',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: 'lender',
            type: 'address',
          },
          {
            internalType: 'bool',
            name: 'renewable',
            type: 'bool',
          },
          {
            internalType: 'address',
            name: 'rentCoinType',
            type: 'address',
          },
          {
            internalType: 'bool',
            name: 'withdrawed',
            type: 'bool',
          },
          {
            internalType: 'uint8',
            name: 'minimumLeaseTime',
            type: 'uint8',
          },
          {
            internalType: 'uint8',
            name: 'maximumLeaseTime',
            type: 'uint8',
          },
          {
            internalType: 'uint256',
            name: 'price',
            type: 'uint256',
          },
          {
            internalType: 'uint8',
            name: 'gameBonus',
            type: 'uint8',
          },
          {
            internalType: 'address',
            name: 'renter',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'endtime',
            type: 'uint256',
          },
        ],
        internalType: 'struct IVaultManager.AllMsg[]',
        name: '',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getMyRentsList',
    outputs: [
      {
        components: [
          {
            internalType: 'enum IVaultManager.TokenType',
            name: 'tkType',
            type: 'uint8',
          },
          {
            internalType: 'address',
            name: 'NFTaddr',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'tokenID',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: 'lender',
            type: 'address',
          },
          {
            internalType: 'bool',
            name: 'renewable',
            type: 'bool',
          },
          {
            internalType: 'address',
            name: 'rentCoinType',
            type: 'address',
          },
          {
            internalType: 'bool',
            name: 'withdrawed',
            type: 'bool',
          },
          {
            internalType: 'uint8',
            name: 'minimumLeaseTime',
            type: 'uint8',
          },
          {
            internalType: 'uint8',
            name: 'maximumLeaseTime',
            type: 'uint8',
          },
          {
            internalType: 'uint256',
            name: 'price',
            type: 'uint256',
          },
          {
            internalType: 'uint8',
            name: 'gameBonus',
            type: 'uint8',
          },
          {
            internalType: 'address',
            name: 'renter',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'endtime',
            type: 'uint256',
          },
        ],
        internalType: 'struct IVaultManager.AllMsg[]',
        name: '',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_lendItemID',
        type: 'uint256',
      },
      {
        internalType: 'bool',
        name: '_renewable',
        type: 'bool',
      },
    ],
    name: 'renewableStatus',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_lendItemID',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '_rentTimes',
        type: 'uint256',
      },
    ],
    name: 'rent',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_lendItemID',
        type: 'uint256',
      },
      {
        internalType: 'uint8',
        name: '_minimumLeaseTime',
        type: 'uint8',
      },
      {
        internalType: 'uint8',
        name: '_maximumLeaseTime',
        type: 'uint8',
      },
      {
        internalType: 'uint256',
        name: '_price',
        type: 'uint256',
      },
      {
        internalType: 'uint8',
        name: '_gameBonus',
        type: 'uint8',
      },
    ],
    name: 'resetDeposit',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint8',
        name: '_plantformBonus',
        type: 'uint8',
      },
    ],
    name: 'setPlantformBonus',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'contract IERC20',
        name: '_addr',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: '_amount',
        type: 'uint256',
      },
    ],
    name: 'userclaim',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_lendItemID',
        type: 'uint256',
      },
    ],
    name: 'withdraw',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
];
