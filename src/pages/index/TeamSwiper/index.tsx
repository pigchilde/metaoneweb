import 'swiper/swiper.scss';
import styles from './index.scss';
import { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react';

interface objectT {
  [propName: string]: any;
}

const TeamSwiper = (props: any) => {
  let { datas = [], positionList = [], type = 'team' } = props;
  return (
    <div id={`${type}Swiper`}>
      {datas && datas.length ? (
        <div className={styles['swiper']}>
          <Swiper
            modules={[Navigation]}
            slidesPerView={3}
            loop
            centeredSlides
            spaceBetween={25}
            initialSlide={1}
            navigation={{
              prevEl: `#${type}Swiper .${styles['btn-prev']}`,
              nextEl: `#${type}Swiper .${styles['btn-next']}`,
            }}
          >
            {datas.length
              ? datas.map((item: any, index: number) => (
                  <SwiperSlide className={styles['slide']} key={index}>
                    <figure>
                      <div className={styles['img-wrap']}>
                        <img src={item.photo} alt="" />
                      </div>
                      <div className={styles['info']}>
                        <div className={styles['hd']}>
                          <p className={styles['name']}>{item.name}</p>
                          {positionList.length ? (
                            <p className={styles['position']}>
                              {
                                positionList.filter(
                                  (position: objectT) =>
                                    position.code === item.position,
                                )[0]?.name
                              }
                            </p>
                          ) : null}
                          {item.homePage ? (
                            <a
                              href={item.homePage}
                              className={styles['linkin']}
                              target="_blank"
                              title=""
                            ></a>
                          ) : null}
                        </div>
                        <p className={styles['desc']}>{item.description}</p>
                      </div>
                      <i></i>
                    </figure>
                  </SwiperSlide>
                ))
              : ''}
          </Swiper>
          <div className={styles['swiper-ctrl']}>
            <span className={styles['btn-prev']}></span>
            <span className={styles['btn-next']}></span>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default TeamSwiper;
