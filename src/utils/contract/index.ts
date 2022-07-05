import web3Utils from '@/utils/web3';
import { message } from 'antd';
import { Contract } from 'web3-eth-contract';
import config from './config';

export type ContractListObject = {
  [propName: string]: Contract;
};
/**
 * 初始化合约列表
 */
export const initContract = () => {
  const contractList: ContractListObject = {};
  if (!window.ethereum || !(<any>window).ethereum.selectedAddress) {
    return {};
  }
  for (let k in config) {
    const contract = web3Utils.initContract(
      config[k].abi,
      config[k].address,
      (<any>window).selectedAddress,
    );
    contractList[k] = contract;
  }
  return contractList;
};

/**
 * 初始化交易配置
 */
export const initTransactionConf = async (
  onAccountsChange?: (contract: ContractListObject) => void,
) => {
  if (!window.ethereum) {
    return false;
  }
  try {
    await (<any>window).ethereum.enable();
    const contract = initContract();
    onAccountsChange && onAccountsChange(contract);
    if (!(<any>window).listeningAccountsChange) {
      (<any>window).listeningAccountsChange = true;
      (<any>window).ethereum.on('accountsChanged', () => {
        const contract = initContract();
        onAccountsChange && onAccountsChange(contract);
      });
    }
    return true;
  } catch (err) {
    message.error((err as Error).message);
    return false;
  }
};
