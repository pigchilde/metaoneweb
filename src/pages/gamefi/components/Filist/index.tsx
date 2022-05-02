import styles from './index.scss';
import PaginationItem from '@/components/Pagination';
import tmp1 from '@/assets/gamefi/img/tmp1.png';
import { useIntl } from 'umi';
const Filist = () => {
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
  const list = [
    { id: 0 },
    { id: 1 },
    { id: 2 },
    { id: 3 },
    { id: 4 },
    { id: 5 },
    { id: 6 },
    { id: 7 },
    { id: 8 },
    { id: 9 },
  ];
  return (
    <div className={`wrapper`}>
      <div className={styles['list-wrapper']}>
        <header className={`${styles.row} ${styles.rowH}`}>
          <div className={styles.col1}>{GAMEFI_LIST_TAB1}</div>
          <div className={styles.col2}>{GAMEFI_LIST_TAB2}</div>
          <div className={styles.col2}>{GAMEFI_LIST_TAB3}</div>
          <div className={styles.col2}>{GAMEFI_LIST_TAB4}</div>
          <div className={styles.col2}>{GAMEFI_LIST_TAB5}</div>
          <div className={styles.col2}>{GAMEFI_LIST_TAB6}</div>
        </header>
        <ul>
          {list.map((item, map) => {
            return (
              <li className={styles.row} key={item.id}>
                <div className={styles.col1}>
                  <div className={styles.person}>
                    <img className={styles.img} src={tmp1} />
                    <div className={styles.text}>
                      <h6>Guild name</h6>
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
          })}
        </ul>
      </div>
      <div className={styles['pagination-item']}>
        <PaginationItem />
      </div>
    </div>
  );
};
export default Filist;
