import styles from './index.scss';
import { Pagination } from 'antd';

interface objectT {
  [propName: string]: any;
}
/**
 * @param props datas  分页需要数据 total｜必传, current｜必传, pageSize｜必传 都为number类型，  onPageChange 分页切换时调用的函数
 * @returns
 */
const PaginationItem = (props: objectT) => {
  const { datas = {}, onPageChange } = props;
  const { total, current, pageSize = 10 } = datas;
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
