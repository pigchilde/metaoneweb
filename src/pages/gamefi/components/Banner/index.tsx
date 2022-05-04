import styles from './index.scss';
import icos from '../../icon.scss';
import tmp1 from '@/assets/gamefi/img/d-1.png';
import { Button, Carousel } from 'antd';
import { RightOutlined } from '@ant-design/icons';
import { history } from 'umi';
import { useRef, useState } from 'react';
import { useIntl } from 'umi';
interface objectT {
  [propName: string]: any;
}
const Banner = () => {
  const toDetail = () => {
    history.push('/gamefi/1');
  };
  const intl = useIntl();
  const btnText = intl.formatMessage({
    id: 'GAMEFI_BANNER_BTN',
  });
  const authText = intl.formatMessage({
    id: 'GAMEFI_BANNER_AUTH',
  });
  const [count, setCount] = useState(0);
  const carouselEl = useRef({} as objectT);

  const imgList = [
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
  const carouselPage = (index: any) => {
    carouselEl.current.goTo(index);
    setCount(index);
  };
  return (
    <section className={styles['banner']}>
      <div className={styles['flex']}>
        <aside className={styles['img-left']}>
          <Carousel dots={false} ref={carouselEl}>
            {imgList.map((item, index) => {
              return (
                <div className={styles['img']} key={item.id}>
                  <img src={tmp1} />
                </div>
              );
            })}
          </Carousel>
        </aside>
        <aside className={styles['intro-box']}>
          <div className={styles['title']}>
            AGE OF T.A.N.K.SAGE OF T.A.N.K.SAGE OF T.A.N.K.S
          </div>
          <div className={styles['line']}>
            <label>{authText}</label>
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
            {btnText}
            <RightOutlined />
          </Button>
        </aside>
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
    </section>
  );
};
export default Banner;
