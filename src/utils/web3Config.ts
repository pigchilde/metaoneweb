const config = {
  CDMContractAddress: '0x3E1CDdA851D804075A3f919792569da2C26D5c50',
  CDMContractABI: [
    {
      inputs: [],
      stateMutability: 'nonpayable',
      type: 'constructor',
    },
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
          internalType: 'address',
          name: 'from',
          type: 'address',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'amount',
          type: 'uint256',
        },
      ],
      name: 'DepositFunds',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'previousOwner',
          type: 'address',
        },
        {
          indexed: true,
          internalType: 'address',
          name: 'newOwner',
          type: 'address',
        },
      ],
      name: 'OwnershipTransferred',
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
          name: '_nowtime',
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
          internalType: 'address',
          name: 'from',
          type: 'address',
        },
        {
          indexed: false,
          internalType: 'address',
          name: 'to',
          type: 'address',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'amount',
          type: 'uint256',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'transactionId',
          type: 'uint256',
        },
      ],
      name: 'TransactionCreated',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: 'address',
          name: 'to',
          type: 'address',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'amount',
          type: 'uint256',
        },
      ],
      name: 'TransferFunds',
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
          name: 'manager',
          type: 'address',
        },
      ],
      name: 'addManager',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
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
          name: '',
          type: 'uint256',
        },
      ],
      name: 'earningItem',
      outputs: [
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
      ],
      stateMutability: 'view',
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
          internalType: 'address',
          name: '_lender',
          type: 'address',
        },
        {
          internalType: 'bool',
          name: '_renewable',
          type: 'bool',
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
        {
          internalType: 'address',
          name: '_renter',
          type: 'address',
        },
        {
          internalType: 'uint256',
          name: '_endtime',
          type: 'uint256',
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
          ],
          internalType: 'struct IVaultManager.LendMsg[]',
          name: '',
          type: 'tuple[]',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'getMyRentsList',
      outputs: [
        {
          components: [
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
          internalType: 'struct IVaultManager.RentMsg[]',
          name: '',
          type: 'tuple[]',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'getPendingTransactions',
      outputs: [
        {
          internalType: 'uint256[]',
          name: '',
          type: 'uint256[]',
        },
      ],
      stateMutability: 'view',
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
      name: 'getTokenState',
      outputs: [
        {
          internalType: 'enum IVaultManager.TokenState',
          name: '',
          type: 'uint8',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: '_user',
          type: 'address',
        },
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
      name: 'grantRent',
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
          name: '',
          type: 'uint256',
        },
      ],
      name: 'lendItem',
      outputs: [
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
      ],
      stateMutability: 'view',
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
      name: 'managerClaim',
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
      inputs: [],
      name: 'owner',
      outputs: [
        {
          internalType: 'address',
          name: '',
          type: 'address',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'plantformBonus',
      outputs: [
        {
          internalType: 'uint8',
          name: '',
          type: 'uint8',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'manager',
          type: 'address',
        },
      ],
      name: 'removeManager',
      outputs: [],
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
      inputs: [],
      name: 'renounceOwnership',
      outputs: [],
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
          name: '',
          type: 'uint256',
        },
      ],
      name: 'rentItem',
      outputs: [
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
      stateMutability: 'view',
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
          name: 'transactionId',
          type: 'uint256',
        },
      ],
      name: 'signTransaction',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'newOwner',
          type: 'address',
        },
      ],
      name: 'transferOwnership',
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
          internalType: 'address',
          name: '_to',
          type: 'address',
        },
        {
          internalType: 'uint256',
          name: '_amount',
          type: 'uint256',
        },
      ],
      name: 'transferTo',
      outputs: [],
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
  ],
};

export default config;
