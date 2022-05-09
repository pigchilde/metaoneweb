import styles from './index.scss';
import { Button, Select } from 'antd';
import {
  CaretDownOutlined,
  LeftOutlined,
  RightOutlined,
} from '@ant-design/icons';
import { connect } from 'dva';
import React, { useEffect, useState } from 'react';
import Filters from './components/Filters';
import Banner from './components/Banner';
import Empty from '@/components/Empty';
import Loading from '@/components/Loading';
import 'swiper/swiper.scss';
import { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react';

interface objectT {
  [propName: string]: any;
}
const GameFi = (props: objectT) => {
  const { dispatch, gamefi = {} } = props;
  const [hotListDatas, setHotListDatas] = useState<objectT>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [hotFilter, setHotFilter] = useState<string>('LIKE');
  const selectHotList = [
    {
      label: 'LIKE Collections',
      key: 'LIKE',
    },
    {
      label: 'Top favorite',
      key: 'STAR',
    },
  ];
  const { Option } = Select;

  const changeHotFilter = (value: any) => {
    dispatch({
      type: 'gamefi/setHotFilter',
      payload: value,
    });
    setHotFilter(value);
  };
  useEffect(() => {
    setLoading(true);
    dispatch({
      type: 'gamefi/getHotList',
      payload: gamefi.hotFilter,
    }).then((res: objectT) => {
      setLoading(false);
      const { code, data } = res;
      code === 0
        ? setHotListDatas({ data })
        : setHotListDatas({
            data: [],
          });
    });
  }, [hotFilter]);

  return (
    <div className={styles['gameFi-wrapper']}>
      <header className={styles['head-seletor']}>
        <div className={styles['wrapper']}>
          <h1>GAMES</h1>
          <Select
            suffixIcon={<CaretDownOutlined />}
            onChange={changeHotFilter}
            defaultValue={selectHotList[0].key}
          >
            {selectHotList.map((item: objectT) => {
              return (
                <Option value={item.key} key={item.key}>
                  {item.label}
                </Option>
              );
            })}
          </Select>
        </div>
      </header>
      <div className={styles['banner-wrapper']}>
        {loading ? (
          <Loading />
        ) : hotListDatas.data?.length > 0 ? (
          <React.Fragment>
            <Swiper
              modules={[Navigation]}
              navigation={{
                prevEl: `.${styles['btnPre']}`,
                nextEl: `.${styles['btnNext']}`,
              }}
            >
              {hotListDatas.data.map((item: objectT) => {
                return (
                  <SwiperSlide key={item.id}>
                    <Banner key={item.id} datas={item} />
                  </SwiperSlide>
                );
              })}
            </Swiper>
            <div className={styles['btnPre']}>
              <Button type="primary" shape="circle" icon={<LeftOutlined />} />
            </div>
            <div className={styles['btnNext']}>
              <Button type="primary" shape="circle" icon={<RightOutlined />} />
            </div>
          </React.Fragment>
        ) : (
          <Empty />
        )}
      </div>
      <Filters />
    </div>
  );
};
export default connect(({ gamefi }: { gamefi: objectT }) => ({
  gamefi,
}))(GameFi);
