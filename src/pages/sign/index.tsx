import styles from './index.scss';
import { useIntl } from 'umi';
const Sign = () => {
  const intl = useIntl();
  return (
    <div className={styles['sign-page']}>
      <div className={styles['sign-banner']}>
        <h3>
          {intl.formatMessage({
            id: 'SIGN_TITLE1',
          })}
        </h3>
      </div>
      <div className={styles['sign-main']}></div>
    </div>
  );
};
export default Sign;
