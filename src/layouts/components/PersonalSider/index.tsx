import styles from './index.scss';
import defaultAvatar from '../../../assets/personal/pic/avatar.jpg';
import { Layout, Menu } from 'antd';
import { history } from 'umi';
interface objectT {
  [propName: string]: any;
}

const personalSideer = (props: objectT) => {
  const { onCollapse, collapsed } = props;
  const onMenuSelect = (i: objectT) => {
    const { key } = i;
    if (key === '1') {
      history.push('/personal/guild');
    }
    if (key === '2') {
      history.push('/personal/gameInfo');
    }
    if (key === '5') {
      history.push('/personal/setting');
    }
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
        <img src={defaultAvatar} alt="" className={styles['avater']} />
        <p className={styles['name']}>
          <span>sdfsdfsdfffffffdsdkjfhskjh健康的护肤更快速的减肥fff</span>
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
      >
        Sign Out
      </span>
    </div>
  );
};
export default personalSideer;
