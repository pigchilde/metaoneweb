import React from 'react';
import styles from './index.scss';
import { Spin } from 'antd';
const Loading = (props: any) => {
  return (
    <div className={styles['loading']}>
      <Spin />
    </div>
  );
};

export default Loading;
