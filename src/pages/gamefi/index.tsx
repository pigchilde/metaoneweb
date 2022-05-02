import styles from './index.scss';
import icos from './icon.scss';
import { Menu, Dropdown, Button, Space } from 'antd';
import tmp1 from '../../assets/gamefi/img/d-1.png';
import Filters from './components/Filters';
import Filist from './components/Filist';
import { RightOutlined, CaretDownOutlined } from '@ant-design/icons';
import { history } from 'umi';

const GameFi = () => {
  const dropitems = [
    {
      label: <div>Hot collections</div>,
      key: '0',
    },
    {
      label: <div>Hot collections2</div>,
      key: '1',
    },
  ];
  const toDetail = () => {
    history.push('/gamefi/1');
  };
  const menu = <Menu items={dropitems} />;
  return (
    <div className={styles['GameFi-wrapper']}>
      <header className={styles['head-seletor']}>
        <div className={styles['wrapper']}>
          <h1>GAMES</h1>
          <Dropdown overlay={menu}>
            <a onClick={(e) => e.preventDefault()}>
              <Space>
                Hot collections
                <CaretDownOutlined />
              </Space>
            </a>
          </Dropdown>
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
            <div className={styles['title']}>
              AGE OF T.A.N.K.SAGE OF T.A.N.K.SAGE OF T.A.N.K.S
            </div>
            <div className={styles['line']}>
              <label>developer/publisher</label>
              <div className={styles['handle']}>
                <span>
                  <i className={`${icos['ico']} ${icos['ico-heart']} `}></i>
                  1760
                </span>
                <span>
                  <i className={`${icos['ico']} ${icos['ico-star']} `}></i>
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
            <Button type="primary" onClick={toDetail}>
              VIEW MORE
              <RightOutlined />
            </Button>
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
      <Filist />
    </div>
  );
};

export default GameFi;
