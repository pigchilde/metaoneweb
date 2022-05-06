import styles from './yield.scss';
import { useIntl, Link } from 'umi';
import { Tabs, Table, Tag, Select } from 'antd';
const { Option } = Select;

interface objectT {
  [propName: string]: any;
}
const Yield = () => {
  const intl = useIntl();

  const { TabPane } = Tabs;
  function tabClick(key) {
    console.log(key);
  }
  const handleSelectChange = (e) => {
    console.log(e);
  };

  const columns = [
    {
      title: intl.formatMessage({
        id: 'PERSONAL_GAMEINFO_TABLE_TH1',
      }),
      dataIndex: 'rank',
      key: 'rank',
    },
    {
      title: intl.formatMessage({
        id: 'PERSONAL_GAMEINFO_TABLE_TH2',
      }),
      dataIndex: 'gamer',
      key: 'gamer',
      sorter: (a: objectT, b: objectT) => {},
      sortDirections: ['descend'],
    },
    {
      title: intl.formatMessage({
        id: 'PERSONAL_GAMEINFO_TABLE_TH3',
      }),
      dataIndex: 'earnings',
      key: 'earnings',
    },
    {
      title: intl.formatMessage({
        id: 'PERSONAL_GAMEINFO_TABLE_TH4',
      }),
      dataIndex: 'hours_played',
      key: 'hours_played',
    },
  ];
  const data = [
    {
      rank: '1',
      gamer: 'AAAA',
      earnings: '502.15',
      hours_played: '5482',
    },
    {
      rank: '2',
      gamer: 'AAAA',
      earnings: '502.15',
      hours_played: '5482',
    },
  ];

  return (
    <>
      <Link to="/personal/guild" className={styles['back']}>
        {'< '}
        {intl.formatMessage({
          id: 'PERSONAL_BACK',
        })}
      </Link>
      <div className={styles['game-info']}>
        <ul className={styles['game-data']}>
          <li className="clearfix">
            <span className={styles['title']}>
              {intl.formatMessage({
                id: 'PERSONAL_GAMEINFO_DATA1',
              })}
            </span>
            <span className={styles['data']}>
              <i className={styles['num']}>12345</i>
              <i className={styles['name']}>USDT</i>
              <i className={styles['status']}>↓0.8%</i>
            </span>
          </li>
          <li className="clearfix">
            <span className={styles['title']}>
              {intl.formatMessage({
                id: 'PERSONAL_GAMEINFO_DATA2',
              })}
            </span>
            <span className={styles['data']}>
              <i className={styles['num']}>4218.45</i>
              <i className={styles['name']}>USDT</i>
            </span>
          </li>
          <li className="clearfix">
            <span className={styles['title']}>
              {intl.formatMessage({
                id: 'PERSONAL_GAMEINFO_DATA3',
              })}
            </span>
            <span className={styles['data']}>
              <i className={styles['num']}>16067</i>
              <i className={styles['status']}>↓39</i>
            </span>
          </li>
          <li className="clearfix">
            <span className={styles['title']}>
              {intl.formatMessage({
                id: 'PERSONAL_GAMEINFO_DATA4',
              })}
            </span>
            <span className={styles['data']}>
              <i className={styles['num']}>12011</i>
              <i className={styles['status']}>↓4.9%</i>
            </span>
          </li>
        </ul>
        <div className={styles['game-list']}>
          <div className={styles['header']}>
            <h6 className={styles['title']}>Yield sources</h6>
            <Select
              defaultValue="lucy"
              style={{ width: 120 }}
              onChange={handleSelectChange}
            >
              <Option value="jack">Jack</Option>
              <Option value="lucy">Lucy</Option>

              <Option value="Yiminghe">yiminghe</Option>
            </Select>
          </div>

          <Table
            columns={columns}
            dataSource={data}
            pagination={{ position: ['bottomCenter'] }}
          />
        </div>
      </div>
    </>
  );
};
export default Yield;
