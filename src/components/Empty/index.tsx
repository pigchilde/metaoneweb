import React from 'react';
import styles from './index.scss';
import { Empty } from 'antd';
import { useIntl } from 'umi';
/**
 * @param props title  非必传|无数据文字标题 desc  非必传|无数据文字描述 size  非必传|大小 small
 * @returns
 */
const EmptySnippets = (props: any) => {
  const intl = useIntl();
  const { title, desc, size } = props;
  return (
    <div
      className={`${styles['empty']} ${
        size === 'small' ? styles['small'] : ''
      }`}
    >
      <Empty
        description={
          title
            ? title
            : intl.formatMessage({
                id: 'COMMON_NO_DATA',
              })
        }
      />
      <p className={styles['desc']}>{desc ? desc : ''}</p>
    </div>
  );
};

export default EmptySnippets;
