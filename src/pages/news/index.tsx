import styles from './index.less';
import { useIntl, setLocale } from 'umi';
const News = () => {
  const intl = useIntl();
  return (
    <div>
      <span className={styles['test']}>
        {intl.formatMessage({
          id: 'NEW',
        })}
      </span>
    </div>
  );
};

export default News;
