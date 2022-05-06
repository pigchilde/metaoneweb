import styles from './index.scss';
import { Layout, Button } from 'antd';
import { Link, useIntl, setLocale } from 'umi';
import { useRef } from 'react';

const Header = () => {
  const intl = useIntl();
  const lang = useRef('US');

  //切换语言
  const setLang = (lang: string) => {
    setLocale(lang, true);
  };

  return (
    <Layout.Header className={styles['header']}>
      <div className={styles['hd-l']}>
        <Link to="/" className={styles['logo']}>
          <img src={require('@/assets/common/img/logo.png')} />
          <h1>{intl.formatMessage({ id: 'META_ONE' })}</h1>
        </Link>
        <i className={styles['btn-menu']}></i>
        <nav className={styles['nav']}>
          <Link to="/guilds">{intl.formatMessage({ id: 'GUILDS' })}</Link>
          <Link to="/gamers">{intl.formatMessage({ id: 'GAMERS' })}</Link>
          <Link to="">{intl.formatMessage({ id: 'NFTS_OWNER' })}</Link>
          <Link to="/gamefi">{intl.formatMessage({ id: 'GameFi' })}</Link>
          <Link to="">{intl.formatMessage({ id: 'ANNOUNCEMENT' })}</Link>
          <Link to="">{intl.formatMessage({ id: 'NFTS_HUB' })}</Link>
          <Link to="">{intl.formatMessage({ id: 'STAKING' })}</Link>
        </nav>
      </div>
      <div className={styles['hd-r']}>
        <Link to="" className={styles['btn-help']}></Link>
        <div className={styles['op-msg']}>
          <span className={styles['msg-num']}>99+</span>
        </div>
        <div className={styles['op-lang']}>
          <span className={styles['lang-name']}>
            {intl.formatMessage({ id: lang.current })}
          </span>
          <div className="lang-list"></div>
        </div>
        <div className={styles['user-sign']}>
          {/* 未登录 */}
          <div className={styles['unsign']}>
            <Button className={styles['btn-register']} ghost href="/register">
              {intl.formatMessage({ id: 'REGISTER' })}
            </Button>
            <Button
              className={styles['btn-signin']}
              type="primary"
              href="/login"
            >
              {intl.formatMessage({ id: 'SIGN_IN' })}
            </Button>
          </div>
          {/* 已登录 */}
          <div className={styles['signed']}></div>
        </div>
      </div>
    </Layout.Header>
  );
};

export default Header;
