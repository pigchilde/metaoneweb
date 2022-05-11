import 'swiper/swiper.scss';
import styles from './index.scss';
import { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react';
import { useState } from 'react';
import { Link } from 'umi';

const CustomSwiper = (props: any) => {
  const { datas = [], type = 'image' } = props;
  const [showPlayBtn, setShowPlayBtn] = useState(false);
  const [showMoreLink, setShowMoreLink] = useState(false);

  /**
   * 处理视频点击
   */
  const handleVideoClick = (swiper: any) => {
    setShowPlayBtn(false);
    swiper.slideTo(swiper.clickedIndex, 500, (swiper: any) => {
      handleVideoCtrl(swiper);
    });
  };

  /**
   * 处理swiper切换
   * @param swiper
   */
  const handleSlideChange = (swiper: any) => {
    if (type === 'video') {
      handleVideoCtrl(swiper);
    } else {
      setShowMoreLink(swiper.isEnd);
    }
  };

  /**
   *  处理视频控制
   */
  const handleVideoCtrl = (swiper: any) => {
    const prevSlide = swiper.slides[swiper.previousIndex];
    const currSlide = swiper.slides[swiper.activeIndex];
    const currVideo = currSlide.querySelector('video');
    const prevVideo = prevSlide.querySelector('video');
    prevVideo.pause();
    currVideo.play();
  };

  return (
    <>
      {datas && datas.length ? (
        <div className={`${styles['swiper']} ${styles[`swiper-${type}`]}`}>
          <Swiper
            modules={[Navigation]}
            slidesPerView={3}
            loop={type === 'video' ? true : false}
            centeredSlides={type === 'video' ? true : false}
            spaceBetween={type === 'video' ? 500 : 29}
            onClick={type === 'video' ? handleVideoClick : () => {}}
            onSlideChange={handleSlideChange}
            navigation={
              type === 'image'
                ? {
                    prevEl: `.${styles['btn-prev']}`,
                    nextEl: `.${styles['btn-next']}`,
                  }
                : false
            }
          >
            {datas.map((item: any, index: number) => (
              <SwiperSlide
                className={`${styles['slide']} ${styles[`slide-${type}`]}`}
                key={index}
              >
                {type === 'image' ? (
                  <Link to="">
                    <figure className={styles['slide-item']}>
                      <img src={item.img} alt="" />
                      <div className={styles['info']}>
                        <h4 className={styles['tit']}>{item.title}</h4>
                        <p className={styles['desc']}>{item.content}</p>
                        <time>{item.date}</time>
                      </div>
                    </figure>
                  </Link>
                ) : (
                  <div className="video-wrap">
                    <video controls>
                      <source src={item.video} />
                    </video>
                    <div
                      className={`btn-play ${showPlayBtn ? 'show' : undefined}`}
                    >
                      Start Watching
                    </div>
                    <p className={styles['desc']}>{item.video}</p>
                  </div>
                )}
              </SwiperSlide>
            ))}
          </Swiper>
          {type === 'image' ? (
            <div className={styles['swiper-ctrl']}>
              <span className={styles['btn-prev']}></span>
              <span
                className={`${styles['btn-next']} ${
                  showMoreLink ? styles['hide'] : ''
                }`}
              ></span>
              <Link
                to=""
                className={`${styles['link-more']} ${
                  !showMoreLink ? styles['hide'] : ''
                }`}
              >
                <i></i>
              </Link>
            </div>
          ) : null}
        </div>
      ) : null}
    </>
  );
};

export default CustomSwiper;
