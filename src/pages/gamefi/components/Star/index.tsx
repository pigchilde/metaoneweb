import icos from '../../icon.scss';
import styles from './index.scss';
import { connect } from 'dva';
import { useState, useEffect } from 'react';

interface objectT {
  [propName: string]: any;
}
const Stars = (props: objectT) => {
  const { data = {}, dispatch } = props;
  const [gameData, setGameData] = useState<objectT>(data);
  const [isLike, setIsLike] = useState<boolean>(false);
  const [isStar, setIsStar] = useState<boolean>(false);
  const [likeCount, setLinkCount] = useState<number>(data.likeCount);
  const [starCount, setStarCount] = useState<number>(data.starCount);

  useEffect(() => {
    setGameData(data);
    setLinkCount(data.likeCount);
    setStarCount(data.starCount);
  }, [data]);
  const changeStar = () => {
    //收藏
    let num = 0;
    let postData = {
      gameId: gameData.id,
      userId: '22222',
      likeStatus: '',
    };
    if (isStar) {
      num = starCount - 1;
      num = num < 0 ? 0 : num;
      postData.likeStatus = 'UNLIKE';
    } else {
      postData.likeStatus = 'LIKE';
      num = starCount + 1;
    }
    dispatch({
      type: 'gamefi/gameStart',
      payload: {
        data: postData,
      },
    }).then((res: objectT) => {
      setStarCount(num);
      setIsStar(!isStar);
    });
  };
  const changeLike = () => {
    //点赞
    let num = 0;
    let postData = {
      gameId: gameData.id,
      userId: '22222',
      likeStatus: '',
    };
    if (isLike) {
      num = likeCount - 1;
      num = num < 0 ? 0 : num;
      postData.likeStatus = 'UNLIKE';
    } else {
      num = likeCount + 1;
      postData.likeStatus = 'LIKE';
    }
    dispatch({
      type: 'gamefi/gameLike',
      payload: {
        data: postData,
      },
    }).then((res: objectT) => {
      setLinkCount(num);
      setIsLike(!isLike);
    });
  };
  return (
    <div className={styles['handle']}>
      <span className={styles['item']}>
        <i
          onClick={changeStar}
          className={`${icos['ico']} ${
            isStar ? icos['ico-heart-on'] : icos['ico-heart']
          } `}
        ></i>
        {starCount}
      </span>
      <span className={styles['item']}>
        <i
          onClick={changeLike}
          className={`${icos['ico']} ${
            isLike ? icos['ico-star-on'] : icos['ico-star']
          } `}
        ></i>
        {likeCount}
      </span>
    </div>
  );
};
export default connect(({ gamefi }: { gamefi: objectT }) => ({
  gamefi,
}))(Stars);
