import styles from './index.scss';
import icos from '../../icon.scss';
import {
  Menu,
  Dropdown,
  Space,
  Button,
  Input,
  Popover,
  Checkbox,
  Select,
} from 'antd';
import { CaretDownOutlined, SearchOutlined } from '@ant-design/icons';
import React from 'react';
import { useIntl } from 'umi';

const Filters = () => {
  const intl = useIntl();
  const GAMEFI_FILTERS_BTN = intl.formatMessage({
    id: 'GAMEFI_FILTERS_BTN',
  });
  const GAMEFI_FILTERS_SHOW = intl.formatMessage({
    id: 'GAMEFI_FILTERS_SHOW',
  });
  const GAMEFI_FILTERS_PERPAGR = intl.formatMessage({
    id: 'GAMEFI_FILTERS_PERPAGR',
  });
  const GAMEFI_FILTERS_NEWEST = intl.formatMessage({
    id: 'GAMEFI_FILTERS_NEWEST',
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
  const items = [
    {
      label: <div>10</div>,
      key: '0',
    },
    {
      label: <div>20</div>,
      key: '1',
    },
  ];
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
  const menu = <Menu items={items} />;
  return (
    <div className={`wrapper ${styles['filter-wrapper']} `}>
      <aside className={styles['search-box']}>
        <Input placeholder={GAMEFI_FILTERS_SEARCH} />
        <SearchOutlined />
      </aside>
      <aside className={styles['select-box']}>
        <label>{GAMEFI_FILTERS_SHOW}</label>
        <Select suffixIcon={<CaretDownOutlined />} defaultValue={pageSizes[0]}>
          {pageSizes.map((item: any) => {
            return (
              <Option value={item} key={item}>
                {item}
              </Option>
            );
          })}
        </Select>

        <label>{GAMEFI_FILTERS_PERPAGR}</label>
        <Select suffixIcon={<CaretDownOutlined />} defaultValue={pagePers[0]}>
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
  );
};
export default Filters;
