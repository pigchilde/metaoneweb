import styles from './index.less';
import { useIntl, setLocale } from 'umi';
import testImg from '../../assets/news/pic/test.jpg';
const News = () => {
  const intl = useIntl();
  return (
    <>
      <header className={styles['banner']}>
        <div className={`${styles['wrapper']}`}>
          <h2 className={`${styles['banner-h2']}`}>
            {intl.formatMessage({
              id: 'NEW_h2',
            })}
          </h2>
          <p className={`${styles['banner-p']}`}>
            #Metaone #GameFi #NFTs #guilds #community #BlockchainGaming
            https://t.co/7ToJurhNxs
          </p>
        </div>
      </header>
      <section className={`${styles['main']} ${styles['wrapper']}`}>
        <ul className={styles['tab-box']}>
          <li>dsadadasdasd</li>
          <li>dsadadasdasd</li>
          <li>
            dsadadaddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddsdasd
          </li>
          <li>dsadadasdasd</li>
          <li>dsadadasdasd</li>
        </ul>
        <ul className={styles['list-item']}>
          <li>
            <img src={testImg} alt="" />
          </li>
        </ul>
      </section>
    </>
  );
};

export default News;
