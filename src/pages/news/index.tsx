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
import moment from 'moment';
interface objectT {
  [propName: string]: any;
}
const News = (props: objectT) => {
  const { location = {}, dispatch, news = {} } = props;
  const { query = {} } = location;
  const [params, setParams] = useState({
    pageNum: 1,
    pageSize: 12,
  } as objectT);
  const [listDatas, setListDatas] = useState({} as objectT);
  const [loading, setLoading] = useState(true as boolean);
  const [tabValue, seTabValue] = useState(
    query.tab ? query.tab : ('COMPREHENSIVE' as string),
  );
  const onPageChange = (e: number) => {
    setParams({ ...params, pageNum: e });
  };
  const onLiClick = (i: objectT) => {
    history.push(`/news/${i.id}?tab=${tabValue}`);
  };

  /*tab切换*/
  const tabChange = (e: string) => {
    seTabValue(e);
    setParams({ ...params, pageNum: 1 });
  };

  useEffect(() => {
    // console.log(moment('2022/03/12').format('LL'));
    // return;
    setLoading(true);
    dispatch({
      type: 'news/getList',
      payload: {
        id: tabValue,
        data: params,
      },
    }).then((res: objectT) => {
      const { code, data } = res;
      if (code === 0) {
        const newData = data.map((i: objectT) => {
          //80个字外架省略号
          const ellipsisContent = i.outline
            ? autoAddEllipsis(i.outline, 80)
            : { data: '' };
          return { ...i, ellipsisContent: ellipsisContent.data };
        });
        setListDatas({ ...res, data: newData });
      }

      setLoading(false);
    });
  }, [tabValue, params]);
  return (
    <>
      <Banner />

      <section className={`${styles['main']} wrapper`}>
        <Tab tabChange={tabChange} value={tabValue} />
        <ul className={styles['list-item']}>
          {loading ? (
            <Loading></Loading>
          ) : listDatas.data.length ? (
            listDatas.data.map((i: objectT) => {
              return (
                <li onClick={() => onLiClick(i)} key={i.id}>
                  <div className={styles['img-box']}>
                    <img src={i.img} alt="" />
                  </div>
                  <div className={styles['txt-box']}>
                    <h6>{i.title} </h6>
                    <p className={styles['txt-desc']}>{i.ellipsisContent}</p>
                    <p className={styles['txt-time']}>
                      {moment(i.createTime).format('LL')}
                    </p>
                  </div>
                </li>
              );
            })
          ) : (
            <Empty></Empty>
          )}
        </ul>
        {listDatas.data && listDatas.data.length ? (
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
        ) : (
          ''
        )}
      </section>
    </>
  );
};

export default connect(({ news }: { news: objectT }) => ({
  news,
}))(News);
