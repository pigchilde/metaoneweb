import tmp1 from '@/assets/gamefi/img/d-1.png';
import styles from './index.scss';
import icos from '../../icon.scss';
import { Button } from 'antd';

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
      <aside className={styles['intro-box']}>
        <header className={styles.introhead}>
          <label className={`${icos.ico} ${icos['ico-detaillabel']}`}></label>
          <div className={styles.handles}>
            <label className={styles.item}>
              <i className={`${icos.ico} ${icos['ico-heart']}`}></i>
              <span>1760</span>
            </label>
            <label className={styles.item}>
              <i className={`${icos.ico} ${icos['ico-star']}`}></i>
              <span>936</span>
            </label>
          </div>
        </header>
        <section className={styles.lines}>
          <div className={styles.line}>
            <label className={styles.linelabel}>Developer</label>
            <span className={styles.linetext}>Own development team</span>
          </div>
          <div className={styles.line}>
            <label className={styles.linelabel}>Language</label>
            <span className={styles.linetext}>English</span>
          </div>
          <div className={styles.line}>
            <label className={styles.linelabel}>Platform</label>
            <span className={styles.linetext}>Platform</span>
          </div>
        </section>
        <section className={styles.lines}>
          <div className={styles.line}>
            <label className={styles.linelabel}>IGO Price</label>
            <span className={styles.linetext}>$0.1</span>
          </div>
          <div className={styles.line}>
            <label className={styles.linelabel}>IGO ROI</label>
            <span className={styles.linetext}>1.29x</span>
          </div>
          <div className={styles.line}>
            <label className={styles.linelabel}>Volume(24H)</label>
            <span className={styles.linetext}>$129,802,34</span>
          </div>
          <div className={styles.line}>
            <label className={styles.linelabel}>Fully Diluted Market Cap</label>
            <span className={styles.linetext}>$12,869,307,51</span>
          </div>
          <div className={styles.line}>
            <label className={styles.linelabel}>Game Release Status</label>
            <span className={styles.linetext}>Upcoming</span>
          </div>
        </section>
        <section className={styles.btns}>
          <Button type="primary">Filters</Button>
          <Button>Filters</Button>
        </section>
      </aside>
    </div>
  );
};
export default BannerDetail;
