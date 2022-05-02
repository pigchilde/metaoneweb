import styles from './index.scss';
import { useIntl } from 'umi';
import testImg from '@/assets/news/pic/test.jpg';
import PaginationItem from '@/components/Pagination';
import Banner from './components/Banner';
import Tab from './components/Tab';
import { history } from 'umi';
import { connect } from 'dva';
import { useEffect } from 'react';
interface objectT {
  [propName: string]: any;
}
const News = (props: objectT) => {
  const { dispatch, news = {} } = props;
  const onShowSizeChange = () => {};
  const onClick = () => {
    history.push('/news/1');
  };
  useEffect(() => {
    dispatch({
      type: 'news/getList',
      payload: {
        id: 3,
      },
    }).then((res: objectT) => {
      console.log(res);
    });
  }, []);
  return (
    <>
      <Banner />

      <section className={`${styles['main']} wrapper`}>
        <Tab />
        <ul className={styles['list-item']}>
          <li onClick={onClick}>
            <div className={styles['img-box']}>
              <img src={testImg} alt="" />
            </div>
            <div className={styles['txt-box']}>
              <h6>MetaOne completes $1.2-million </h6>
              <p className={styles['txt-desc']}>
                MetaOne aims to be the world’s leading GameFi, guild management
                and analytics platform. Recently it ann
              </p>
              <p className={styles['txt-time']}>April 21 2022</p>
            </div>
          </li>
          <li onClick={onClick}>
            <div className={styles['img-box']}>
              <img src={testImg} alt="" />
            </div>
            <div className={styles['txt-box']}>
              <h6>MetaOne completes $1.2-million </h6>
              <p className={styles['txt-desc']}>
                MetaOne aims to be the world’s leading GameFi, guild management
                and analytics platform. Recently it ann
              </p>
              <p className={styles['txt-time']}>April 21 2022</p>
            </div>
          </li>
          <li onClick={onClick}>
            <div className={styles['img-box']}>
              <img src={testImg} alt="" />
            </div>
            <div className={styles['txt-box']}>
              <h6>MetaOne completes $1.2-million </h6>
              <p className={styles['txt-desc']}>
                MetaOne aims to be the world’s leading GameFi, guild management
                and analytics platform. Recently it ann
              </p>
              <p className={styles['txt-time']}>April 21 2022</p>
            </div>
          </li>
          <li onClick={onClick}>
            <div className={styles['img-box']}>
              <img src={testImg} alt="" />
            </div>
            <div className={styles['txt-box']}>
              <h6>MetaOne completes $1.2-million </h6>
              <p className={styles['txt-desc']}>
                MetaOne aims to be the world’s leading GameFi, guild management
                and analytics platform. Recently it ann
              </p>
              <p className={styles['txt-time']}>April 21 2022</p>
            </div>
          </li>
        </ul>
        <div className={styles['pagination-item']}>
          <PaginationItem />
        </div>
      </section>
    </>
  );
};

export default connect(({ news }: { news: objectT }) => ({
  news,
}))(News);
