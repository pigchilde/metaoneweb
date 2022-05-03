import React from 'react';
import styles from './index.scss';
import { Empty } from 'antd';
// import noneImg from '../../assets/img/none.png';
const VideoPlayer = (props: any) => {
  const { title, desc, size } = props;
  return (
    <div
      className={`${styles['empty']} ${
        size === 'small' ? styles['small'] : ''
      }`}
    >
      <Empty description={title ? title : '暂无数据'} />
      <p className={styles['desc']}>{desc ? desc : ''}</p>
    </div>
  );
};

export default VideoPlayer;
