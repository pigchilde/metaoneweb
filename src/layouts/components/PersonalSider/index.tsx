import styles from './index.scss';
import defaultAvatar from '../../../assets/common/pic/avatar.png';
import { Layout, Menu, message } from 'antd';
import { history, connect } from 'umi';
import Cookies from 'js-cookie';
interface objectT {
  [propName: string]: any;
}

const personalSideer = (props: objectT) => {
  const {
    onCollapse,
    collapsed,
    dispatch,
    login: { userInfo },
    common: { platformInfo },
  } = props;

  const onMenuSelect = (i: objectT) => {
    const { key } = i;
    if (key === '1') {
      history.push('/personal/guild');
    }
    if (key === '2') {
      history.push('/personal/gameInfo');
    }
    if (key === '4') {
      history.push('/personal/nftAssets');
    }
    if (key === '5') {
      history.push('/personal/setting');
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
  return (
    <div className={styles['sider']}>
      <span
        className={styles['trigger']}
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
      </div>
      <Menu
        mode="inline"
        defaultSelectedKeys={['1']}
        className={styles['menu']}
        onSelect={onMenuSelect}
        items={[
          {
            key: '1',
            icon: (
              <span className={`${styles['ico1']} ${styles['ico']}`}></span>
            ),
            label: 'Guild Information',
          },
          {
            key: '2',
            icon: (
              <span className={`${styles['ico2']} ${styles['ico']}`}></span>
            ),
            label: 'List Of Games',
          },
          {
            key: '3',
            icon: (
              <span className={`${styles['ico3']} ${styles['ico']}`}></span>
            ),
            label: 'Guild Management',
          },
          {
            key: '4',
            icon: (
              <span className={`${styles['ico4']} ${styles['ico']}`}></span>
            ),
            label: 'NFT Assets',
          },
          {
            key: '5',
            icon: (
              <span className={`${styles['ico5']} ${styles['ico']}`}></span>
            ),
            label: 'Settings',
          },
        ]}
      />
      <span
        className={`${styles['sign-out']} ${
          collapsed ? styles['sign-close'] : ''
        }`}
        onClick={handleLogout}
      >
        Sign Out
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
