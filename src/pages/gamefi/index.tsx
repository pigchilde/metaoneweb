import styles from './index.scss';
import { Button, Select, Image } from 'antd';
import {
  CaretDownOutlined,
  LeftOutlined,
  RightOutlined,
} from '@ant-design/icons';
import { connect } from 'dva';
import React, { useEffect, useState } from 'react';
import Filters from './components/Filters';
import Empty from '@/components/Empty';
import BannerHot from './components/BannerHot';
import Loading from '@/components/Loading';
import 'swiper/swiper.scss';

interface objectT {
  [propName: string]: any;
}
const GameFi = (props: objectT) => {
  const { dispatch } = props;
  const [hotListDatas, setHotListDatas] = useState<objectT>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [hloading, setHLoading] = useState<boolean>(true);
  const [hotFilter, setHotFilter] = useState<string>('LIKE');
  const [selectHotList, setSelectHotList] = useState<objectT[]>([]);
  const { Option } = Select;
  const changeHotFilter = (value: any) => {
    setHotFilter(value);
  };

  useEffect(() => {
    setHLoading(true);
    dispatch({
      type: 'gamefi/getDicItem',
      payload: 'GMS_GAME_POPULAR_CATEGORY',
    }).then((res: objectT) => {
      const { code, data } = res;
      if (code == 0) {
        const tmpData = [
          {
            code: 'LIKE',
            name: 'LIKE',
            sort: 1,
            pcode: 'gms_game_popular_category',
            languageDictItems: [],
          },
          {
            code: 'STAR',
            name: 'STAR',
            sort: 2,
            pcode: 'gms_game_popular_category',
            languageDictItems: [],
          },
        ];
        setHotFilter(tmpData[0].name);
        setSelectHotList(tmpData);
        setHLoading(false);
      }
    });
  }, []);
  useEffect(() => {
    setLoading(true);
    dispatch({
      type: 'gamefi/getHotList',
      payload: hotFilter,
    }).then((res: objectT) => {
      setLoading(false);
      const { code, data } = res;
      code === 0 ? setHotListDatas({ data }) : setHotListDatas({ data: [] });
    });
  }, [hotFilter]);

  return (
    <div className={styles['gameFi-wrapper']}>
      <header className={styles['head-seletor']}>
        <div className={styles['wrapper']}>
          <h1>GAMES</h1>
          {hloading ? null : (
            <Select
              suffixIcon={<CaretDownOutlined />}
              onChange={changeHotFilter}
              defaultValue={hotFilter}
            >
              {selectHotList.map((item: objectT) => {
                return (
                  <Option value={item.name} key={item.name}>
                    {item.name}
                  </Option>
                );
              })}
            </Select>
          )}
        </div>
      </header>
      <div className={styles['banner-wrapper']}>
        {loading ? (
          <Loading />
        ) : hotListDatas.data?.length > 0 ? (
          <BannerHot hotListDatas={hotListDatas.data}></BannerHot>
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
