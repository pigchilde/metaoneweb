import 'swiper/swiper.scss';
import styles from './index.scss';
import { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react';

interface objectT {
  [propName: string]: any;
}

const AdvisorsSwiper = (props: any) => {
  let { datas = [] } = props;
  return (
    <>
      {datas && datas.length ? (
        <div className={styles['swiper']}>
          <Swiper
            modules={[Navigation]}
            slidesPerView={3}
            loop
            centeredSlides
            spaceBetween={95}
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
                        </div>
                        <p className={styles['desc']}>{item.description}</p>
                      </div>
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

export default AdvisorsSwiper;
