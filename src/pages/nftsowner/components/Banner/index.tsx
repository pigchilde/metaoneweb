import styles from './index.scss';
import { useIntl } from 'umi';

interface objectT {
  [propName: string]: any;
}

const Banner = (props: objectT) => {
  const intl = useIntl();
  const {
    data: { title, backageImg, content, transactions, volume },
  } = props;
  const background = {
    background: `url(${backageImg}) no-repeat right 0`,
  };
  return (
    <header className={styles['banner']}>
      <div className={`wrapper ${styles['wrap_bg']}`} style={background}>
        <div className={styles['banner-title']}>
          <h2>{volume}</h2>
          <p>
            {intl.formatMessage({
              id: 'NFTSOWNER_VOLUME',
            })}
          </p>
          <h2>{transactions}</h2>
          <p>
            {intl.formatMessage({
              id: 'NFTSOWNER_TRANSACTIONS',
            })}
          </p>
        </div>
        <div className={styles['banner-con']}>
          <h2>{title}</h2>
          <p>{content}</p>
        </div>
      </div>
    </header>
  );
};
export default Banner;
