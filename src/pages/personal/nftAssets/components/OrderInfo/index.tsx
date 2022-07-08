import styles from './index.scss';
import { useIntl, history } from 'umi';
import { Tabs } from 'antd';
import { useState } from 'react';
import OrderDetail from '../OrderDetail';
import MakeOrder from '../MakeOrder';
const { TabPane } = Tabs;

interface objectT {
  [propName: string]: any;
}

const OrderInfo = (props: objectT) => {
  const { data = {} } = props;
  const intl = useIntl();
  const [tabKey, setTabKey] = useState('lease');
  const {
    location: { query },
  } = history;
  const type = query?.type;

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
      <div
        className={`${styles['rounded-rectangle']} ${
          type === 'makeOrder' ? styles['form-style'] : ''
        }`}
      >
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
        {type === 'makeOrder' ? (
          <MakeOrder data={data} mode={tabKey} />
        ) : (
          <OrderDetail data={data} mode={tabKey} />
        )}
      </div>
    </div>
  );
};

export default OrderInfo;
