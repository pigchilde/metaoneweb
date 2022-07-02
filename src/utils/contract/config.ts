import ERC721ABI from './abi/erc721';
import ERC1155ABI from './abi/erc1155';
import ERC20ABI from './abi/erc20';
import LeaseABI from './abi/lease';
import IVaultManagerABI from './abi/iVaultManager';

type ObjectT = {
  [propName: string]: any;
};

const config: ObjectT = {
  erc721: {
    address: '0x2104A90046AA9C73906C7f4beDDa20e94a354454',
    abi: ERC721ABI,
  },
  erc1155: {
    address: '0x2104A90046AA9C73906C7f4beDDa20e94a354454',
    abi: ERC1155ABI,
  },
  erc20: {
    address: '0x2104A90046AA9C73906C7f4beDDa20e94a354454',
    abi: ERC20ABI,
  },
  rent: {
    address: '0x9aE55621383af2e4462ca4d4760d3f0E42f01dd2',
    abi: LeaseABI,
  },
};

export default config;
