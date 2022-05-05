import styles from './index.scss';
import PaginationItem from '@/components/Pagination';
import { useIntl } from 'umi';
import { useEffect, useState } from 'react';
import Loading from '@/components/Loading';
import Empty from '@/components/Empty';
import { connect } from 'dva';
import { history } from 'umi';

interface objectT {
  [propName: string]: any;
}
const Filist = (props: objectT) => {
  const { location = {}, dispatch, gamefi = {} } = props;
  const intl = useIntl();
  const GAMEFI_LIST_TAB1 = intl.formatMessage({
    id: 'GAMEFI_LIST_TAB1',
  });
  const GAMEFI_LIST_TAB2 = intl.formatMessage({
    id: 'GAMEFI_LIST_TAB2',
  });
  const GAMEFI_LIST_TAB3 = intl.formatMessage({
    id: 'GAMEFI_LIST_TAB3',
  });
  const GAMEFI_LIST_TAB4 = intl.formatMessage({
    id: 'GAMEFI_LIST_TAB4',
  });
  const GAMEFI_LIST_TAB5 = intl.formatMessage({
    id: 'GAMEFI_LIST_TAB5',
  });
  const GAMEFI_LIST_TAB6 = intl.formatMessage({
    id: 'GAMEFI_LIST_TAB6',
  });

  const [listDatas, setListDatas] = useState({} as objectT);
  const [loading, setLoading] = useState(true as boolean);
  useEffect(() => {
    setLoading(true);
    dispatch({
      type: 'gamefi/getList',
    }).then((res: objectT) => {
      const { code, data } = res;
      if (code === 0) {
        setListDatas({ data });
        setLoading(false);
      }
    });
  }, []);
  const onPageChange = (e: number) => {};
  const toDetailPage = (id: string) => {
    history.push(`/gamefi/${id}`);
  };
  const list = listDatas.data?.map((item: objectT) => {
    return (
      <li
        className={styles.row}
        key={item.id}
        onClick={() => toDetailPage(item.id)}
      >
        <div className={styles.col1}>
          <div className={styles.person}>
            <img className={styles.img} src={item.img} />
            <div className={styles.text}>
              <h6>{item.name}</h6>
              <p>size:500 from:Area Gametype:RPG、ACT、AVG</p>
            </div>
          </div>
        </div>
        <div className={styles.col2}>0.3726</div>
        <div className={styles.col2}>0.3726</div>
        <div className={styles.col2}>0.3726</div>
        <div className={styles.col2}>6500</div>
        <div className={styles.col2}>0.3726</div>
      </li>
    );
  });
  const listHead = (
    <header className={`${styles.row} ${styles.rowH}`}>
      <div className={styles.col1}>{GAMEFI_LIST_TAB1}</div>
      <div className={styles.col2}>{GAMEFI_LIST_TAB2}</div>
      <div className={styles.col2}>{GAMEFI_LIST_TAB3}</div>
      <div className={styles.col2}>{GAMEFI_LIST_TAB4}</div>
      <div className={styles.col2}>{GAMEFI_LIST_TAB5}</div>
      <div className={styles.col2}>{GAMEFI_LIST_TAB6}</div>
    </header>
  );
  return (
    <div className={`wrapper ${styles['list-wrapper']}`}>
      {loading ? (
        <Loading />
      ) : listDatas.data?.length > 0 ? (
        <div className={styles['list']}>
          {listHead}
          <ul>{list}</ul>
          <PaginationItem
            datas={{
              total: listDatas.count ? listDatas.count : 1,
            }}
            onPageChange={onPageChange}
          />
        </div>
      ) : (
        <Empty />
      )}
    </div>
  );
};

export default connect(({ gamefi }: { gamefi: objectT }) => ({
  gamefi,
}))(Filist);
