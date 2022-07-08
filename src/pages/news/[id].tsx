import styles from './index.scss';
import { useIntl } from 'umi';
import testImg from '@/assets/news/pic/test.jpg';
import PaginationItem from '@/components/Pagination';
import Banner from './components/Banner';
import Tab from './components/Tab';
import { useEffect, useState } from 'react';

import { connect } from 'dva';
import moment from 'moment';
import Loading from '@/components/Loading';
import { history } from 'umi';
interface objectT {
  [propName: string]: any;
}
const Detail = (props: objectT) => {
  const { location = {}, dispatch, match = {} } = props;
  const { params = {} } = match;
  const { query = {} } = location;
  const [loading, setLoading] = useState(true as boolean);
  const [newDatas, setNewDatas] = useState({} as objectT);
  const onShowSizeChange = () => {};
  /*tab切换*/
  const tabChange = (e: string) => {
    history.push(`/news?tab=${e}`);
  };
  useEffect(() => {
    setLoading(true);
    dispatch({
      type: 'news/getData',
      payload: {
        id: params.id,
      },
    }).then((res: objectT) => {
      const { code, data } = res;
      if (code === 0) {
        setNewDatas(data);
      }

      setLoading(false);
    });
  }, [params.id]);
  return (
    <>
      <Banner />

      <section className={`${styles['detail-main']} ${styles['wrapper']}`}>
        {loading ? (
          <Loading></Loading>
        ) : (
          <>
            <Tab value={query.tab} tabChange={tabChange} type="default" />
            <article className={styles['article-page']}>
              <h3>{newDatas.title}</h3>
              <span className={styles['time']}>
                {moment(newDatas.newsTime).format('LL')}
              </span>
              <div dangerouslySetInnerHTML={{ __html: newDatas.content }}></div>
            </article>
          </>
        )}
      </section>
    </>
  );
};

export default connect(({ news }: { news: objectT }) => ({
  news,
}))(Detail);
