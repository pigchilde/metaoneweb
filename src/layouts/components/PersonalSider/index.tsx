import styles from './index.scss';
import defaultAvatar from '../../../assets/common/pic/avatar.png';
import { Layout, Menu, message } from 'antd';
import { history, connect } from 'umi';
import Cookies from 'js-cookie';
import { useIntl } from 'umi';
import { useEffect, useState } from 'react';

interface objectT {
  [propName: string]: any;
}

const personalSideer = (props: objectT) => {
  const intl = useIntl();
  const {
    onCollapse,
    collapsed,
    dispatch,
    login: { userInfo },
    common: { platformInfo },
    sideHeight,
  } = props;
  const [current, setCurrent] = useState('1' as string);

  const { roles = [] } = userInfo;
  const menuLink = [
    {
      key: '1',
      link: '/personal/info',
    },
    {
      key: '2',
      link: '/personal/gamelist',
    },
    {
      key: '3',
      link: '/personal/guild/management',
    },
    {
      key: '4',
      link: '/personal/nftAssets',
    },
    {
      key: '5',
      link: '/personal/setting',
    },
  ];
  const gameMenu = [
    {
      key: '1',
      icon: <span className={`${styles['ico1']} ${styles['ico']}`}></span>,
      label: intl.formatMessage({
        id: 'PSIDER_MY_INFO',
      }),
    },
    {
      key: '2',
      icon: <span className={`${styles['ico2']} ${styles['ico']}`}></span>,
      label: intl.formatMessage({
        id: 'PSIDER_MY_GAMELIST',
      }),
    },

    {
      key: '4',
      icon: <span className={`${styles['ico4']} ${styles['ico']}`}></span>,
      label: intl.formatMessage({
        id: 'PSIDER_NFT_ASSETS',
      }),
    },
    {
      key: '5',
      icon: <span className={`${styles['ico5']} ${styles['ico']}`}></span>,
      label: intl.formatMessage({
        id: 'PSIDER_SETTING',
      }),
    },
  ];
  const guidMenu = [
    {
      key: '1',
      icon: <span className={`${styles['ico1']} ${styles['ico']}`}></span>,
      label: intl.formatMessage({
        id: 'PSIDER_GUILD_INFO',
      }),
    },
    {
      key: '2',
      icon: <span className={`${styles['ico2']} ${styles['ico']}`}></span>,
      label: intl.formatMessage({
        id: 'PSIDER_LIST_GAMES',
      }),
    },
    {
      key: '3',
      icon: <span className={`${styles['ico3']} ${styles['ico']}`}></span>,
      label: intl.formatMessage({
        id: 'PSIDER_GUILD_MANAGEMENT',
      }),
    },
    {
      key: '4',
      icon: <span className={`${styles['ico4']} ${styles['ico']}`}></span>,
      label: intl.formatMessage({
        id: 'PSIDER_NFT_ASSETS',
      }),
    },
    {
      key: '5',
      icon: <span className={`${styles['ico5']} ${styles['ico']}`}></span>,
      label: intl.formatMessage({
        id: 'PSIDER_SETTING',
      }),
    },
  ];
  const ownerMenu = [
    {
      key: '1',
      icon: <span className={`${styles['ico1']} ${styles['ico']}`}></span>,
      label: intl.formatMessage({
        id: 'PSIDER_MY_INFO',
      }),
    },

    {
      key: '4',
      icon: <span className={`${styles['ico4']} ${styles['ico']}`}></span>,
      label: intl.formatMessage({
        id: 'PSIDER_NFT_ASSETS',
      }),
    },
    {
      key: '5',
      icon: <span className={`${styles['ico5']} ${styles['ico']}`}></span>,
      label: intl.formatMessage({
        id: 'PSIDER_SETTING',
      }),
    },
  ];

  const onMenuSelect = (i: objectT) => {
    const { key } = i;
    setCurrent(key);
    const data = menuLink.find((i: objectT) => i.key === key);
    if (data?.link) {
      history.push(data?.link);
    }
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
        Cookies.remove('token');
        window.location.href = '//' + window.location.host + '/login';
      } else {
        message.error(res.msg);
      }
    });
  };

  useEffect(() => {
    // setCurrent;
    const url = window.location.href;
    const data = menuLink.find((i: objectT) => url.indexOf(i.link) > -1);
    setCurrent(data ? data.key : '1');
    // const wh = window.height
  }, []);
  return (
    <div
      className={`${styles['sider']} ${sideHeight < 700 ? styles['sort'] : ''}`}
      style={{ height: sideHeight }}
    >
      <span
        className={`${styles['trigger']} ${collapsed ? styles['close'] : ''}`}
        onClick={() => onCollapse(!collapsed)}
      ></span>
      <div
        className={`${styles['user-box']} ${
          collapsed ? styles['user-close'] : ''
        }`}
      >
        <img
          src={userInfo.avatar ? userInfo.avatar : defaultAvatar}
          alt=""
          className={styles['avater']}
        />
        <p className={styles['name']}>
          <span> {userInfo.nickName}</span>
        </p>
        {collapsed ? (
          ''
        ) : (
          <p className={styles['role']}>
            {roles.length
              ? roles[0].code === 'GUILD'
                ? intl.formatMessage({
                    id: 'SIGN_TAB_GUILD',
                  })
                : roles.length && roles[0].code === 'GAMERS'
                ? intl.formatMessage({
                    id: 'SIGN_TAB_GAME',
                  })
                : intl.formatMessage({
                    id: 'SIGN_TAB_NFT',
                  })
              : ''}{' '}
          </p>
        )}
      </div>
      <Menu
        mode="inline"
        defaultSelectedKeys={['1']}
        className={styles['menu']}
        onSelect={onMenuSelect}
        selectedKeys={[current]}
        items={
          roles.length && roles[0].code === 'GUILD'
            ? guidMenu
            : roles.length && roles[0].code === 'GAMERS'
            ? gameMenu
            : ownerMenu
        }
      />
      <span
        className={`${styles['sign-out']} ${
          collapsed ? styles['sign-close'] : ''
        }`}
        onClick={handleLogout}
      >
        {collapsed ? '' : 'Sign Out'}
      </span>
    </div>
  );
};

export default connect(
  ({ login, common }: { login: objectT; common: objectT }) => ({
    login,
    common,
  }),
)(personalSideer);
