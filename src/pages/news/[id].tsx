import styles from './index.scss';
import { useIntl } from 'umi';
import testImg from '@/assets/news/pic/test.jpg';
import PaginationItem from '@/components/Pagination';
import Banner from './components/Banner';
import Tab from './components/Tab';
const Detail = () => {
  const onShowSizeChange = () => {};
  return (
    <>
      <Banner />

      <section className={`${styles['main']} ${styles['wrapper']}`}>
        <Tab />
        <article className={styles['article-page']}>
          <h3>WHAT IS THE POTENTIAL OF THE GAMEFI SPACE</h3>
          <img src={testImg} alt="" />
          <p>
            sdfsfsdffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffsdfsfsdffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffsdfsfsdffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffsdfsfsdffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffsdfsfsdffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffsdfsfsdffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
          </p>
        </article>
        <div className={styles['pagination-item']}>
          <PaginationItem />
        </div>
      </section>
    </>
  );
};

export default Detail;
