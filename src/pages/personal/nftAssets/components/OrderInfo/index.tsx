import styles from './index.scss';
import { useIntl, history, connect } from 'umi';
import { Tabs } from 'antd';
import { useEffect, useState } from 'react';
import OrderDetail from '../OrderDetail';
import MakeOrder from '../MakeOrder';
import { ModeType, ObjectT } from '../../typing';
import { initAccount, initContract } from '@/utils/contract';
const { TabPane } = Tabs;

const OrderInfo = (props: ObjectT) => {
  const { data = {}, dispatch } = props;
  const intl = useIntl();
  const [tabKey, setTabKey] = useState(ModeType.lease);
  const {
    location: { query },
  } = history;
  const type = query?.type;

  // const tabChange = (activeKey: string) => {
  //   setTabKey(parseInt(activeKey));
  // };

  // 初始化账户和合约
  const initAccountAndContract = async () => {
    const account = await initAccount();
    dispatch({
      type: 'nftAssets/setData',
      payload: {
        account,
      },
    });
    const contract = initContract(account);
    console.log(contract);
    dispatch({
      type: 'nftAssets/setData',
      payload: {
        contract,
      },
    });
  };

  useEffect(() => {
    initAccountAndContract();
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
        {/* <MakeOrder data={data} mode={tabKey} /> */}
        {/* ) : ( */}
        <OrderDetail data={data} mode={tabKey} />
        {/* )} */}
      </div>
    </div>
  );
};

export default connect(({ nftAssets }: { nftAssets: ObjectT }) => ({
  nftAssets,
}))(OrderInfo);
