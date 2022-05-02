import styles from './index.scss';
import { useIntl } from 'umi';
const Banner = () => {
  const intl = useIntl();
  return (
    <header className={styles['banner']}>
      <div className={`wrapper ${styles['wrap_bg']}`}>
        <div className={styles['banner-title']}>
          <h2>135</h2>
          <p>
            {intl.formatMessage({
              id: 'GUILDS_BANNER_TITLE',
            })}
          </p>
        </div>
        <div className={styles['banner-con']}>
          <h2>
            {intl.formatMessage({
              id: 'GUILDS_BANNER_CON_TITLE',
            })}
          </h2>
          <p>
            {intl.formatMessage({
              id: 'GUILDS_BANNER_CON_DES',
            })}
          </p>
        </div>
      </div>
    </header>
  );
};
export default Banner;
