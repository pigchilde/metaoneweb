import styles from './revenue.scss';
import { useIntl, Link } from 'umi';
import { Tabs, Table, Tag, Select } from 'antd';
const { Option } = Select;

interface objectT {
  [propName: string]: any;
}
const Revenue = () => {
  const intl = useIntl();

  const { TabPane } = Tabs;
  function tabClick(key: any) {
    console.log(key);
  }
  const handleSelectChange = (e: any) => {
    console.log(e);
  };

  const columns = [
    {
      title: 'Number',
      dataIndex: 'rank',
      key: 'rank',
      render: (text: any, record: any, index: any) => {
        return index + 1;
      },
    },
    {
      title: 'Revenue',
      dataIndex: 'revenue',
      key: 'revenue',
      // sorter: (a: objectT, b: objectT) => {},
      // sortDirections: ['descend'],
      render: (text: any, record: any, index: any) => {
        return `${text} USDT`;
      },
    },
    {
      title: 'Time',
      dataIndex: 'time',
      key: 'time',
    },
    {
      title: 'Categoty',
      dataIndex: 'categoty',
      key: 'categoty',
    },
    {
      title: 'Form',
      dataIndex: 'form',
      key: 'form',
    },
  ];
  const data = [
    {
      revenue: '18.5',
      time: '2022/2/11 21:32:12',
      categoty: 'Staking',
      form: 'Metaone',
    },
    {
      revenue: '13',
      time: '2022/2/27 22:22:45',
      categoty: 'Staking',
      form: 'Metaone',
    },
    {
      revenue: '7.2',
      time: '2022/1/7 20:13:45',
      categoty: 'Game earnings',
      form: 'Big Time',
    },
    {
      revenue: '18.9',
      time: '	2022/2/16 15:47:11',
      categoty: 'Game earnings',
      form: 'Big Time',
    },
    {
      revenue: '18.62',
      time: '2022/2/9 13:06:31',
      categoty: 'Staking',
      form: 'Metaone',
    },
    {
      revenue: '1.46',
      time: '2022/2/30 20:20:36',
      categoty: 'NFT',
      form: 'Age of tank',
    },
    {
      revenue: '10',
      time: '2022/3/6 21:26:25',
      categoty: 'Metaone sharing',
      form: 'Metaone',
    },
    {
      revenue: '4.76',
      time: '2022/2/5 02:32:33',
      categoty: 'Metaone sharing',
      form: 'Metaone',
    },
    {
      revenue: '16.78',
      time: '2022/3/31 21:19:42',
      categoty: 'Metaone sharing',
      form: 'Metaone',
    },
    {
      revenue: '20',
      time: '2022/3/1 21:36:20',
      categoty: 'Metaone sharing',
      form: 'Metaone',
    },
    {
      revenue: '14.9',
      time: '2022/2/14 22:05:29',
      categoty: 'Game earnings',
      form: 'Age of tank',
    },
  ];

  return (
    <>
      <Link to="/personal/info" className={styles['back']}>
        {'< '}
        {intl.formatMessage({
          id: 'PERSONAL_BACK',
        })}
      </Link>
      <div className={styles['game-info']}>
        <ul className={styles['game-data']}>
          <li className="clearfix">
            <span className={styles['title']}>NFT revenue</span>
            <span className={styles['data']}>
              <i className={styles['num']}>776.52</i>
              <i className={styles['name']}>USDT</i>
            </span>
          </li>
          <li className="clearfix">
            <span className={styles['title']}>Game earnings</span>
            <span className={styles['data']}>
              <i className={styles['num']}>423.45</i>
              <i className={styles['name']}>USDT</i>
            </span>
          </li>
          <li className="clearfix">
            <span className={styles['title']}>MetaOne sharing</span>
            <span className={styles['data']}>
              <i className={styles['num']}>123.45</i>
              <i className={styles['name']}>USDT</i>
            </span>
          </li>
          <li className="clearfix">
            <span className={styles['title']}>Staking</span>
            <span className={styles['data']}>
              <i className={styles['num']}>12</i>
              <i className={styles['name']}>USDT</i>
            </span>
          </li>
        </ul>
        <div className={styles['game-list']}>
          <div className={styles['header']}>
            <h6 className={styles['title']}>Yield sources</h6>
            <Select
              defaultValue="ALL"
              style={{ width: 120 }}
              onChange={handleSelectChange}
            >
              <Option value="ALL">ALL</Option>
              <Option value="NFT">NFT</Option>
              <Option value="Metaone sharing">Metaone sharing</Option>
              <Option value="Game earnings">Game earnings</Option>
              <Option value="Staking">Staking</Option>
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
export default Revenue;
