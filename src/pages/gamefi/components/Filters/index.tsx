import styles from './index.scss';
import icos from '../../icon.scss';
import { Menu, Dropdown, Space, Button, Input, Popover, Checkbox } from 'antd';
import { CaretDownOutlined, SearchOutlined } from '@ant-design/icons';
import React from 'react';
const Filters = () => {
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

  const popContent = (
    <React.Fragment>
      <h6 className={styles.checktitle}>IGO STATUS</h6>
      <div className={styles.checkline}>
        <Checkbox.Group options={plainOptions} />
      </div>
      <h6 className={styles.checktitle}>GAME RELEASE</h6>
      <div className={styles.checkline}>
        <Checkbox.Group options={plainOptions2} />
      </div>
      <h6 className={styles.checktitle}>CATEGORIES</h6>
      <div className={styles.checkline}>
        <Checkbox.Group options={plainOptions3} />
      </div>
    </React.Fragment>
  );
  const menu = <Menu items={items} />;
  return (
    <div className={`wrapper ${styles['filter-wrapper']} `}>
      <aside className={styles['search-box']}>
        <Input placeholder="Search" />
        <SearchOutlined />
      </aside>
      <aside className={styles['select-box']}>
        <label>Show</label>
        <Dropdown overlay={menu}>
          <a onClick={(e) => e.preventDefault()}>
            <Space>
              10
              <CaretDownOutlined />
            </Space>
          </a>
        </Dropdown>
        <label>Items per page</label>
        <Dropdown overlay={menu}>
          <a onClick={(e) => e.preventDefault()}>
            <Space>
              Newest
              <CaretDownOutlined />
            </Space>
          </a>
        </Dropdown>
        <i className={`${icos['ico']} ${icos['ico-blocks']}`}></i>
        <i className={`${icos['ico']} ${icos['ico-list']}`}></i>
        <Popover
          placement="bottomRight"
          content={popContent}
          title="FILTERS"
          trigger="click"
        >
          <Button type="primary">Filters</Button>
        </Popover>
      </aside>
    </div>
  );
};
export default Filters;
