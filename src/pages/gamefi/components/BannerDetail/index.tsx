import tmp1 from '@/assets/gamefi/img/d-1.png';
import styles from './index.scss';
import icos from '../../icon.scss';
import { Button, Carousel } from 'antd';
import { useRef, useState } from 'react';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { useIntl } from 'umi';
const BannerDetail = () => {
  const imgList = [
    { id: 0 },
    { id: 1 },
    { id: 2 },
    { id: 3 },
    { id: 4 },
    { id: 5 },
  ];
  const intl = useIntl();
  const GAMEFI_DETAIL_BANNER_BTN1 = intl.formatMessage({
    id: 'GAMEFI_DETAIL_BANNER_BTN1',
  });
  const GAMEFI_DETAIL_BANNER_BTN2 = intl.formatMessage({
    id: 'GAMEFI_DETAIL_BANNER_BTN2',
  });
  const GAMEFI_DETAIL_BANNER_Developer = intl.formatMessage({
    id: 'GAMEFI_DETAIL_BANNER_Developer',
  });
  const GAMEFI_DETAIL_BANNER_Language = intl.formatMessage({
    id: 'GAMEFI_DETAIL_BANNER_Language',
  });
  const GAMEFI_DETAIL_BANNER_Platform = intl.formatMessage({
    id: 'GAMEFI_DETAIL_BANNER_Platform',
  });
  const GAMEFI_DETAIL_BANNER_Price = intl.formatMessage({
    id: 'GAMEFI_DETAIL_BANNER_Price',
  });
  const GAMEFI_DETAIL_BANNER_ROI = intl.formatMessage({
    id: 'GAMEFI_DETAIL_BANNER_ROI',
  });
  const GAMEFI_DETAIL_BANNER_Volume = intl.formatMessage({
    id: 'GAMEFI_DETAIL_BANNER_Volume',
  });
  const GAMEFI_DETAIL_BANNER_Fully = intl.formatMessage({
    id: 'GAMEFI_DETAIL_BANNER_Fully',
  });
  const GAMEFI_DETAIL_BANNER_Status = intl.formatMessage({
    id: 'GAMEFI_DETAIL_BANNER_Status',
  });
  const [count, setCount] = useState(0);
  const carouselEl = useRef(null);
  const carouselPre = () => {
    carouselEl.current.prev();
  };
  const carouselNext = () => {
    carouselEl.current.next();
  };
  const carouselPage = (index) => {
    carouselEl.current.goTo(index);
    setCount(index);
  };
  const carouselAfterChange = (e) => {
    setCount(e);
  };
  return (
    <div className={`wrapper ${styles.banner}`}>
      <aside className={styles['img-left']}>
        <div className={styles.imgwrap}>
          <Carousel
            dots={false}
            afterChange={carouselAfterChange}
            ref={carouselEl}
          >
            {imgList.map((item, index) => {
              return (
                <div className={styles['img']} key={item.id}>
                  <img src={tmp1} />
                </div>
              );
            })}
          </Carousel>
        </div>

        <div className={styles['img-list']}>
          <ul>
            {imgList.map((item, index) => {
              return (
                <li
                  className={`${styles.img} ${index == count ? styles.on : ''}`}
                  onClick={() => carouselPage(index)}
                  key={item.id}
                >
                  <img src={tmp1} />
                </li>
              );
            })}
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
            <label className={styles.linelabel}>
              {GAMEFI_DETAIL_BANNER_Developer}
            </label>
            <span className={styles.linetext}>Own development team</span>
          </div>
          <div className={styles.line}>
            <label className={styles.linelabel}>
              {GAMEFI_DETAIL_BANNER_Language}
            </label>
            <span className={styles.linetext}>English</span>
          </div>
          <div className={styles.line}>
            <label className={styles.linelabel}>
              {GAMEFI_DETAIL_BANNER_Platform}
            </label>
            <span className={styles.linetext}>Platform</span>
          </div>
        </section>
        <section className={styles.lines}>
          <div className={styles.line}>
            <label className={styles.linelabel}>
              {GAMEFI_DETAIL_BANNER_Price}
            </label>
            <span className={styles.linetext}>$0.1</span>
          </div>
          <div className={styles.line}>
            <label className={styles.linelabel}>
              {GAMEFI_DETAIL_BANNER_ROI}
            </label>
            <span className={styles.linetext}>1.29x</span>
          </div>
          <div className={styles.line}>
            <label className={styles.linelabel}>
              {GAMEFI_DETAIL_BANNER_Volume}
            </label>
            <span className={styles.linetext}>$129,802,34</span>
          </div>
          <div className={styles.line}>
            <label className={styles.linelabel}>
              {GAMEFI_DETAIL_BANNER_Fully}
            </label>
            <span className={styles.linetext}>$12,869,307,51</span>
          </div>
          <div className={styles.line}>
            <label className={styles.linelabel}>
              {GAMEFI_DETAIL_BANNER_Status}
            </label>
            <span className={styles.linetext}>Upcoming</span>
          </div>
        </section>
        <section className={styles.btns}>
          <Button type="primary">{GAMEFI_DETAIL_BANNER_BTN1}</Button>
          <Button>{GAMEFI_DETAIL_BANNER_BTN2}</Button>
        </section>
      </aside>
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
  );
};
export default BannerDetail;
