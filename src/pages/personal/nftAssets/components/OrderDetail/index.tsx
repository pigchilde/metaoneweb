import styles from './index.scss';
import { connect, useIntl } from 'umi';
import { Button, Tabs } from 'antd';
import moment from 'moment';
import { ObjectT } from '../../typing';
import { useEffect, useState } from 'react';

const OrderDetail = (props: ObjectT) => {
  const {
    data = {},
    mode,
    nftAssets: { account, contract },
  } = props;
  const [orderData, setOrderData] = useState<ObjectT>({});
  const intl = useIntl();
  const rentMethods = contract?.rent.methods;
  const tokenId = 5;
  const targetLeaser = 1;
  console.log(rentMethods);

  /**
   * 获取出租出去的nft订单信息
   */
  const getOrderInfo = async () => {
    const orderList = await rentMethods.getMyDepositsList().call();
    const orderInfo = orderList.find(
      (item: ObjectT) => item.tokenID == tokenId,
    );
    const { price, renewable } = orderInfo;
    setOrderData({
      ...orderInfo,
      price: parseInt(price) / 1e18,
      targetLeaser: targetLeaser ? 'My Guild Only' : 'All Guilds',
      renewable: renewable ? 'Yes' : 'No',
    });
  };

  useEffect(() => {
    if (contract) {
      getOrderInfo();
    }
  }, [contract]);

  return (
    <div className={styles['tabs-main']}>
      <p className={styles['tabs-item']}>
        <span className={styles['item1']}>Rental</span>
        <span className={styles['item2']}>{orderData.price} USDT/DAY</span>
      </p>
      {console.log(orderData)}
      {/* {mode === 'share' ? (
        <p className={styles['tabs-item']}>
          <span className={styles['item1']}>Proportion</span>
          <span className={styles['item2']}>
            {data.leaseInfo?.shareProportion}%
          </span>
        </p>
      ) : null} */}
      <p className={styles['tabs-item']}>
        <span className={styles['item1']}>Least lease term</span>
        <span className={styles['item2']}>
          {orderData.minimumLeaseTime} DAY
        </span>
      </p>
      <p className={styles['tabs-item']}>
        <span className={styles['item1']}>Longest lease term</span>
        <span className={styles['item2']}>
          {orderData.maximumLeaseTime} DAY
        </span>
      </p>
      <p className={styles['tabs-item']}>
        <span className={styles['item1']}>Target leaser</span>
        <span className={styles['item2']}>{orderData.targetLeaser}</span>
      </p>
      <p className={styles['tabs-item']}>
        <span className={styles['item1']}>Renewable</span>
        <span className={styles['item2']}>{orderData.renewable}</span>
      </p>
      {data.rentInfo ? (
        <Button className={`${styles['btn']} ${styles['default-btn']}`}>
          End Date:{' '}
          {moment(data.rentInfo.rentTime).format('YYYY/MM/DD HH:mm:ss')}
        </Button>
      ) : (
        <Button
          type="primary"
          className={`${styles['btn']} ${styles['cancel-btn']}`}
        >
          {intl.formatMessage({
            id: 'PERSONAL_GUILD_BTN',
          })}
        </Button>
      )}
    </div>
  );
};

export default connect(({ nftAssets }: { nftAssets: ObjectT }) => ({
  nftAssets,
}))(OrderDetail);
