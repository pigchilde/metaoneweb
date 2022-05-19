import icos from '../../icon.scss';
import styles from './index.scss';
import { connect } from 'dva';
import { useState, useEffect } from 'react';

interface objectT {
  [propName: string]: any;
}
const Stars = (props: objectT) => {
  const {
    data = {},
    dispatch,
    login: { userInfo },
  } = props;
  const [gameData, setGameData] = useState<objectT>(data);
  const [isLike, setIsLike] = useState<boolean>(false);
  const [isStar, setIsStar] = useState<boolean>(false);
  const [likeCount, setLinkCount] = useState<number>(data.likeCount);
  const [starCount, setStarCount] = useState<number>(data.starCount);
  console.log(props);
  useEffect(() => {
    setGameData(data);
    setLinkCount(data.likeCount);
    setStarCount(data.starCount);
  }, [data]);
  const changeStar = () => {
    //收藏
    if (userInfo.uid) {
      //已经登录
      let num = 0;
      let postData = {
        gameId: gameData.id,
        userId: userInfo.uid,
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
    } else {
      //未登录
    }
  };
  const changeLike = () => {
    //点赞
    if (userInfo.uid) {
      let num = 0;
      let postData = {
        gameId: gameData.id,
        userId: userInfo.uid,
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
    } else {
      //未登录
    }
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
export default connect(
  ({ gamefi, login }: { gamefi: objectT; login: objectT }) => ({
    gamefi,
    login,
  }),
)(Stars);
