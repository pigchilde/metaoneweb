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

  return (
    <div className={styles['tabs-main']}>
      <p className={styles['tabs-item']}>
        <span className={styles['item1']}>Rental</span>
        <span className={styles['item2']}>{orderData.price} USDT/DAY</span>
      </p>
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
