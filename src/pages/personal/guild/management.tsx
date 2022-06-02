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
        id: 'PERSONAL_MANAGE_TABLE1',
      }),
      dataIndex: 'rank',
      key: 'rank',
    },
    {
      title: intl.formatMessage({
        id: 'PERSONAL_MANAGE_TITLE2',
      }),
      dataIndex: 'gamer',
      key: 'gamer',
    },
    {
      title: intl.formatMessage({
        id: 'PERSONAL_MANAGE_TITL3',
      }),
      dataIndex: 'earnings',
      key: 'earnings',
    },
    {
      title: intl.formatMessage({
        id: 'PERSONAL_MANAGE_TITLE4',
      }),
      dataIndex: 'hours_played',
      key: 'hours_played',
    },
    {
      title: intl.formatMessage({
        id: 'PERSONAL_MANAGE_TITLE5',
      }),
      dataIndex: 'hours_played1',
      key: 'hours_played1',
    },
    {
      title: intl.formatMessage({
        id: 'PERSONAL_MANAGE_TITLE6',
      }),
      dataIndex: 'hours_played2',
      key: 'hours_played2',
    },
    {
      title: intl.formatMessage({
        id: 'PERSONAL_MANAGE_TITLE7',
      }),
      dataIndex: 'hours_played3',
      key: 'hours_played3',
    },
    {
      title: intl.formatMessage({
        id: 'PERSONAL_MANAGE_TITLE8',
      }),
      dataIndex: 'hours_played4',
      key: 'hours_played4',
    },
  ];
  const data = [
    {
      rank: '1',
      gamer: 'Mary Lopes',
      earnings: '282.4',
      hours_played: '15',
      hours_played2: 'j.nwul@tbogqopd.kg',
      hours_played3: 'online',
      hours_played4: 'Feb 16,2022',
    },
    {
      rank: '2',
      gamer: 'George Lee',
      earnings: '275.3',
      hours_played: '20',
      hours_played2: 'h.gphnkvunx@snihg.gy',
      hours_played3: 'online',
      hours_played4: 'Mar 02,2022',
    },
    {
      rank: '3',
      gamer: 'Karen Jackson',
      earnings: '273.1',
      hours_played: '23',
      hours_played2: 'p.engph@gstmaoqk.ki',
      hours_played3: 'in-game',
      hours_played4: 'Jan 31,2022',
    },
  ];

  return (
    <>
      <span className={styles['back']}>
        {'< '}
        {intl.formatMessage({
          id: 'PSIDER_GUILD_INFO',
        })}
      </span>
      <div className={styles['game-info']}>
        <ul className={styles['game-data']}>
          <li className="clearfix">
            <span className={styles['title']}>
              {intl.formatMessage({
                id: 'PERSONAL_GAMEINFO_DATA3',
              })}
            </span>
            <span className={styles['data']}>
              <i className={styles['num']}>2</i>
              <i className={styles['status']}>↓1</i>
            </span>
          </li>
          <li className="clearfix">
            <span className={styles['title']}>
              {intl.formatMessage({
                id: 'PERSONAL_GAMEINFO_DATA5',
              })}
            </span>
            <span className={styles['data']}>
              <i className={styles['num']}>3</i>
              <i className={styles['status']}>↓1</i>
            </span>
          </li>
          <li className="clearfix">
            <span className={styles['title']}>
              {intl.formatMessage({
                id: 'PERSONAL_GAMEINFO_DATA6',
              })}
            </span>
            <span className={styles['data']}>
              <i className={styles['num']}>JKHGu7567J</i>
            </span>
          </li>
        </ul>
        <div className={styles['game-list']}>
          <div className={styles['header']}>
            <h6 className={styles['title']}>
              {intl.formatMessage({
                id: 'PERSONAL_MANAGE_TITLE',
              })}
            </h6>
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
