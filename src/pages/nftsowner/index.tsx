import styles from './index.scss';
import Banner from './components/Banner';
import { useIntl } from 'umi';
import avater from '../../assets/gamers/pic/avater.png';
import PhotoText from '@/components/PhotoText';
import { Tabs } from 'antd';
import { connect } from 'dva';
import { useEffect, useState } from 'react';
import Loading from '@/components/Loading';
import bgVideo from '@/assets/nftsowner/pic/video.mp4';

const { TabPane } = Tabs;
interface objectT {
  [propName: string]: any;
}

const Gamers = (props: objectT) => {
  const intl = useIntl();
  const { dispatch } = props;
  const [loading, setLoading] = useState(true as boolean);
  const [bannerData, setBannerData] = useState({} as objectT);
  const [informationList, setInformationList] = useState({} as objectT);

  /* useEffect(() => {
    setLoading(true);

    dispatch({
      type: 'gamers/getGamersInfo',
      payload: {},
    }).then((res: objectT) => {
      const { banner, list } = res;
      if (banner.code === 0) {
        setBannerData(banner.data);
      }
      if (list.code === 0) {
        setInformationList(list.data);
      }
      setLoading(false);
    });
  }, []); */
  return (
    <>
      <div>
        <video controls width="250">
          <source src={bgVideo} type="video/mp4" />
          Sorry, your browser doesn't support embedded videos.
        </video>
      </div>
    </>
  );
};

export default connect(({ gamers }: { gamers: objectT }) => ({
  gamers,
}))(Gamers);
