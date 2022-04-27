import styles from './index.less';
import { Pagination } from 'antd';
const Filist = () => {
  return (
    <div className={`${styles['wrapper']}`}>
      <div className={styles['list-wrapper']}></div>
      <Pagination defaultCurrent={1} total={50} />
    </div>
  );
};
export default Filist;
