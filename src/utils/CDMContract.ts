import config from './web3Config';
import web3Utils, { eth2Wei, wei2Eth } from './web3';
import { ContractOptions } from 'web3-eth-contract';
import { errorHandler, RejectContractError } from '. /helper';

// 质押周期类型
// PeriodDays3 = 0;
// PeriodDays7 = 1;
// PeriodDays15 = 2;
// PeriodDays30 = 3;
// PeriodDays90 = 4;

export type PeriodDayType = 0 | 1 | 2 | 3 | 4;
// 质押周期MAP<Period code, days>
export const PeriodDayMap: Record<
  PeriodDayType,
  {
    days: number;
    interestRate: number;
  }
> = {
  0: { days: 3, interestRate: 24 },
  1: { days: 7, interestRate: 36 },
  2: { days: 15, interestRate: 60 },
  3: { days: 30, interestRate: 90 },
  4: { days: 90, interestRate: 120 },
};

export default class CDMContract {
  contract: any;

  constructor() {
    console.log('初始化CDM合约：', config.CDMContractAddress);

    this.contract = web3Utils.initContract(
      config.CDMContractABI,
      config.CDMContractAddress as string,
    );
  }

  /**
   * 授权
   *
   * ps:这里的参数根据实际业务需求及合约需要来定
   */
  approve(data: {
    spender: string;
    amount: number | string;
    options: any;
    onTransactionHash?: (hash?: string) => void;
  }) {
    console.log('approve data:', data);

    return new Promise<any>(async (resolve, reject: RejectContractError) => {
      // 合约定义的method,具体参数需要参考合约提供的api文档
      const approve = this.contract.methods.approve(
        data.spender,
        eth2Wei(data.amount as string),
      );

      // 需要send来调用的合约接口会消耗gas
      // 这一步调用计算gas，可省略
      approve
        .estimateGas(data.options)
        .then((gas: any) => {
          console.log('[CDM Contract] approve: -> estimateGas = ', gas);

          // 将计算的gas值放大一点，放到send中，提高交易成功率
          const options: ContractOptions = {
            ...data.options,
            gas: Math.round(gas * 1.1),
          };

          // send才是真正调用合约的接口，send请求发出后，浏览器上的metamask插件会弹出确认交易弹窗
          approve
            .send(options)
            // 用户在metamask中点击确认会触发此事件，返回当前交易Hash（非必需）
            .on('transactionHash', function (hash: any) {
              data.onTransactionHash && data.onTransactionHash(hash);
            })
            // 接口调用成功
            .then(resolve)
            .catch((error: any) => {
              console.error('[CDM Contract] approve: -> Error:', error);
              reject(errorHandler(error));
            });
        })
        .catch((error: any) => {
          console.error('[CDM Contract] approve: -> Error:', error);
          reject(errorHandler(error));
        });
    });
  }

  /**
   * 获取指定账户的CDM余额
   *
   * @param account
   * @returns
   */
  getBalance(account: Address) {
    return new Promise<string>(async (resolve, reject: RejectContractError) => {
      // 需要call来调用的合约接口直接调用即可
      this.contract.methods
        .balanceOf(account)
        .call()
        .then((res: any) => {
          const CDMBalance = wei2Eth(res);
          console.log('[CDM Contract] getBalance: -> CDMBalance:', CDMBalance);
          resolve(CDMBalance);
        })
        .catch((error: any) => {
          console.error('[CDM Contract] getBalance: -> Error:', error);
          reject(errorHandler(error));
        });
    });
  }

  /**
   * 获取未领取的奖励
   *
   * @param account
   * @returns
   */
  getRewardPending(account: string) {
    console.log('[CDM Contract] getRewardPending');
    return new Promise<string>(async (resolve, reject: RejectContractError) => {
      this.contract.methods
        .getRewardPending(account)
        .call()
        .then((res: any) => {
          const CDMReward = wei2Eth(res);
          console.log(
            '[CDM Contract] getRewardPending: -> CDMReward:',
            CDMReward,
          );
          resolve(CDMReward);
        })
        .catch((error: any) => {
          console.error('[CDM Contract] getRewardPending: -> Error:', error);
          reject(errorHandler(error));
        });
    });
  }

