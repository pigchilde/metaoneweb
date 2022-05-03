import styles from './index.scss';
import { useIntl } from 'umi';
import testImg from '@/assets/news/pic/test.jpg';
import PaginationItem from '@/components/Pagination';
import Empty from '@/components/Empty';
import Loading from '@/components/Loading';
import Banner from './components/Banner';
import Tab from './components/Tab';
import { history } from 'umi';
import { connect } from 'dva';
import { useEffect, useState } from 'react';
import { autoAddEllipsis } from '@/utils/utils';
interface objectT {
  [propName: string]: any;
}
const News = (props: objectT) => {
  const { dispatch, news = {} } = props;
  const [params, setParams] = useState({
    pageNum: 1,
    pageSize: 12,
  } as objectT);
  const [listDatas, setListDatas] = useState({} as objectT);
  const [loading, setLoading] = useState(true as boolean);
  const onPageChange = (e: number) => {
    setParams({ ...params, pageNum: e });
  };
  const onClick = () => {
    history.push('/news/1');
  };

  useEffect(() => {
    setLoading(true);
    dispatch({
      type: 'news/getList',
      payload: {
        id: news.tabValue,
        data: params,
      },
    }).then((res: objectT) => {
      const { code, data } = res;
      if (code === 0) {
        const newData = data.map((i: objectT) => {
          //80个字外架省略号
          const ellipsisContent = autoAddEllipsis(i.content, 80);
          return { ...i, ellipsisContent: ellipsisContent.data };
        });
        setListDatas({ ...res, data: newData });
      }

      setLoading(false);
    });
  }, [news.tabValue, params]);
  return (
    <>
      <Banner />

      <section className={`${styles['main']} wrapper`}>
        <Tab />
        <ul className={styles['list-item']}>
          {loading ? (
            <Loading></Loading>
          ) : listDatas.data.length ? (
            listDatas.data.map((i: objectT) => {
              return (
                <li onClick={onClick} key={i.id}>
                  <div className={styles['img-box']}>
                    <img src={i.img} alt="" />
                  </div>
                  <div className={styles['txt-box']}>
                    <h6>{i.title} </h6>
                    <p className={styles['txt-desc']}>{i.ellipsisContent}</p>
                    <p className={styles['txt-time']}>April 21 2022</p>
                  </div>
                </li>
              );
            })
          ) : (
            <Empty></Empty>
          )}
        </ul>
        <div className={styles['pagination-item']}>
          <PaginationItem
            datas={{
              total: listDatas.count ? listDatas.count : 1,
              current: params.pageNum,
              pageSize: params.pageSize,
            }}
            onPageChange={onPageChange}
          />
        </div>
      </section>
    </>
  );
};

export default connect(({ news }: { news: objectT }) => ({
  news,
}))(News);
