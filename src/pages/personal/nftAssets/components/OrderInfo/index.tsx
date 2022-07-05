import styles from './index.scss';
import { useIntl, history, connect } from 'umi';
import { Button, message, Tabs } from 'antd';
import { useEffect, useState } from 'react';
import OrderDetail from '../OrderDetail';
import MakeOrder from '../MakeOrder';
import { ModeType, ObjectT } from '../../typing';
import { ContractListObject, initTransactionConf } from '@/utils/contract';
const { TabPane } = Tabs;

const OrderInfo = (props: ObjectT) => {
  const {
    data = {},
    dispatch,
    nftAssets: { contract, orderInfo },
  } = props;
  const intl = useIntl();
  const [tabKey, setTabKey] = useState(ModeType.lease);
  const [loading, setLoading] = useState(false);
  const {
    location: { query },
  } = history;
  const type = query?.type;
  const erc721Methods = contract?.erc721.methods;
  const rentMethods = contract?.rent.methods;
  const targetLeaser = 1;

  // const tabChange = (activeKey: string) => {
  //   setTabKey(parseInt(activeKey));
  // };

  /**
   * 铸造nft（测试用）
   */
  const mintNFT = async () => {
    setLoading(true);
    console.log('account', window.ethereum.seletedAddress);
    try {
      await erc721Methods
        .mint(window.ethereum.seletedAddress, `testNFT7`)
        .send({
          from: window.ethereum.seletedAddress,
        });
      setLoading(false);
      message.success('mint success');
    } catch (err) {
      setLoading(false);
      message.error((err as Error).message);
    }
  };

  /**
   * 获取出租出去的nft订单信息
   */
  const getOrderInfo = async () => {
    const orderInfo = await rentMethods.getLendItemMsg(5).call();
    console.log(orderInfo);
    if (!orderInfo) {
      return;
    }
    const { price, renewable } = orderInfo;
    const newOrderInfo = {
      ...orderInfo,
      price: parseInt(price) / 1e18,
      targetLeaser: targetLeaser ? 'My Guild Only' : 'All Guilds',
      renewable: renewable ? 'Yes' : 'No',
    };
    dispatch({
      type: 'nftAssets/setData',
      payload: {
        orderInfo: newOrderInfo,
      },
    });
  };

  useEffect(() => {
    initTransactionConf((contract: ContractListObject) => {
      dispatch({
        type: 'nftHub/setData',
        payload: {
          contract,
        },
      });
      dispatch({
        type: 'nftAssets/setData',
        payload: {
          contract,
        },
      });
    });
  }, []);

  useEffect(() => {
    if (contract) {
      getOrderInfo();
    }
  }, [contract]);
  return (
    <div>
      <p className={styles['lessess-address']}>
        Owner Address:
        <span>
          {' '}
          {`${orderInfo.lender?.substr(0, 6)}...${orderInfo.lender?.substr(
            -4,
          )}`}
        </span>
        <Button type="primary" onClick={mintNFT} disabled={loading}>
          mint NFT
        </Button>
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
        {/* ) : ( */}
        {/* <OrderDetail data={data} mode={tabKey} /> */}
        {/* )} */}
      </div>
    </div>
  );
};

export default connect(({ nftAssets }: { nftAssets: ObjectT }) => ({
  nftAssets,
}))(OrderInfo);
