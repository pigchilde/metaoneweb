import styles from './index.scss';
import { Tabs } from 'antd';
import { useIntl } from 'umi';
import { connect } from 'dva';
import { useEffect, useState } from 'react';
const { TabPane } = Tabs;
interface objectT {
  [propName: string]: any;
}
const Tab = (props: objectT) => {
  const { news = {}, dispatch, tabChange, value } = props;
  const intl = useIntl();
  const [tabDatas, setTabDatas] = useState([] as objectT);

  useEffect(() => {
    dispatch({
      type: 'news/getDicItem',
      payload: {
        id: 'CMS_NEWS_CATEGORY',
      },
    }).then((res: objectT) => {
      const { code, data } = res;
      if (code === 0 && data.length) {
        setTabDatas(data);
        tabChange('1001');
        // const newData = data.map((i: objectT) => {
        //   //80个字外架省略号
        //   const ellipsisContent = i.outline
        //     ? autoAddEllipsis(i.outline, 80)
        //     : { data: '' };
        //   return { ...i, ellipsisContent: ellipsisContent.data };
        // });
        // setListDatas({ ...res, data: newData });
      }
    });
  }, []);

  return (
    <Tabs activeKey={value} onChange={tabChange} className={styles['tab-box']}>
      {tabDatas.map((i: objectT) => {
        return <TabPane tab={i.name} key={i.code}></TabPane>;
      })}
    </Tabs>
  );
};

export default connect(({ news }: { news: objectT }) => ({
  news,
}))(Tab);
