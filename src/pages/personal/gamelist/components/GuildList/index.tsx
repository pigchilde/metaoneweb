import styles from './index.scss';
import { useIntl } from 'umi';
import { Tabs, Table } from 'antd';

const GuildList = () => {
  const intl = useIntl();
  const { TabPane } = Tabs;
  const tabClick = () => {};
  const columns = [
    {
      title: 'Rank',
      dataIndex: 'rank',
      key: 'rank',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Total Yield(USDT)',
      dataIndex: 'total',
      key: 'total',
    },
    {
      title: 'Hours Played(h)',
      dataIndex: 'hours',
      key: 'hours',
    },
    {
      title: 'Released Date',
      dataIndex: 'date',
      key: 'date',
    },
  ];
  const data = [
    {
      rank: '1',
      name: 'AAAA',
      total: '502.15',
      hours: '5482',
      date: '5482',
    },
    {
      rank: '2',
      name: 'AAAA',
      total: '502.15',
      hours: '5482',
      date: '5482',
    },
  ];
  return (
    <div className={styles['game-list']}>
      <Tabs defaultActiveKey="1" onChange={tabClick}>
        <TabPane
          tab={intl.formatMessage({
            id: 'PERSONAL_GAMEINFO_TAB1',
          })}
          key="1"
        >
          <Table
            columns={columns}
            dataSource={data}
            pagination={{ position: ['bottomCenter'] }}
          />
        </TabPane>
        <TabPane
          tab={intl.formatMessage({
            id: 'PERSONAL_GAMEINFO_TAB2',
          })}
          key="2"
        >
          <Table
            columns={columns}
            dataSource={data}
            pagination={{ position: ['bottomCenter'] }}
          />
        </TabPane>
      </Tabs>
    </div>
  );
};
export default GuildList;
