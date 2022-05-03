import styles from './index.scss';
import { useIntl } from 'umi';
const Banner = () => {
  const intl = useIntl();
  return (
    <header className={styles['banner']}>
      <div className={`wrapper ${styles['wrap_bg']}`}>
        <div className={styles['banner-title']}>
          <h2>1000+</h2>
          <p>
            {intl.formatMessage({
              id: 'GAMERS_BANNER_TITLE',
            })}
          </p>
        </div>
        <div className={styles['banner-con']}>
          <h2>Fast Track for Gamers into the Gaming Metaverse.</h2>
          <p>
            MetaOne ensures seamless process and experience with our easy guided
            activation tools, well mapped out NFT game plays, and potential earn
            out models.
          </p>
        </div>
      </div>
    </header>
  );
};
export default Banner;
