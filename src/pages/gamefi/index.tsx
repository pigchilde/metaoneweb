import styles from './index.scss';
import { Carousel, Button, Select } from 'antd';
import {
  CaretDownOutlined,
  LeftOutlined,
  RightOutlined,
} from '@ant-design/icons';
import { connect } from 'dva';
import React, { useRef, useEffect, useState } from 'react';
import Filters from './components/Filters';
import Filist from './components/Filist';
import Banner from './components/Banner';
import Empty from '@/components/Empty';
import Loading from '@/components/Loading';

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
  const carouselEl = useRef({} as objectT);
  const carouselPre = () => {
    carouselEl.current.prev();
  };
  const carouselNext = () => {
    carouselEl.current.next();
  };
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
            <Carousel dots={false} ref={carouselEl}>
              {hotListDatas.data.map((item: objectT) => {
                return <Banner key={item.id} datas={item} />;
              })}
            </Carousel>
            <div className={styles.btnPre}>
              <Button
                type="primary"
                onClick={carouselPre}
                shape="circle"
                icon={<LeftOutlined />}
              />
            </div>
            <div className={styles.btnNext}>
              <Button
                type="primary"
                onClick={carouselNext}
                shape="circle"
                icon={<RightOutlined />}
              />
            </div>
          </React.Fragment>
        ) : (
          <Empty />
        )}
      </div>
      <Filters />
      <Filist />
    </div>
  );
};
export default connect(({ gamefi }: { gamefi: objectT }) => ({
  gamefi,
}))(GameFi);
