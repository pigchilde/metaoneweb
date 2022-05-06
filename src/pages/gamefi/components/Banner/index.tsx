import styles from './index.scss';
import icos from '../../icon.scss';
import tmp1 from '@/assets/gamefi/img/d-1.png';
import { Button, Carousel } from 'antd';
import { RightOutlined } from '@ant-design/icons';
import { history, useIntl } from 'umi';
import { useRef, useState } from 'react';
import { connect } from 'dva';

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
  const [isLike, setIsLike] = useState<boolean>(false);
  const [isStar, setIsStar] = useState<boolean>(false);
  const [likeCount, setLinkCount] = useState<number>(datas.likeCount);
  const [starCount, setStarCount] = useState<number>(datas.starCount);
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
  const changeStar = () => {
    //收藏
    let num = 0;
    let data = {
      gameId: datas.id,
      userId: '22222',
      likeStatus: '',
    };
    if (isStar) {
      num = starCount - 1;
      num = num < 0 ? 0 : num;
      data.likeStatus = 'UNLIKE';
    } else {
      data.likeStatus = 'LIKE';
      num = starCount + 1;
    }
    dispatch({
      type: 'gamefi/gameStart',
      payload: {
        data,
      },
    }).then((res: objectT) => {
      console.log('gameStar', res);
      setStarCount(num);
      setIsStar(!isStar);
    });
  };
  const changeLike = () => {
    //点赞
    let num = 0;
    let data = {
      gameId: datas.id,
      userId: '22222',
      likeStatus: '',
    };
    if (isLike) {
      num = likeCount - 1;
      num = num < 0 ? 0 : num;
      data.likeStatus = 'UNLIKE';
    } else {
      num = likeCount + 1;
      data.likeStatus = 'LIKE';
    }
    dispatch({
      type: 'gamefi/gameLike',
      payload: {
        data,
      },
    }).then((res: objectT) => {
      console.log('gameLike', res);
      setLinkCount(num);
      setIsLike(!isLike);
    });
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
            <div className={styles['handle']}>
              <span>
                <i
                  onClick={changeStar}
                  className={`${icos['ico']} ${
                    isStar ? icos['ico-heart-on'] : icos['ico-heart']
                  } `}
                ></i>
                {starCount}
              </span>
              <span>
                <i
                  onClick={changeLike}
                  className={`${icos['ico']} ${
                    isLike ? icos['ico-star-on'] : icos['ico-star']
                  } `}
                ></i>
                {likeCount}
              </span>
            </div>
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
