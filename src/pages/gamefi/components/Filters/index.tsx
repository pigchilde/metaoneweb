import styles from './index.scss';
import icos from '../../icon.scss';
import { Button, Input, Popover, Checkbox, Select } from 'antd';
import { CaretDownOutlined, SearchOutlined } from '@ant-design/icons';
import React from 'react';
import Filist from '../Filist';
import { useIntl } from 'umi';
import { connect } from 'dva';
import { useEffect, useState, useRef } from 'react';
import PaginationItem from '@/components/Pagination';
import Loading from '@/components/Loading';
import Empty from '@/components/Empty';
import { InputProps } from 'antd/lib/input';

interface objectT {
  [propName: string]: any;
}

const Filters = (props: objectT) => {
  const intl = useIntl();
  const { dispatch, gamefi = {} } = props;
  const inputRef = useRef<InputProps>(null);
  const GAMEFI_FILTERS_BTN = intl.formatMessage({
    id: 'GAMEFI_FILTERS_BTN',
  });
  const GAMEFI_FILTERS_SHOW = intl.formatMessage({
    id: 'GAMEFI_FILTERS_SHOW',
  });
  const GAMEFI_FILTERS_PERPAGR = intl.formatMessage({
    id: 'GAMEFI_FILTERS_PERPAGR',
  });
  const GAMEFI_FILTERS_SEARCH = intl.formatMessage({
    id: 'GAMEFI_FILTERS_SEARCH',
  });
  const GAMEFI_FILTERS_CATEGORIES = intl.formatMessage({
    id: 'GAMEFI_FILTERS_CATEGORIES',
  });
  const GAMEFI_FILTERS_GAME_RELEASE = intl.formatMessage({
    id: 'GAMEFI_FILTERS_GAME_RELEASE',
  });
  const GAMEFI_FILTERS_IGO_STATUS = intl.formatMessage({
    id: 'GAMEFI_FILTERS_IGO_STATUS',
  });
  const GAMEFI_FILTERS_POPTITLE = intl.formatMessage({
    id: 'GAMEFI_FILTERS_POPTITLE',
  });
  const [listDatas, setListDatas] = useState<objectT>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [params, setParams] = useState<objectT>({
    pageNum: 1,
    pageSize: 10,
    orderByType: 'Newest',
  });
  const plainOptions = ['All', 'Launched'];
  const plainOptions2 = ['All', 'Official', 'Testnet', 'Upcoming'];
  const plainOptions3 = [
    'Action',
    'Metaverse',
    'Racing',
    'Strategy',
    'Adventure',
    'Mmorpg',
    'Simulation',
    'Rtrategy',
    'Card',
    'Puzzle',
    'Sports',
    'Turn-based Strategy',
  ];
  const pageSizes = [10, 20, 30];
  const pagePers = ['Newest', 'High ROI', 'Top Rank'];
  const { Option } = Select;

  const popContent = (
    <React.Fragment>
      <h6 className={styles.checktitle}>{GAMEFI_FILTERS_IGO_STATUS}</h6>
      <div className={styles.checkline}>
        <Checkbox.Group options={plainOptions} />
      </div>
      <h6 className={styles.checktitle}>{GAMEFI_FILTERS_GAME_RELEASE}</h6>
      <div className={styles.checkline}>
        <Checkbox.Group options={plainOptions2} />
      </div>
      <h6 className={styles.checktitle}>{GAMEFI_FILTERS_CATEGORIES}</h6>
      <div className={styles.checkline}>
        <Checkbox.Group options={plainOptions3} />
      </div>
    </React.Fragment>
  );

  const changeSizeFilter = (value: any) => {
    setParams({ ...params, pageNum: 0, pageSize: value });
  };
  const changePerFilter = (value: any) => {
    setParams({ ...params, pageNum: 0, orderByType: value });
  };
  const changeNameFilter = () => {
    setParams({ ...params, pageNum: 0, name: inputRef.current?.input?.value });
  };
  const onPageChange = (e: number) => {
    setParams({ ...params, pageNum: e });
  };
  useEffect(() => {
    setLoading(true);
    dispatch({
      type: 'gamefi/getList',
      payload: {
        data: params,
      },
    }).then((res: objectT) => {
      const { code } = res;
      if (code === 0) {
        setListDatas(res);
        setLoading(false);
      }
    });
  }, [params]);

  return (
    <div className={`wrapper `}>
      <div className={styles['filter-wrapper']}>
        <aside className={styles['search-box']}>
          <Input placeholder={GAMEFI_FILTERS_SEARCH} ref={inputRef} />
          <SearchOutlined onClick={changeNameFilter} />
        </aside>
        <aside className={styles['select-box']}>
          <label>{GAMEFI_FILTERS_SHOW}</label>
          <Select
            onChange={changeSizeFilter}
            suffixIcon={<CaretDownOutlined />}
            defaultValue={pageSizes[0]}
          >
            {pageSizes.map((item: any) => {
              return (
                <Option value={item} key={item}>
                  {item}
                </Option>
              );
            })}
          </Select>

          <label>{GAMEFI_FILTERS_PERPAGR}</label>
          <Select
            onChange={changePerFilter}
            suffixIcon={<CaretDownOutlined />}
            defaultValue={pagePers[0]}
          >
            {pagePers.map((item: any) => {
              return (
                <Option value={item} key={item}>
                  {item}
                </Option>
              );
            })}
          </Select>
          {/* <i className={`${icos['ico']} ${icos['ico-blocks']}`}></i>
        <i className={`${icos['ico']} ${icos['ico-list']}`}></i> */}
          <Popover
            placement="bottomRight"
            content={popContent}
            title={GAMEFI_FILTERS_POPTITLE}
            trigger="click"
          >
            <Button type="primary">{GAMEFI_FILTERS_BTN}</Button>
          </Popover>
        </aside>
      </div>
      <div className={`${styles['list-wrapper']}`}>
        {loading ? (
          <Loading />
        ) : listDatas.data?.length > 0 ? (
          <Filist datas={listDatas.data} />
        ) : (
          <Empty />
        )}
        {!loading && listDatas.data && listDatas.data.length ? (
          <PaginationItem
            datas={{
              total: listDatas.count ? listDatas.count : 1,
              current: params.pageNum,
              pageSize: params.pageSize,
            }}
            onPageChange={onPageChange}
          />
        ) : (
          ''
        )}
      </div>
    </div>
  );
};

export default connect(({ gamefi }: { gamefi: objectT }) => ({
  gamefi,
}))(Filters);
