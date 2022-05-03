import styles from './index.scss';
import { Tabs } from 'antd';
import { useIntl } from 'umi';
import { connect } from 'dva';
const { TabPane } = Tabs;
interface objectT {
  [propName: string]: any;
}
const Tab = (props: objectT) => {
  const { news = {}, dispatch, tabChange, value } = props;
  const intl = useIntl();
  const tabDatas = [
    {
      id: 'COMPREHENSIVE',
      name: '测试',
    },
    {
      id: 'LATEST',
      name: '最新数据',
    },
  ];

  return (
    <Tabs
      defaultActiveKey={value}
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
