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
  const intl = useIntl();
  const tabDatas = [
    {
      id: 10,
      name: '测试',
    },
    {
      id: 1001,
      name: '最新数据',
    },
  ];
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
  return (
    <Tabs
      defaultActiveKey="1"
      onChange={tabChange}
      className={styles['tab-box']}
    >
      {tabDatas.map((i) => {
        return <TabPane tab={i.name} key={i.id}></TabPane>;
      })}
    </Tabs>
  );
};

export default connect(({ news }: { news: objectT }) => ({
  news,
}))(Tab);
