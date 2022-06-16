import styles from './index.scss';
import { useIntl, setLocale } from 'umi';
import { Button } from 'antd';
import CustomSwiper from '@/components/CustomSwiper';
import PhotoText from '@/components/PhotoText';
import TeamSwiper from './TeamSwiper';
import SocialMediaList from '@/components/SocialMediaList';
import { connect } from 'dva';
import { useEffect, useState } from 'react';
import Loading from '@/components/Loading';
import AdvisorsSwiper from './AdvisorsSwiper';

interface objectT {
  [propName: string]: any;
}

const Index = (props: objectT) => {
  const intl = useIntl();
  const {
    dispatch,
    common: { platformInfo },
  } = props;
  const [loading, setLoading] = useState(true as boolean);
  const [bannerData, setBannerData] = useState({} as objectT);
  const [videoAutoList, setVideoAutoList] = useState({} as objectT);
  const [newsList, setNewsList] = useState<objectT[]>([]);
  const [informationList, setInformationList] = useState({} as objectT);
  const [adviserList, setAdviserList] = useState({} as objectT);
  const [managmentList, setManagmentList] = useState({} as objectT);
  const [advisorList, setAdvisorList] = useState({} as objectT);
  const [positionList, setPositionList] = useState<objectT[]>([]);

  //切换成语言
  const setLang = (lang: string) => {
    setLocale(lang, true);
  };

  useEffect(() => {
    setLoading(true);

    dispatch({
      type: 'index/getIndexInfo',
      payload: {
        dicCode: 'CMS_POSITION_TYPE',
      },
    }).then((res: objectT) => {
      const {
        banner,
        videoList,
        newsList,
        informationList,
        adviserList,
        managmentList,
        advisorList,
        positionDicItem,
      } = res;
      if (banner.code === 0) {
        setBannerData(banner.data);
      }

      if (videoList.code === 0) {
        setVideoAutoList(videoList.data);
      }

      if (newsList.code === 0) {
        setNewsList(newsList.data);
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
      if (positionDicItem.code === 0) {
        setPositionList(positionDicItem.data);
      }
      setLoading(false);
    });
  }, []);

  return (
    <div>
      <section
        className={styles['banner']}
        style={{ backgroundImage: `url(${bannerData.backageImg})` }}
      >
        <div
          className={styles['wrapper']}
          style={{ backgroundImage: `url(${bannerData.img})` }}
        >
          <div className={styles['info']}>
            <h2 className={styles['cm-tit']}>{bannerData.title}</h2>
            <div
              className={styles['desc']}
              dangerouslySetInnerHTML={{ __html: bannerData.content }}
            ></div>
            <Button
              type="primary"
              className={styles['btn-download']}
              href={platformInfo.whitePaper}
            >
              {intl.formatMessage({ id: 'INDEX_BANNER_BUTTON' })}
            </Button>
            <div className={styles['share']}>
              <SocialMediaList />
            </div>
          </div>
        </div>
      </section>
      {/* <section className={styles['video-swiper']}>
        <div className={styles['wrapper']}>
          <h3 className={styles['cm-tit']}>
            {intl.formatMessage({ id: 'INDEX_VIDEO_SWIPER_TITLE' })}
          </h3>
          <p className={styles['desc']}>
            {intl.formatMessage({ id: 'INDEX_VIDEO_SWIPER_DESCRIPTION' })}
          </p>
        </div>
        <CustomSwiper type="video" datas={videoAutoList}></CustomSwiper>
      </section> */}
      {/* <section className={styles['news-swiper']}>
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
            <CustomSwiper
              type="image"
              datas={newsList}
              moreLink="/news?tab=1001"
            ></CustomSwiper>
          </div>
        </div>
      </section> */}
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
      {/* <section className={styles['advisors']}>
        <div className={styles['wrapper']}>
          <h3 className={styles['cm-tit']}>
            {intl.formatMessage({ id: 'INDEX_INVESTORS_ADVISORS' })}
          </h3>
          <div
            className={`${styles['list']} ${
              (adviserList.length + 1) % 5 === 0 || adviserList.length % 5 === 0
                ? styles['type-1']
                : ''
            }`}
          >
            {adviserList.length
              ? adviserList.map((item: any, index: number) => (
                  <figure key={item.id}>
                    <div className={styles['figure-inner']}>
                      <img src={item.photo} alt={item.name} />
                      <p className={styles['name']}>{item.name}</p>
                      <div className={styles['intro']}>
                        <p>{item.description}</p>
                      </div>
                    </div>
                  </figure>
                ))
              : ''}
          </div>
        </div>
      </section> */}
      <section className={styles['team-swiper']}>
        <div className={styles['wrapper']}>
          <h3 className={styles['cm-tit']}>
            {intl.formatMessage({ id: 'INDEX_INVESTORS_ADVISORS' })}
          </h3>
          <AdvisorsSwiper datas={adviserList} />
        </div>
      </section>
      <section className={styles['team-swiper']}>
        <div className={styles['wrapper']}>
          <h3 className={styles['cm-tit']}>
            {intl.formatMessage({ id: 'INDEX_MANAGEMENT_TEAM' })}
          </h3>
          <TeamSwiper
            datas={managmentList}
            positionList={positionList}
            type="team"
          />
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
                    <a href={item.homePage} target="_blank" title="">
                      <img src={item.logo} alt="" />
                    </a>
                  </li>
                ))
              : ''}
          </ul>
        </div>
      </section>
    </div>
  );
};

export default connect(
  ({ index, common }: { index: objectT; common: objectT }) => ({
    index,
    common,
  }),
)(Index);
