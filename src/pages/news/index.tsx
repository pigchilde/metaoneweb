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
            <div className={styles['img-box']}></div>
            <img src={testImg} alt="" />
            <div className={styles['txt-box']}>
              <h6>MetaOne completes $1.2-million </h6>
              <p className={styles['txt-desc']}>
                MetaOne aims to be the world’s leading GameFi, guild management
                and analytics platform. Recently it ann
              </p>
              <p className={styles['txt-time']}>April 21 2022</p>
            </div>
          </li>
          <li>
            <div className={styles['img-box']}></div>
            <img src={testImg} alt="" />
            <div className={styles['txt-box']}>
              <h6>MetaOne completes $1.2-million </h6>
              <p className={styles['txt-desc']}>
                MetaOne aims to be the world’s leading GameFi, guild management
                and analytics platform. Recently it ann
              </p>
              <p className={styles['txt-time']}>April 21 2022</p>
            </div>
          </li>
          <li>
            <div className={styles['img-box']}></div>
            <img src={testImg} alt="" />
            <div className={styles['txt-box']}>
              <h6>MetaOne completes $1.2-million </h6>
              <p className={styles['txt-desc']}>
                MetaOne aims to be the world’s leading GameFi, guild management
                and analytics platform. Recently it ann
              </p>
              <p className={styles['txt-time']}>April 21 2022</p>
            </div>
          </li>
          <li>
            <div className={styles['img-box']}></div>
            <img src={testImg} alt="" />
            <div className={styles['txt-box']}>
              <h6>MetaOne completes $1.2-million </h6>
              <p className={styles['txt-desc']}>
                MetaOne aims to be the world’s leading GameFi, guild management
                and analytics platform. Recently it ann
              </p>
              <p className={styles['txt-time']}>April 21 2022</p>
            </div>
          </li>
          <li>
            <div className={styles['img-box']}></div>
            <img src={testImg} alt="" />
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
      </section>
    </>
  );
};

export default News;
