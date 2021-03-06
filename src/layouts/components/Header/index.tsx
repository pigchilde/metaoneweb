import styles from './index.scss';
import { Layout, Button, message } from 'antd';
import { Link, useIntl, setLocale, connect, history } from 'umi';
import { useEffect, useRef, useState } from 'react';
import Cookies from 'js-cookie';
import { LANG_LIST } from '@/utils/lang';
import MetaMask from '@/components/MetaMask';
import InvitionUser from '../InvitionUser';
import { initContract } from '@/utils/contract';

interface objectT {
  [propName: string]: any;
}

const Header = (props: objectT) => {
  const {
    pathname,
    login: { userInfo },
    common: { platformInfo, account },
    dispatch,
  } = props;
  const intl = useIntl();
  const defaultLang = LANG_LIST.filter(
    (lang: objectT) => lang.code === 'en-US',
  )[0].code;
  const [currLang, setCurrLang] = useState(defaultLang);
  const [isUcPage, setIsUcPage] = useState(false);

  useEffect(() => {
    if (location.href.indexOf('/personal/') > -1) {
      setIsUcPage(true);
    } else {
      setIsUcPage(false);
    }
  }, [pathname]);

  //设置语言
  const setLang = (index: number) => {
    setCurrLang(LANG_LIST[index].code);
    setLocale(LANG_LIST[index].code, true);
  };

  /**
   * 处理账号变更
   */
  const handleAccountsChanged = async (account?: string) => {
    const ethereum: any = window.ethereum;
    if (!ethereum) {
      return;
    }
    if (!account) {
      const accounts = await ethereum.request({ method: 'eth_accounts' });
      account = accounts[0];
    }
    let contract = null;
    if (account) {
      contract = initContract(account);
    }
    console.log(account, contract);
    dispatch({
      type: 'common/setData',
      payload: {
        account,
        contract,
      },
    });
  };

  useEffect(() => {
    // 监听账户变更
    const ethereum: any = window.ethereum;
    handleAccountsChanged();
    ethereum?.on('accountsChanged', (accounts: string[]) => {
      handleAccountsChanged(accounts[0]);
    });
    return () => {
      ethereum?.removeListener('accountsChanged', (accounts: string[]) => {
        handleAccountsChanged(accounts[0]);
      });
    };
  }, []);

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

  // 跳转到个人中心首页
  const go2UCPage = () => {
    history.push('/personal/info');
  };

  return (
    <Layout.Header className={styles['header']}>
      <div className={styles['hd-wrapper']}>
        <div className={styles['hd-l']}>
          <Link to="/" className={styles['logo']}>
            <img src={require('@/assets/common/img/logo.png')} />
            <h1>{platformInfo.siteName}</h1>
          </Link>
          {/* <i className={styles['btn-menu']}></i> */}
          <nav className={styles['nav']}>
            <Link
              to="/guilds"
              className={pathname.indexOf('/guilds') > -1 ? styles['on'] : ''}
            >
              {intl.formatMessage({ id: 'GUILDS' })}
            </Link>
            <Link
              to="/gamers"
              className={pathname.indexOf('/gamers') > -1 ? styles['on'] : ''}
            >
              {intl.formatMessage({ id: 'GAMERS' })}
            </Link>
            <Link
              to="/nftsowner"
              className={
                pathname.indexOf('/nftsowner') > -1 ? styles['on'] : ''
              }
            >
              {intl.formatMessage({ id: 'NFTS_OWNER' })}
            </Link>
            <Link
              to="/gamefi"
              className={pathname.indexOf('/gamefi') > -1 ? styles['on'] : ''}
            >
              {intl.formatMessage({ id: 'GameFi' })}
            </Link>
            <Link
              to="/news"
              className={pathname.indexOf('/news') > -1 ? styles['on'] : ''}
            >
              {intl.formatMessage({ id: 'ANNOUNCEMENT' })}
            </Link>
            <Link
              to="/nfts"
              className={
                pathname.indexOf('/nfts') > -1 &&
                pathname.indexOf('/nftsowner') === -1
                  ? styles['on']
                  : ''
              }
            >
              {intl.formatMessage({ id: 'NFTS_HUB' })}
            </Link>
            <a
              href="/staking"
              className={pathname.indexOf('/staking') > -1 ? styles['on'] : ''}
            >
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
              {currLang.split('-')[0].toUpperCase()}
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
                  <div className={styles['avatar']} onClick={go2UCPage}>
                    <img
                      src={
                        userInfo.avatar ||
                        require('@/assets/common/pic/avatar.png')
                      }
                    />
                  </div>
                  <span className={styles['username']} onClick={go2UCPage}>
                    {userInfo.nickName}
                  </span>
                  <div className={styles['dropdown']}>
                    <ul>
                      <li>
                        <Link to="/personal/setting">
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
              <InvitionUser />
              {/* <Button
                className={`${styles['btn-connect']} ${styles['r-btn']}`}
                type="primary"
              >
                {intl.formatMessage({ id: 'COMMON_BUTTON_CONNECT_WALLET' })}
              </Button>  */}
              <MetaMask />
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
