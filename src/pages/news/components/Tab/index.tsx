import styles from './index.scss';
import { Tabs } from 'antd';
import { useIntl } from 'umi';
import { connect } from 'dva';
const { TabPane } = Tabs;
interface objectT {
  [propName: string]: any;
}
const Tab = (props: objectT) => {
  const { news = {}, dispatch } = props;
  /*tab切换*/
  const tabChange = (e: string) => {
    dispatch({
      type: 'news/setData',
      payload: {
        name: 'tabValue',
        data: e,
      },
    });
  };
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

export default connect(({ news }: { news: objectT }) => ({
  news,
}))(Tab);
