import styles from './index.less';
import { Menu, Dropdown, message, Space } from 'antd';
import tmp1 from '../../assets/gamefi/img/d-1.png';
import Filters from './components/Filters';
import { RightOutlined } from '@ant-design/icons';

const GameFi = () => {
  return (
    <div>
      <header className={styles['heed-seletor']}>
        <div className={styles['wrapper']}>
          <h1>GAMES</h1>
        </div>
      </header>
      <section className={styles['banner']}>
        <div className={styles['flex']}>
          <aside className={styles['img-box']}>
            <div className={styles['img']}>
              <img src={tmp1} />
            </div>
          </aside>
          <aside className={styles['intro-box']}>
            <div className={styles['title']}>AGE OF T.A.N.K.S</div>
            <div className={styles['line']}>
              <label>developer/publisher</label>
              <div className={styles['handle']}>
                <span>
                  <i className={`${styles['ico']} ${styles['ico-heart']} `}></i>
                  1760
                </span>
                <span>
                  <i className={`${styles['ico']} ${styles['ico-star']} `}></i>
                  935
                </span>
              </div>
            </div>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis
              ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas
              accumsan lacus vel facilisis.
            </p>
            <div className={styles['btn']}>
              VIEW MORE
              <RightOutlined />
            </div>
          </aside>
        </div>
        <div className={styles['img-list']}>
          <ul>
            <li className={`${styles['img']} ${styles['on']} `}>
              <img src={tmp1} />
            </li>
            <li className={styles['img']}>
              <img src={tmp1} />
            </li>
            <li className={styles['img']}>
              <img src={tmp1} />
            </li>
            <li className={styles['img']}>
              <img src={tmp1} />
            </li>
            <li className={styles['img']}>
              <img src={tmp1} />
            </li>
            <li className={styles['img']}>
              <img src={tmp1} />
            </li>
            <li className={styles['img']}>
              <img src={tmp1} />
            </li>
            <li className={styles['img']}>
              <img src={tmp1} />
            </li>
            <li className={styles['img']}>
              <img src={tmp1} />
            </li>
            <li className={styles['img']}>
              <img src={tmp1} />
            </li>
            <li className={styles['img']}>
              <img src={tmp1} />
            </li>
            <li className={styles['img']}>
              <img src={tmp1} />
            </li>
            <li className={styles['img']}>
              <img src={tmp1} />
            </li>
          </ul>
        </div>
      </section>

      <Filters />
    </div>
  );
};

export default GameFi;
