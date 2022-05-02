import styles from './index.scss';
import { Menu, Dropdown, Carousel, Button, Space } from 'antd';
import {
  CaretDownOutlined,
  LeftOutlined,
  RightOutlined,
} from '@ant-design/icons';
import { useRef } from 'react';
import Filters from './components/Filters';
import Filist from './components/Filist';
import Banner from './components/Banner';
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
  const bannerList = [{ id: 1 }, { id: 2 }, { id: 3 }];
  const carouselEl = useRef(null);
  const carouselPre = () => {
    carouselEl.current.prev();
  };
  const carouselNext = () => {
    carouselEl.current.next();
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
      <div className={styles['banner-wrapper']}>
        <Carousel dots={false} ref={carouselEl}>
          {bannerList.map((item, index) => {
            return <Banner key={item.id} />;
          })}
        </Carousel>
        <div className={styles.btnPre}>
          <Button
            type="primary"
            onClick={carouselPre}
            shape="circle"
            icon={<LeftOutlined />}
          />
        </div>
        <div className={styles.btnNext}>
          <Button
            type="primary"
            onClick={carouselNext}
            shape="circle"
            icon={<RightOutlined />}
          />
        </div>
      </div>
      <Filters />
      <Filist />
    </div>
  );
};

export default GameFi;
