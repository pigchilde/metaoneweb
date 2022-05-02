import styles from './index.scss';
import { useIntl } from 'umi';
const Banner = () => {
  const intl = useIntl();
  return (
    <header className={styles['banner']}>
      <div className={`${styles['wrapper']}`}>
        <h2 className={`${styles['banner-h2']}`}>
          {intl.formatMessage({
            id: 'GAMERS_BANNER_TITLE',
          })}
        </h2>
        <p className={`${styles['banner-p']}`}>
          {intl.formatMessage({
            id: 'GAMERS_BANNER_DES',
          })}
        </p>
      </div>
    </header>
  );
};
export default Banner;
