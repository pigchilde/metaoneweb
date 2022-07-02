import styles from './index.scss';
import { useIntl, history, connect } from 'umi';
import { Tabs } from 'antd';
import { useEffect, useState } from 'react';
import OrderDetail from '../OrderDetail';
import MakeOrder from '../MakeOrder';
import web3Utils from '@/utils/web3';
import { ContractListObject, ModeType, ObjectT } from '../../typing';
import contractConfig from '@/utils/contract/config';
const { TabPane } = Tabs;

const OrderInfo = (props: ObjectT) => {
  const { data = {}, dispatch } = props;
  const intl = useIntl();
  const [tabKey, setTabKey] = useState(ModeType.lease);
  const [account, setAccount] = useState('');
  const {
    location: { query },
  } = history;
  const type = query?.type;

  /**
   * 初始化合约列表
   */
  const initContract = () => {
    const contractList: ContractListObject = {};
    for (let k in contractConfig) {
      const contract = web3Utils.initContract(
        contractConfig[k].abi,
        contractConfig[k].address,
        account,
      );
      contractList[k] = contract;
    }
    dispatch({
      type: 'nftAssets/setData',
      payload: {
        contract: contractList,
      },
    });
  };

  /**
   * 初始化账户和合约
   */
  const initAccount = async () => {
    const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
    setAccount(accounts[0]);
    dispatch({
      type: 'nftAssets/setData',
      payload: {
        account: accounts[0],
      },
    });
  };

  // const tabChange = (activeKey: string) => {
  //   setTabKey(parseInt(activeKey));
  // };

  useEffect(() => {
    initAccount();
    initContract();
  }, []);
  return (
    <div>
      <p className={styles['lessess-address']}>
        {intl.formatMessage({
          id: 'PERSONAL_GUILD_ADDRESS',
        })}
        <span>
          {' '}
          {`${data.owner?.substr(0, 6)}...${data.owner?.substr(-4)}`}
        </span>
      </p>
      <div
        className={`${styles['rounded-rectangle']} ${
          type === 'makeOrder' ? styles['form-style'] : ''
        }`}
      >
        {/* <Tabs
          defaultActiveKey={tabKey.toString()}
          onChange={tabChange}
          className={styles['tab-box']}
        >
          <TabPane
            tab={intl.formatMessage({
              id: 'PERSONAL_GUILD_TABS1',
            })}
            key={ModeType.lease}
          ></TabPane>
          <TabPane
            tab={intl.formatMessage({
              id: 'PERSONAL_GUILD_TABS2',
            })}
            key={ModeType.share}
          ></TabPane>
        </Tabs> */}
        {/* {type === 'makeOrder' ? ( */}
        <MakeOrder data={data} mode={tabKey} />
        {/* ) : (
          <OrderDetail data={data} mode={tabKey} />
        )} */}
      </div>
    </div>
  );
};

export default connect(({ nftAssets }: { nftAssets: ObjectT }) => ({
  nftAssets,
}))(OrderInfo);
