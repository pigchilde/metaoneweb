import styles from './index.scss';
import { useIntl, setLocale, Link } from 'umi';
import { Button } from 'antd';
import CustomSwiper from '@/components/CustomSwiper';
import PhotoText from '@/components/PhotoText';
import TeamSwiper from './TeamSwiper';
import { connect } from 'dva';
import { useEffect, useState } from 'react';
import Loading from '@/components/Loading';

interface objectT {
  [propName: string]: any;
}

const Index = (props: objectT) => {
  const intl = useIntl();
  const { dispatch } = props;
  const [loading, setLoading] = useState(true as boolean);
  const [bannerData, setBannerData] = useState({} as objectT);
  const [videoAutoList, setVideoAutoList] = useState({} as objectT);
  const [imgAutoList, setImgAutoList] = useState({} as objectT);
  const [informationList, setInformationList] = useState({} as objectT);
  const [adviserList, setAdviserList] = useState({} as objectT);
  const [managmentList, setManagmentList] = useState({} as objectT);
  const [advisorList, setAdvisorList] = useState({} as objectT);

  //切换成语言
  const setLang = (lang: string) => {
    setLocale(lang, true);
  };

  useEffect(() => {
    setLoading(true);

    dispatch({
      type: 'index/getIndexInfo',
      payload: {},
    }).then((res: objectT) => {
      const {
        banner,
        videoList,
        imgList,
        informationList,
        adviserList,
        managmentList,
        advisorList,
      } = res;
      if (banner.code === 0) {
        setBannerData(banner.data);
      }

      if (videoList.code === 0) {
        setVideoAutoList(videoList.data);
      }

      if (imgList.code === 0) {
        setImgAutoList(imgList.data);
      }

      if (informationList.code === 0) {
        setInformationList(informationList.data);
      }

      if (adviserList.code === 0) {
        setAdviserList(adviserList.data);
      }

      if (managmentList.code === 0) {
        setManagmentList(managmentList.data);
      }

      if (advisorList.code === 0) {
        setAdvisorList(advisorList.data);
      }
      setLoading(false);
    });
  }, []);

  return (
    <div>
      <section
        className={styles['banner']}
        style={{ background: `url(${bannerData.img}) no-repeat` }}
      >
        <div className={styles['wrapper']}>
          <div className={styles['info']}>
            <h2 className={styles['cm-tit']}>{bannerData.title}</h2>
            <p className={styles['desc']}>{bannerData.content}</p>
            <Button type="primary" className={styles['btn-download']}>
              {intl.formatMessage({ id: 'INDEX_BANNER_BUTTON' })}
            </Button>
            <div className={styles['share']}></div>
          </div>
        </div>
      </section>
      <section className={styles['video-swiper']}>
        <div className={styles['wrapper']}>
          <h3 className={styles['cm-tit']}>
            {intl.formatMessage({ id: 'INDEX_VIDEO_SWIPER_TITLE' })}
          </h3>
          <p className={styles['desc']}>
            {intl.formatMessage({ id: 'INDEX_VIDEO_SWIPER_DESCRIPTION' })}
          </p>
        </div>
        <CustomSwiper type="video" datas={videoAutoList}></CustomSwiper>
      </section>
      <section className={styles['news-swiper']}>
        <div className={styles['wrapper']}>
          <p className={styles['txt-top']}>
            {intl.formatMessage({ id: 'INDEX_NEWS_SWIPER_TOP_TEXT' })}
          </p>
          <h3 className={styles['tit']}>
            {intl.formatMessage({ id: 'INDEX_NEWS_SWIPER_TITLE' })}
          </h3>
          <p className={styles['desc']}>
            {intl.formatMessage({ id: 'INDEX_NEWS_SWIPER_DESCRIPTION' })}
          </p>
          <div className={styles['swiper']}>
            <CustomSwiper type="image" datas={imgAutoList}></CustomSwiper>
          </div>
        </div>
      </section>
      {informationList.length
        ? informationList.map((item: objectT) => {
            return (
              <section className={styles['photo-text']} key={item.id}>
                <div className={styles['wrapper']}>
                  <PhotoText datas={item} />
                </div>
              </section>
            );
          })
        : ''}
      <section className={styles['advisors']}>
        <div className={styles['wrapper']}>
          <h3 className={styles['cm-tit']}>
            {intl.formatMessage({ id: 'INDEX_INVESTORS_ADVISORS' })}
          </h3>
          <div
            className={`${styles['list']} ${
              styles[`total-${adviserList.length}`]
            }`}
          >
            {adviserList.length
              ? adviserList.map((item: any) => (
                  <figure key={item.id}>
                    <img src={item.photo} alt={item.name} />
                    <p>{item.name}</p>
                  </figure>
                ))
              : ''}
          </div>
        </div>
      </section>
      <section className={styles['team-swiper']}>
        <div className={styles['wrapper']}>
          <h3 className={styles['cm-tit']}>
            {intl.formatMessage({ id: 'INDEX_MANAGEMENT_TEAM' })}
          </h3>
          <TeamSwiper datas={managmentList} />
        </div>
      </section>
      <section className={styles['investors']}>
        <div className={styles['wrapper']}>
          <h3 className={styles['cm-tit']}>
            {intl.formatMessage({ id: 'INDEX_INVESTORS' })}
          </h3>
          <ul>
            {advisorList.length
              ? advisorList.map((item: any) => (
                  <li key={item.id}>
                    <Link to={item.homePage} target="_blank">
                      <img src={item.logo} alt="" />
                    </Link>
                  </li>
                ))
              : ''}
          </ul>
        </div>
      </section>
    </div>
  );
};

export default connect(({ index }: { index: objectT }) => ({
  index,
}))(Index);
