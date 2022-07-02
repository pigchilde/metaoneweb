import web3Utils from '@/utils/web3';
import { Contract } from 'web3-eth-contract';
import config from './config';

type ContractListObject = {
  [propName: string]: Contract;
};
/**
 * 初始化合约列表
 */
export const initContract = (account: string) => {
  const contractList: ContractListObject = {};
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
 * 初始化账户
 */
export const initAccount = async () => {
  const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
  return accounts[0];
};
