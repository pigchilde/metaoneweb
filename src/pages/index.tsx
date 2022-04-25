import styles from './index.less';
import { useIntl, setLocale, Link } from 'umi';
export default function IndexPage() {
  const intl = useIntl();
  //切换成英文
  const setLang = (lang: string) => {
    setLocale(lang, true);
  };
  return (
    <div>
      <h1 className={styles.title} onClick={() => setLang('zh-CN')}>
        {intl.formatMessage({
          id: 'CN',
        })}
      </h1>
      <h1 className={styles.title} onClick={() => setLang('en-US')}>
        {intl.formatMessage({
          id: 'US',
        })}
      </h1>
      <Link to={`/news`}>
        {intl.formatMessage({
          id: 'NEW',
        })}
      </Link>
    </div>
  );
}
