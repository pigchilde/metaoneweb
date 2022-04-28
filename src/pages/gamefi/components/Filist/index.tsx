import styles from './index.scss';
import PaginationItem from '@/components/Pagination';
const Filist = () => {
  return (
    <div className={`wrapper`}>
      <div className={styles['list-wrapper']}>
        <header className={styles.row}>
          <div className={styles.col1}>GAMELIST</div>
          <div className={styles.col2}>CATEGORY</div>
          <div className={styles.col2}>GAME RELEASE</div>
          <div className={styles.col2}>GAME RELEASE</div>
          <div className={styles.col2}>GAME RELEASE</div>
          <div className={styles.col2}>GAME RELEASE</div>
        </header>
        <ul>
          <li className={styles.row}>
            <div className={styles.col1}>GAMELIST</div>
            <div className={styles.col2}>0.3726</div>
            <div className={styles.col2}>0.3726</div>
            <div className={styles.col2}>0.3726</div>
            <div className={styles.col2}>6500</div>
            <div className={styles.col2}>0.3726</div>
          </li>
        </ul>
      </div>
      <div className={styles['pagination-item']}>
        <PaginationItem />
      </div>
    </div>
  );
};
export default Filist;
