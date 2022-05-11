import styles from './index.scss';
import icos from '../../icon.scss';
import tmp1 from '@/assets/gamefi/img/d-1.png';
import { Button, Carousel } from 'antd';
import { RightOutlined } from '@ant-design/icons';
import { history, useIntl } from 'umi';
import { useRef, useState, useEffect } from 'react';
import { connect } from 'dva';
import Star from '../Star';
interface objectT {
  [propName: string]: any;
}

const Banner = (props: objectT) => {
  const { datas = {}, dispatch } = props;
  const { name, description } = datas;
  const toDetail = () => {
    history.push(`/gamefi/${datas.id}`);
  };
  const intl = useIntl();
  const btnText = intl.formatMessage({
    id: 'GAMEFI_BANNER_BTN',
  });
  const authText = intl.formatMessage({
    id: 'GAMEFI_BANNER_AUTH',
  });
  const [count, setCount] = useState(0);
  // const [isLike, setIsLike] = useState<boolean>(false);
  // const [isStar, setIsStar] = useState<boolean>(false);
  // const [likeCount, setLinkCount] = useState<number>(datas.likeCount);
  // const [starCount, setStarCount] = useState<number>(datas.starCount);
  const [gameData, setGameData] = useState(datas);
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
  useEffect(() => {
    setGameData(datas);
  }, [datas]);

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
          <div className={styles['title']}>{name}</div>
          <div className={styles['line']}>
            <label>{authText}</label>
            <Star data={gameData} />
          </div>
          <p className={styles['description']}>{description}</p>
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

export default connect(({ gamefi }: { gamefi: objectT }) => ({
  gamefi,
}))(Banner);
