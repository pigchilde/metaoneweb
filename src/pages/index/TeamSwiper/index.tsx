import 'swiper/swiper.scss';
import styles from './index.scss';
import { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react';
import { useState } from 'react';
import { Link } from 'umi';

const TeamSwiper = (props: any) => {
  let { datas = [], type = 'image' } = props;

  return (
    <>
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
              prevEl: `.${styles['btn-prev']}`,
              nextEl: `.${styles['btn-next']}`,
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
                          <p className={styles['position']}>{item.position}</p>
                          <a
                            href={item.homePage}
                            className={styles['linkin']}
                            target="_blank"
                            title=""
                          ></a>
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
    </>
  );
};

export default TeamSwiper;