  /**
   * 销毁挖矿
   *
   * 销毁CDM,挖CDM
   *
   * @param data
   * @returns
   */
  deposit(data: {
    // 质押的CDM数量
    amount: number | string;
    // 邀请人，默认0x0
    referer?: string;
    onTransactionHash?: (hash: string) => void;
    options: ContractOptions;
  }) {
    return new Promise<any>(async (resolve, reject: RejectContractError) => {
      const deposit = this.contract.methods.deposit(
        eth2Wei(data.amount as string),
        data.referer || '0x0000000000000000000000000000000000000000',
      );

      deposit
        .estimateGas(data.options)
        .then((gas: any) => {
          console.log('[CDM Contract] deposit: -> estimateGas = ', gas);
          const options: ContractOptions = {
            ...data.options,
            gas: Math.round(gas * 1.1),
          };
          deposit
            .send(options)
            // 用户在metamask中点击确认会触发此事件，返回当前交易Hash
            .on('transactionHash', function (hash: any) {
              data.onTransactionHash && data.onTransactionHash(hash);
            })
            .then(resolve)
            .catch((error: any) => {
              console.error('[CDM Contract] deposit: -> Error:', error);
              reject(errorHandler(error));
            });
        })
        .catch((error: any) => {
          console.error('[CDM Contract] deposit: -> Error:', error);
          reject(errorHandler(error));
        });
    });
  }

  /**
   * 质押挖矿(3天，7天，15天，30天，90天)
   *
   * 质押之前需要approve
   *
   * @param data
   * @returns
   */
  stableDeposit(data: {
    // 质押的CDM数量
    amount: number | string;
    period: PeriodDayType;
    onTransactionHash?: (hash: string) => void;
    options: ContractOptions;
  }) {
    console.log('stableDeposit data:', data);

    return new Promise<any>(async (resolve, reject: RejectContractError) => {
      const stableDeposit = this.contract.methods.stableDeposit(
        eth2Wei(data.amount as string),
        data.period,
      );

      stableDeposit
        .estimateGas(data.options)
        .then((gas: any) => {
          console.log('[CDM Contract] stableDeposit: -> estimateGas = ', gas);
          const options: ContractOptions = {
            ...data.options,
            gas: Math.round(gas * 1.1),
          };
          stableDeposit
            .send(options)
            // 用户在metamask中点击确认会触发此事件，返回当前交易Hash
            .on('transactionHash', function (hash: any) {
              data.onTransactionHash && data.onTransactionHash(hash);
            })
            .then(resolve)
            .catch((error: any) => {
              console.error('[CDM Contract] stableDeposit: -> Error:', error);
              reject(errorHandler(error));
            });
        })
        .catch((error: any) => {
          console.error('[CDM Contract] stableDeposit: -> Error:', error);
          reject(errorHandler(error));
        });
    });
  }

  /**
   * 获取当前质押挖矿信息
   *
   * @param data
   * @returns
   * 本金
   * 本金 + 利息
   * 质押时间
   */
  getStableDeposit(data: { account: string; period: PeriodDayType }) {
    return new Promise<any>(async (resolve, reject: RejectContractError) => {
      this.contract.methods
        .getStableDeposit(data.account, data.period)
        .call()
        .then((res: any) => {
          console.log(res);

          const data = {
            principal: wei2Eth(res[0]),
            total: wei2Eth(res[1]),
            timestamp: res[2],
          };
          console.info('[CDM Contract] getStableDeposit: -> res:', data);
          resolve(data);
        })
        .catch((error: any) => {
          console.error('[CDM Contract] getStableDeposit: -> Error:', error);
          reject(errorHandler(error));
        });
    });
  }

  /**
   * 提取质押挖矿奖励并赎回本金
   *
   * @param data
   * @returns
   */
  stableWithdraw(data: {
    period: PeriodDayType;
    options: ContractOptions;
    onTransactionHash?: (hash: string) => void;
  }) {
    return new Promise<any>(async (resolve, reject: RejectContractError) => {
      const stableWithdraw = this.contract.methods.stableWithdraw(data.period);

      stableWithdraw
        .estimateGas(data.options)
        .then((gas: any) => {
          console.log('[CDM Contract] stableWithdraw: -> estimateGas = ', gas);
          const options: ContractOptions = {
            ...data.options,
            gas: Math.round(gas * 1.1),
          };
          stableWithdraw
            .send(options)
            // 用户在metamask中点击确认会触发此事件，返回当前交易Hash
            .on('transactionHash', function (hash: any) {
              data.onTransactionHash && data.onTransactionHash(hash);
            })
            .then(resolve)
            .catch((error: any) => {
              console.error('[CDM Contract] stableWithdraw: -> Error:', error);
              reject(errorHandler(error));
            });
        })
        .catch((error: any) => {
          console.error('[CDM Contract] stableWithdraw: -> Error:', error);
          reject(errorHandler(error));
        });
    });
  }

