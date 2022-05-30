import styles from './index.scss';
import { useState, useEffect } from 'react';
import { connect } from 'dva';
import { useIntl, history } from 'umi';
import { Tabs, Table } from 'antd';
interface objectT {
  [propName: string]: any;
}
const GuildList = (props: objectT) => {
  const intl = useIntl();
  const { dispatch, gamefi = {} } = props;
  const [listDatas, setListDatas] = useState([]);

  const { TabPane } = Tabs;
  const tabClick = () => {};

  const columns = [
    {
      title: 'Rank',
      render: (text: any, record: any, index: any) => {
        return index + 1;
      },
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
      render: () => {
        return '0 USDT';
      },
    },
    {
      title: 'Hours Played(h)',
      dataIndex: 'hours',
      key: 'hours',
      render: () => {
        return '0 h';
      },
    },
    {
      title: 'Released Date',
      dataIndex: 'date',
      key: 'date',
    },
  ];
  const columns2 = [
    {
      title: 'Rank',
      render: (text: any, record: any, index: any) => {
        return index + 1;
      },
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'DAU',
      dataIndex: 'DAU',
      key: 'DAU',
      render: () => {
        return '0';
      },
    },
    {
      title: 'Tranding Volume',
      dataIndex: 'Tranding Volume',
      key: 'Tranding Volume',
      render: () => {
        return '0 USDT';
      },
    },
    {
      title: 'Yestoday revunue',
      dataIndex: 'date',
      key: 'date',
      render: () => {
        return '0 USDT';
      },
    },
  ];
  const [params, setParams] = useState<objectT>({
    pageNum: 1,
    pageSize: 100,
  });
  const toDetail = (record: any) => {
    history.push(`/personal/gamelist/${record.id}`);
  };
  useEffect(() => {
    dispatch({
      type: 'gamefi/getList',
      payload: {
        data: params,
      },
    }).then((res: objectT) => {
      const { data } = res;
      setListDatas(data);
    });
  }, []);
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
            rowKey={'id'}
            onRow={(record) => {
              return {
                onClick: () => {
                  toDetail(record);
                }, // 点击行
              };
            }}
            dataSource={listDatas}
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
            rowKey={'id'}
            onRow={(record) => {
              return {
                onClick: () => {
                  toDetail(record);
                }, // 点击行
              };
            }}
            columns={columns2}
            dataSource={listDatas}
            pagination={{ position: ['bottomCenter'] }}
          />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default connect(({ gamefi }: { gamefi: objectT }) => ({
  gamefi,
}))(GuildList);
