import styles from './index.scss';
import { Tabs } from 'antd';
import { useIntl } from 'umi';
const { TabPane } = Tabs;
const Tab = () => {
  const tabChange = () => {};
  const intl = useIntl();
  return (
    <Tabs
      defaultActiveKey="1"
      onChange={tabChange}
      className={styles['tab-box']}
    >
      <TabPane
        tab={intl.formatMessage({
          id: 'SIGN_TAB_GAME',
        })}
        key="1"
      ></TabPane>
      <TabPane
        tab="dddddddddddddddddddddddddddddddddddddddddddddddddddddddd"
        key="2"
      ></TabPane>
      <TabPane
        tab={intl.formatMessage({
          id: 'SIGN_TAB_NFT',
        })}
        key="3"
      ></TabPane>
    </Tabs>
  );
};
export default Tab;
