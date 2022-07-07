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
    nftAssets: { orderInfo },
  } = props;
  const intl = useIntl();

  return (
    <div className={styles['tabs-main']}>
      <p className={styles['tabs-item']}>
        <span className={styles['item1']}>
          {intl.formatMessage({ id: 'NFTASSETS_RENTAL' })}
        </span>
        <span className={styles['item2']}>
          {orderInfo.price} USDT/{intl.formatMessage({ id: 'NFTASSETS_DAY' })}
        </span>
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
        <span className={styles['item1']}>
          {intl.formatMessage({ id: 'NFTASSETS_LEAST_LEASE_TERM' })}
        </span>
        <span className={styles['item2']}>
          {orderInfo.minimumLeaseTime}{' '}
          {intl.formatMessage({ id: 'NFTASSETS_DAY' })}
        </span>
      </p>
      <p className={styles['tabs-item']}>
        <span className={styles['item1']}>
          {intl.formatMessage({ id: 'NFTASSETS_LONGEST_LEASE_TERM' })}
        </span>
        <span className={styles['item2']}>
          {orderInfo.maximumLeaseTime}{' '}
          {intl.formatMessage({ id: 'NFTASSETS_DAY' })}
        </span>
      </p>
      <p className={styles['tabs-item']}>
        <span className={styles['item1']}>
          {intl.formatMessage({ id: 'NFTASSETS_TARGET_LEASER' })}
        </span>
        <span className={styles['item2']}>{orderInfo.targetLeaser}</span>
      </p>
      <p className={styles['tabs-item']}>
        <span className={styles['item1']}>
          {intl.formatMessage({ id: 'NFTASSETS_RENEWABLE' })}
        </span>
        <span className={styles['item2']}>{orderInfo.renewable}</span>
      </p>
      {data.rentInfo ? (
        <Button className={`${styles['btn']} ${styles['default-btn']}`}>
          {intl.formatMessage({ id: 'NFTASSETS_END_DATE' })}:{' '}
          {moment(data.rentInfo.rentTime).format('YYYY/MM/DD HH:mm:ss')}
        </Button>
      ) : (
        <Button
          type="primary"
          className={`${styles['btn']} ${styles['cancel-btn']}`}
        >
          {intl.formatMessage({
            id: 'NFTASSETS_CANCEL',
          })}
        </Button>
      )}
    </div>
  );
};

export default connect(({ nftAssets }: { nftAssets: ObjectT }) => ({
  nftAssets,
}))(OrderDetail);
