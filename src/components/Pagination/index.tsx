import styles from './index.scss';
import { Pagination } from 'antd';
const PaginationItem = () => {
  const onShowSizeChange = () => {};
  return (
    <Pagination
      showQuickJumper
      onShowSizeChange={onShowSizeChange}
      defaultCurrent={3}
      total={500}
      className={styles['page-box']}
    />
  );
};
export default PaginationItem;
