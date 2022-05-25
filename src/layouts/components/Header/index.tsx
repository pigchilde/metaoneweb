import styles from './index.scss';
import { Layout, Button, message } from 'antd';
import { Link, useIntl, setLocale, connect } from 'umi';
import { useRef, useState } from 'react';
import Cookies from 'js-cookie';
import { LANG_LIST } from '@/utils/lang';

interface objectT {
  [propName: string]: any;
}

const Header = (props: objectT) => {
  const {
    login: { userInfo },
    common: { platformInfo },
    dispatch,
  } = props;
  const intl = useIntl();
  const defaultLang = LANG_LIST.filter(
    (lang: objectT) => lang.code === 'en-US',
  )[0].code;
  const [currLang, setCurrLang] = useState(defaultLang);
  const [isUcPage, setIsUcPage] = useState(false);

  //设置语言
  const setLang = (index: number) => {
    setCurrLang(LANG_LIST[index].code);
    setLocale(LANG_LIST[index].code, true);
  };

  /**
   * 处理登出
   */
  const handleLogout = () => {
    dispatch({
      type: 'login/logout',
    }).then((res: objectT) => {
      if (!res.code) {
        // 登出成功
        message.success(res.msg);
        Cookies.remove('token');
      } else {
        message.error(res.msg);
      }
    });
  };

  return (
    <Layout.Header className={styles['header']}>
      <div className={styles['hd-wrapper']}>
        <div className={styles['hd-l']}>
          <Link to="/" className={styles['logo']}>
            <img src={platformInfo.siteIcon} />
            <h1>{platformInfo.siteName}</h1>
          </Link>
          {/* <i className={styles['btn-menu']}></i> */}
          <nav className={styles['nav']}>
            <Link to="/guilds">{intl.formatMessage({ id: 'GUILDS' })}</Link>
            <Link to="/gamers">{intl.formatMessage({ id: 'GAMERS' })}</Link>
            <Link to="">{intl.formatMessage({ id: 'NFTS_OWNER' })}</Link>
            <Link to="/gamefi">{intl.formatMessage({ id: 'GameFi' })}</Link>
            <Link to="/news">{intl.formatMessage({ id: 'ANNOUNCEMENT' })}</Link>
            <a href="https://metaone.gg/market" target="_blank">
              {intl.formatMessage({ id: 'NFTS_HUB' })}
            </a>
            <a href="https://metaone.gg/staking" target="_blank">
              {intl.formatMessage({ id: 'STAKING' })}
            </a>
          </nav>
        </div>
        <div className={styles['hd-r']}>
          {!isUcPage ? (
            <Link to="/helps" className={styles['btn-help']}></Link>
          ) : null}
          {/* {!isUcPage ? (
            <div className={styles['op-msg']}>
              <span className={styles['msg-num']}>99+</span>
            </div>
          ) : null} */}
          <div className={`${styles['op-lang']} ${styles['has-dropdown']}`}>
            <span className={styles['lang-name']}>
              {currLang.split('-')[1]}
            </span>
            <div className={styles['dropdown']}>
              <ul>
                {LANG_LIST.map((lang: any, index: number) => (
                  <li onClick={() => setLang(index)} key={index}>
                    {intl.formatMessage({
                      id: `LANG_${lang.code
                        .split('-')
                        .join('_')
                        .toUpperCase()}`,
                    })}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          {!isUcPage ? (
            <div className={styles['user-sign']}>
              {!userInfo.uid ? ( // 未登录
                <div className={styles['unsign']}>
                  <Link to="/register">
                    <Button
                      className={`${styles['btn-register']} ${styles['r-btn']}`}
                      ghost
                    >
                      {intl.formatMessage({ id: 'REGISTER' })}
                    </Button>
                  </Link>
                  <Link to="/login">
                    <Button
                      className={`${styles['btn-signin']} ${styles['r-btn']}`}
                      type="primary"
                    >
                      {intl.formatMessage({ id: 'SIGN_IN' })}
                    </Button>
                  </Link>
                </div>
              ) : (
                // 已登录
                <div
                  className={`${styles['signed']} ${styles['has-dropdown']}`}
                >
                  <div className={styles['avatar']}>
                    <img src={require('@/assets/common/pic/avatar.png')} />
                  </div>
                  <span className={styles['username']}>
                    {userInfo.nickName}
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
                      <li onClick={handleLogout}>
                        {intl.formatMessage({ id: 'COMMON_MENU_SIGN_OUT' })}
                      </li>
                    </ul>
                  </div>
                </div>
              )}
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

export default connect(
  ({ login, common }: { login: objectT; common: objectT }) => ({
    login,
    common,
  }),
)(Header);
