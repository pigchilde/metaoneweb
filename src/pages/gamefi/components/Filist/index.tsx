import styles from './index.scss';
import PaginationItem from '@/components/Pagination';
import tmp1 from '@/assets/gamefi/img/tmp1.png';

const Filist = () => {
  return (
    <div className={`wrapper`}>
      <div className={styles['list-wrapper']}>
        <header className={`${styles.row} ${styles.rowH}`}>
          <div className={styles.col1}>GAMELIST</div>
          <div className={styles.col2}>CATEGORY</div>
          <div className={styles.col2}>GAME RELEASE</div>
          <div className={styles.col2}>GAME RELEASE</div>
          <div className={styles.col2}>GAME RELEASE</div>
          <div className={styles.col2}>GAME RELEASE</div>
        </header>
        <ul>
          <li className={styles.row}>
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
        </ul>
      </div>
      <div className={styles['pagination-item']}>
        <PaginationItem />
      </div>
    </div>
  );
};
export default Filist;
