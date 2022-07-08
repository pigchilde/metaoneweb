import icos from '../../icon.scss';
import styles from './index.scss';
import { connect } from 'dva';
import { useState, useEffect } from 'react';
import { Popover, Popconfirm, Button } from 'antd';
import { useIntl, Link, history } from 'umi';
interface objectT {
  [propName: string]: any;
}
const Stars = (props: objectT) => {
  const {
    data = {},
    dispatch,
    login: { userInfo },
  } = props;
  const intl = useIntl();
  const [gameData, setGameData] = useState<objectT>(data);
  const [isLike, setIsLike] = useState<boolean>(false);
  const [isStar, setIsStar] = useState<boolean>(false);
  const [likeCount, setLinkCount] = useState<number>(data.likeCount);
  const [starCount, setStarCount] = useState<number>(data.starCount);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setGameData(data);
    setLinkCount(data.likeCount);
    setStarCount(data.starCount);
  }, [data]);

  const changeLike = (e: objectT) => {
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
      setVisible(true);
    }
  };
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
    }
  };

  const popContent = (
    <div className={styles.popover}>
      Please log in before operation.
      <Link to="/login">
        <Button type="primary">{intl.formatMessage({ id: 'SIGN_IN' })}</Button>
      </Link>
    </div>
  );
  const toLogin = () => {
    history.push(`/login`);
  };
  return (
    <div className={styles['handle']}>
      {userInfo.uid ? (
        <>
          <span className={styles['item']}>
            <i
              onClick={changeLike}
              className={`${icos['ico']} ${
                isLike ? icos['ico-heart-on'] : icos['ico-heart']
              } `}
            ></i>
            {likeCount}
          </span>
          <span className={styles['item']}>
            <i
              onClick={changeStar}
              className={`${icos['ico']} ${
                isStar ? icos['ico-star-on'] : icos['ico-star']
              } `}
            ></i>
            {starCount}
          </span>
        </>
      ) : (
        <>
          <Popconfirm
            placement="topRight"
            okText={intl.formatMessage({ id: 'SIGN_IN' })}
            title="Please log in before operation."
            onConfirm={toLogin}
          >
            <Button
              type="link"
              className={`${icos['ico']} ${styles['itemheart']}`}
            >
              ''
            </Button>
          </Popconfirm>
          {likeCount}
          <Popconfirm
            placement="topRight"
            onConfirm={toLogin}
            title="Please log in before operation."
            okText={intl.formatMessage({ id: 'SIGN_IN' })}
          >
            <Button
              type="link"
              className={`${icos['ico']} ${styles['itemstar']}`}
            >
              ''
            </Button>
          </Popconfirm>
          {starCount}
        </>
      )}
    </div>
  );
};
export default connect(
  ({ gamefi, login }: { gamefi: objectT; login: objectT }) => ({
    gamefi,
    login,
  }),
)(Stars);
