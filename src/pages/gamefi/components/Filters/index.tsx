import styles from './index.scss';
import styles2 from '../../index.scss';
import { Menu, Dropdown, Space, Button, Input } from 'antd';
import { CaretDownOutlined, SearchOutlined } from '@ant-design/icons';

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
        <i className={`${styles2['ico']} ${styles2['ico-blocks']}`}></i>
        <i className={`${styles2['ico']} ${styles2['ico-list']}`}></i>
        <Button type="primary">Filters</Button>
      </aside>
    </div>
  );
};
export default Filters;
