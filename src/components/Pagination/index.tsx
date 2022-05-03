import styles from './index.scss';
import { Pagination } from 'antd';

interface objectT {
  [propName: string]: any;
}
const PaginationItem = (props: objectT) => {
  const { datas = {}, onPageChange } = props;
  const { total, current, pageSize } = datas;
  return (
    <Pagination
      showQuickJumper
      onChange={onPageChange}
      current={current}
      pageSize={pageSize}
      total={total}
      className={styles['page-box']}
    />
  );
};
export default PaginationItem;
