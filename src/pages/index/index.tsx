import styles from './index.scss';
import { useIntl, setLocale, Link } from 'umi';
import { Button } from 'antd';
import CustomSwiper from '@/components/CustomSwiper';
import PhotoText from '@/components/PhotoText';
import TeamSwiper from './TeamSwiper';
export default function IndexPage() {
  const intl = useIntl();
  //切换成英文
  const setLang = (lang: string) => {
    setLocale(lang, true);
  };
  const advisorsList = new Array(6).fill('');
  const logoList = new Array(5).fill('');
  const datas = [
    {
      id: 1,
      video:
        'https://klxxcdn.oss-cn-hangzhou.aliyuncs.com/histudy/hrm/media/bg3.mp4',
      img: require('@/assets/index/pic/news.jpg'),
      title: 'MetaOne completes $1.2-million',
      desc: 'MetaOne aims to be the world’s leading GameFi, guild management and analytics platform. Recently it announced the close of its seed round led by Infinity Ventures .',
      date: 'April 21 2022',
    },
    {
      id: 2,
      video:
        'https://klxxcdn.oss-cn-hangzhou.aliyuncs.com/histudy/hrm/media/bg3.mp4',
      img: require('@/assets/index/pic/news.jpg'),
      title: 'MetaOne completes $1.2-million',
      desc: 'MetaOne aims to be the world’s leading GameFi, guild management and analytics platform. Recently it announced the close of its seed round led by Infinity Ventures .',
      date: 'April 21 2022',
    },
    {
      id: 3,
      video:
        'https://klxxcdn.oss-cn-hangzhou.aliyuncs.com/histudy/hrm/media/bg3.mp4',
      img: require('@/assets/index/pic/news.jpg'),
      title: 'MetaOne completes $1.2-million',
      desc: 'MetaOne aims to be the world’s leading GameFi, guild management and analytics platform. Recently it announced the close of its seed round led by Infinity Ventures .',
      date: 'April 21 2022',
    },
    {
      id: 4,
      video:
        'https://klxxcdn.oss-cn-hangzhou.aliyuncs.com/histudy/hrm/media/bg3.mp4',
      img: require('@/assets/index/pic/news.jpg'),
      title: 'MetaOne completes $1.2-million',
      desc: 'MetaOne aims to be the world’s leading GameFi, guild management and analytics platform. Recently it announced the close of its seed round led by Infinity Ventures .',
      date: 'April 21 2022',
    },
  ];
  const photoTextDatas = {
    layoutCategory: 11,
    title: 'MetaOne Analytics Tools',
    content:
      'MetaOne provides extensive gaming data analytics from games to gamers level. The insights reflect undisputed value for all stakeholders, with the infusion of AI in our predictive analysis.',
    video:
      'https://klxxcdn.oss-cn-hangzhou.aliyuncs.com/histudy/hrm/media/bg3.mp4',
  };
  return (
    <div>
      <h1 className={styles.title} onClick={() => setLang('zh-CN')}>
        {intl.formatMessage({
          id: 'CN',
        })}
      </h1>
      <h1 className={styles.title} onClick={() => setLang('en-US')}>
        {intl.formatMessage({
          id: 'US',
        })}
      </h1>
      <Link to={`/news`}>
        {intl.formatMessage({
          id: 'NEW',
        })}
      </Link>
      <Link to={`/gamefi`}>
        {intl.formatMessage({
          id: 'GameFi',
        })}
      </Link>
      <section
        className={styles['banner']}
        style={{ backgroundImage: 'url()' }}
      >
        <div className={styles['wrapper']}>
          <div className={styles['info']}>
            <h2 className={styles['cm-tit']}>Gaming Guilds As A Service</h2>
            <p className={styles['desc']}>
              MetaOne simplify onboarding and NFT processes, enabling massive
              gamers community with extensive gaming data analytics from games
              to gamers level, and provides high assurance NFT assets management
              platform to the gaming metaverse.
            </p>
            <Button type="primary" className={styles['btn-download']}>
              whitepaper
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
        <CustomSwiper type="video" datas={datas}></CustomSwiper>
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
            <CustomSwiper type="image" datas={datas}></CustomSwiper>
          </div>
        </div>
      </section>
      <section className={styles['photo-text']}>
        <div className={styles['wrapper']}>
          <PhotoText datas={photoTextDatas} />
        </div>
      </section>
      <section className={styles['photo-text']}>
        <div className={styles['wrapper']}>
          <PhotoText datas={photoTextDatas} />
        </div>
      </section>
      <section className={styles['advisors']}>
        <div className={styles['wrapper']}>
          <h3 className={styles['cm-tit']}>
            {intl.formatMessage({ id: 'INDEX_INVESTORS_ADVISORS' })}
          </h3>
          <div
            className={`${styles['list']} ${
              styles[`total-${advisorsList.length}`]
            }`}
          >
            {advisorsList.map((item: any, index: number) => (
              <figure key={index}>
                <img src={require('@/assets/index/pic/avatar-1.png')} alt="" />
                <p>Prakash Somosundram</p>
              </figure>
            ))}
          </div>
        </div>
      </section>
      <section className={styles['team-swiper']}>
        <div className={styles['wrapper']}>
          <h3 className={styles['cm-tit']}>
            {intl.formatMessage({ id: 'INDEX_MANAGEMENT_TEAM' })}
          </h3>
          <TeamSwiper />
        </div>
      </section>
      <section className={styles['investors']}>
        <div className={styles['wrapper']}>
          <h3 className={styles['cm-tit']}>
            {intl.formatMessage({ id: 'INDEX_INVESTORS' })}
          </h3>
          <ul>
            {logoList.map((item: any, index: number) => (
              <li key={index}>
                <img src={require('@/assets/index/pic/logo.png')} alt="" />
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
