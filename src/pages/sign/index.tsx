import styles from './index.scss';
import { useIntl } from 'umi';
import { Tabs } from 'antd';

const { TabPane } = Tabs;
const Sign = () => {
  const intl = useIntl();
  const tabChange = () => {};
  return (
    <div className={styles['sign-page']}>
      <div className={styles['sign-banner']}>
        <h3>
          {intl.formatMessage({
            id: 'SIGN_TITLE1',
          })}
        </h3>
      </div>
      <div className={styles['sign-main']}>
        <Tabs defaultActiveKey="1" onChange={tabChange}>
          <TabPane tab="Tab 1" key="1">
            Content of Tab Pane 1
          </TabPane>
          <TabPane tab="Tab 2" key="2">
            Content of Tab Pane 2
          </TabPane>
          <TabPane tab="Tab 3" key="3">
            Content of Tab Pane 3
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
};
export default Sign;
