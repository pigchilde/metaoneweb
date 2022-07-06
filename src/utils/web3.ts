import Web3 from 'web3';

let web3: Web3;

/**
 * 初始化一个Web3对象
 * 需要传入一个Provider，默认是使用Web3.givenProvider,也就是浏览器injected的（Metamask就是注入到浏览器window对象下）
 * @returns
 */
export function init() {
  try {
    if (!web3) {
      // const web3 = new Web3(Web3.givenProvider || new Web3.providers.HttpProvider(config.provider));
      web3 = new Web3(Web3.givenProvider);
    }
    return web3;
  } catch (error) {
    throw error;
  }
}

/**
 * 获取账户余额
 *
 * @param account 钱包地址
 * @returns
 */
export function getBalance(account: string) {
  return new Promise(async (resolve, reject) => {
    try {
      const web3 = init();
      const balance = await web3.eth.getBalance(account);
      console.log('[Web3Eth getBalance]: res =>', balance);

      resolve(balance);
    } catch (error) {
      reject(error);
    }
  });
}

/**
 * 获取区块高度
 *
 * @returns
 */
export function getBlockNumber() {
  return new Promise(async (resolve, reject) => {
    try {
      const web3 = init();
      const blockNumber = await web3.eth.getBlockNumber();
      console.log('[Web3Eth getBlockNumber]: res =>', blockNumber);

      resolve(blockNumber);
    } catch (error) {
      reject(error);
    }
  });
}

/**
 * 初始化一个合约对象
 *
 * @param abi 合约ABI
 * @param address 合约地址
 * @returns
 */
export function initContract(abi: any, address: string, account: string) {
  try {
    const web3 = init();
    const contract = new web3.eth.Contract(abi, address, { from: account });
    return contract;
  } catch (error) {
    console.error('initContract Error:', error);
    throw error;
  }
}

/**
 * Wei转换为ETH
 *
 * @param num
 * @returns
 */
export function wei2Eth(num: string) {
  if (!num) return '0';
  return Web3.utils.fromWei(num.toString(), 'ether');
}

export function eth2Wei(num: string) {
  if (!num) return '0';
  return Web3.utils.toWei(num.toString(), 'ether');
}

export function toBN(num: string) {
  if (!num) return '0';
  return Web3.utils.toBN(num);
}

//导出相应的方法
export default {
  init,
  getBalance,
  initContract,
  wei2Eth,
  eth2Wei,
};
