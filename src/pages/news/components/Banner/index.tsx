import styles from './index.scss';
import { useIntl } from 'umi';
const Banner = () => {
  const intl = useIntl();
  return (
    <header className={styles['banner']}>
      <div className={`${styles['wrapper']}`}>
        <h2 className={`${styles['banner-h2']}`}>
          {intl.formatMessage({
            id: 'NEW_h2',
          })}
        </h2>
        {/* <p className={`${styles['banner-p']}`}>
          #Metaone #GameFi #NFTs #guilds #community #BlockchainGaming
          https://t.co/7ToJurhNxs
        </p> */}
      </div>
    </header>
  );
};
export default Banner;
