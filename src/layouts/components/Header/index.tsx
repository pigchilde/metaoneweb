import styles from './index.scss';
import { Layout, Button } from 'antd';
import { Link, useIntl, setLocale } from 'umi';
import { useRef, useState } from 'react';

const LANG_LIST = [
  {
    flag: 'EN',
    localeFile: 'en-US',
    localeItemId: 'LANG_ENGLISH',
  },
  {
    flag: 'CH',
    localeFile: 'zh-CN',
    localeItemId: 'LANG_CHINESE_SIMPLIFIED',
  },
  {
    flag: 'CH',
    localeFile: 'zh-CN',
    localeItemId: 'LANG_CHINESE_TRADITIONAL',
  },
];

const Header = () => {
  const intl = useIntl();
  const [currLang, setCurrLang] = useState(LANG_LIST[0].flag);
  const [isUcPage, setIsUcPage] = useState(false);

  //设置语言
  const setLang = (index: number) => {
    setCurrLang(LANG_LIST[index].flag);
    setLocale(LANG_LIST[index].localeFile, true);
  };

  return (
    <Layout.Header className={styles['header']}>
      <div className={styles['hd-wrapper']}>
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
            <Link to="/news">{intl.formatMessage({ id: 'ANNOUNCEMENT' })}</Link>
            <Link to="">{intl.formatMessage({ id: 'NFTS_HUB' })}</Link>
            <Link to="">{intl.formatMessage({ id: 'STAKING' })}</Link>
          </nav>
        </div>
        <div className={styles['hd-r']}>
          {!isUcPage ? (
            <Link to="/helps" className={styles['btn-help']}></Link>
          ) : null}
          {!isUcPage ? (
            <div className={styles['op-msg']}>
              <span className={styles['msg-num']}>99+</span>
            </div>
          ) : null}
          <div className={`${styles['op-lang']} ${styles['has-dropdown']}`}>
            <span className={styles['lang-name']}>{currLang}</span>
            <div className={styles['dropdown']}>
              <ul>
                {LANG_LIST.map((item: any, index: number) => (
                  <li onClick={() => setLang(index)} key={index}>
                    {intl.formatMessage({ id: item.localeItemId })}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          {!isUcPage ? (
            <div className={styles['user-sign']}>
              {/* 未登录 */}
              <div className={styles['unsign']}>
                <Button
                  className={`${styles['btn-register']} ${styles['r-btn']}`}
                  ghost
                  href="/register"
                >
                  {intl.formatMessage({ id: 'REGISTER' })}
                </Button>
                <Button
                  className={`${styles['btn-signin']} ${styles['r-btn']}`}
                  type="primary"
                  href="/login"
                >
                  {intl.formatMessage({ id: 'SIGN_IN' })}
                </Button>
              </div>
              {/* 已登录 */}
              <div className={`${styles['signed']} ${styles['has-dropdown']}`}>
                <div className={styles['avatar']}>
                  <img src={require('@/assets/common/pic/avatar.png')} />
                </div>
                <span className={styles['username']}>
                  usernameusernameusername
                </span>
                <div className={styles['dropdown']}>
                  <ul>
                    <li>
                      <Link to="">
                        {intl.formatMessage({ id: 'COMMON_MENU_MAIN' })}
                      </Link>
                    </li>
                    <li>
                      <Link to="">
                        {intl.formatMessage({ id: 'COMMON_MENU_SETTINGS' })}
                      </Link>
                    </li>
                    <li>
                      {intl.formatMessage({ id: 'COMMON_MENU_SIGN_OUT' })}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          ) : (
            <div className={styles['uc-op']}>
              {/* 个人中心头部 */}
              <Button
                className={`${styles['btn-invite']} ${styles['r-btn']}`}
                ghost
              >
                {intl.formatMessage({ id: 'COMMON_BUTTON_INVITE_USER' })}
              </Button>
              <Button
                className={`${styles['btn-connect']} ${styles['r-btn']}`}
                type="primary"
              >
                {intl.formatMessage({ id: 'COMMON_BUTTON_CONNECT_WALLET' })}
              </Button>
            </div>
          )}
        </div>
      </div>
    </Layout.Header>
  );
};

export default Header;