  /**
   * 仅提取质押挖矿奖励
   *
   * @param data
   * @returns
   */
  stableClaim(data: {
    period: PeriodDayType;
    options: ContractOptions;
    onTransactionHash?: (hash: string) => void;
  }) {
    return new Promise<any>(async (resolve, reject: RejectContractError) => {
      const stableClaim = this.contract.methods.stableClaim(data.period);

      stableClaim
        .estimateGas(data.options)
        .then((gas: any) => {
          console.log('[CDM Contract] stableClaim: -> estimateGas = ', gas);
          const options: ContractOptions = {
            ...data.options,
            gas: Math.round(gas * 1.1),
          };
          stableClaim
            .send(options)
            // 用户在metamask中点击确认会触发此事件，返回当前交易Hash
            .on('transactionHash', function (hash: any) {
              data.onTransactionHash && data.onTransactionHash(hash);
            })
            .then(resolve)
            .catch((error: any) => {
              console.error('[CDM Contract] stableClaim: -> Error:', error);
              reject(errorHandler(error));
            });
        })
        .catch((error: any) => {
          console.error('[CDM Contract] stableClaim: -> Error:', error);
          reject(errorHandler(error));
        });
    });
  }

  /**
   * 提取CDM奖励
   *
   * @param data
   * @returns
   */
  withdraw(data: {
    amount: number | string;
    options: ContractOptions;
    onTransactionHash?: (hash: string) => void;
  }) {
    return new Promise<any>(async (resolve, reject: RejectContractError) => {
      const withdraw = this.contract.methods.withdraw(
        eth2Wei(data.amount as string),
      );

      withdraw
        .estimateGas(data.options)
        .then((gas: any) => {
          console.log('[CDM Contract] withdraw: -> estimateGas = ', gas);
          const options: ContractOptions = {
            ...data.options,
            gas: Math.round(gas * 1.1),
          };
          withdraw
            .send(options)
            // 用户在metamask中点击确认会触发此事件，返回当前交易Hash
            .on('transactionHash', function (hash: any) {
              data.onTransactionHash && data.onTransactionHash(hash);
            })
            .then(resolve)
            .catch((error: any) => {
              console.error('[CDM Contract] withdraw: -> Error:', error);
              reject(errorHandler(error));
            });
        })
        .catch((error: any) => {
          console.error('[CDM Contract] withdraw: -> Error:', error);
          reject(errorHandler(error));
        });
    });
  }

  /**
   * 其他挖矿的提币数量由中心化服务器提供，然后中心化服务器对提币人地址，提币数量签名, 提币人nonce 签名，
   * @param data
   */
  mintWithSignature(data: {
    vocher: {
      account: string;
      amount: string;
      nonce: string;
      claimType: number;
      signature: string;
    };
    onTransactionHash?: (hash: string) => void;
    options: ContractOptions;
  }) {
    return new Promise<any>(async (resolve, reject: RejectContractError) => {
      const mintWithSignature = this.contract.methods.mintWithSignature(
        data.vocher,
      );
      console.log('mintWithSignature:', data);

      mintWithSignature
        .estimateGas(data.options)
        .then((gas: any) => {
          console.log(
            '[CDM Contract] mintWithSignature: -> estimateGas = ',
            gas,
          );
          const options: ContractOptions = {
            ...data.options,
            gas: Math.round(gas * 1.1),
          };
          mintWithSignature
            .send(options)
            // 用户在metamask中点击确认会触发此事件，返回当前交易Hash
            .on('transactionHash', function (hash: any) {
              data.onTransactionHash && data.onTransactionHash(hash);
            })
            .then(resolve)
            .catch((error: any) => {
              console.error(
                '[CDM Contract] mintWithSignature: -> Error:',
                error,
              );
              reject(errorHandler(error));
            });
        })
        .catch((error: any) => {
          console.error('[CDM Contract] mintWithSignature: -> Error:', error);
          reject(errorHandler(error));
        });
    });
  }
}
