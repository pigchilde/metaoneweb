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
export const initContract = (account: string) => {
  const contractList: ContractListObject = {};
  if (!window.ethereum || !account) {
    return {};
  }
  for (let k in config) {
    const contract = web3Utils.initContract(
      config[k].abi,
      config[k].address,
      account,
    );
    contractList[k] = contract;
  }
  return contractList;
};

/**
 * 初始化交易配置
 */
export const initWalletApprove = async () => {
  if (!window.ethereum) {
    return false;
  }
  try {
    await (<any>window).ethereum.enable();
    return true;
  } catch (err) {
    message.error((err as Error).message);
    return false;
  }
};
