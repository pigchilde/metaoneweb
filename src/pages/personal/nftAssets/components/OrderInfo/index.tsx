import styles from './index.scss';
import { useIntl } from 'umi';
import { Button, Tabs } from 'antd';
import { useState } from 'react';
import moment from 'moment';
const { TabPane } = Tabs;

interface objectT {
  [propName: string]: any;
}

const OrderInfo = (props: objectT) => {
  const { data = {} } = props;
  const intl = useIntl();
  const [tabKey, setTabKey] = useState('lease');

  const tabChange = (activeKey: string) => {
    setTabKey(activeKey);
  };
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
      <div className={styles['rounded-rectangle']}>
        <Tabs
          defaultActiveKey="1"
          onChange={tabChange}
          className={styles['tab-box']}
        >
          <TabPane
            tab={intl.formatMessage({
              id: 'PERSONAL_GUILD_TABS1',
            })}
            key="lease"
          ></TabPane>
          <TabPane
            tab={intl.formatMessage({
              id: 'PERSONAL_GUILD_TABS2',
            })}
            key="share"
          ></TabPane>
        </Tabs>
        <div className={styles['tabs-main']}>
          <p className={styles['tabs-item']}>
            <span className={styles['item1']}>Interast</span>
            <span className={styles['item2']}>
              {data.leaseInfo?.interest} USDT/DAY
            </span>
          </p>
          {tabKey === 'share' ? (
            <p className={styles['tabs-item']}>
              <span className={styles['item1']}>Proportion</span>
              <span className={styles['item2']}>
                {data.leaseInfo?.shareProportion}%
              </span>
            </p>
          ) : null}
          <p className={styles['tabs-item']}>
            <span className={styles['item1']}>Least lease term</span>
            <span className={styles['item2']}>
              {data.leaseInfo?.leastTerm} DAY
            </span>
          </p>
          <p className={styles['tabs-item']}>
            <span className={styles['item1']}>Longest lease term</span>
            <span className={styles['item2']}>
              {data.leaseInfo?.longestTerm} DAY
            </span>
          </p>
          <p className={styles['tabs-item']}>
            <span className={styles['item1']}>Target leaser</span>
            <span className={styles['item2']}>All guilds</span>
          </p>
          <p className={styles['tabs-item']}>
            <span className={styles['item1']}>Renewable</span>
            <span className={styles['item2']}>Yes</span>
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
      </div>
    </div>
  );
};

export default OrderInfo;
