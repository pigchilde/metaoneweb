import tmp1 from '@/assets/gamefi/img/d-1.png';
import styles from './index.scss';

const BannerDetail = () => {
  return (
    <div className={`${styles.banner} wrapper`}>
      <aside className={styles['img-left']}>
        <div className={styles['img']}>
          <img src={tmp1} />
        </div>
        <div className={styles['img-list']}>
          <ul>
            <li className={styles.img}>
              <img src={tmp1} />
            </li>
            <li className={styles.img}>
              <img src={tmp1} />
            </li>
            <li className={styles.img}>
              <img src={tmp1} />
            </li>
            <li className={styles.img}>
              <img src={tmp1} />
            </li>
            <li className={styles.img}>
              <img src={tmp1} />
            </li>
          </ul>
        </div>
      </aside>
      <aside className={styles['intro-box']}></aside>
    </div>
  );
};
export default BannerDetail;
