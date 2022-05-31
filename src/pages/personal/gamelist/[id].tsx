import styles from './index.scss';
import { connect } from 'dva';
import { useIntl, Link, history } from 'umi';
import { useEffect, useState } from 'react';
import { Tabs, Table } from 'antd';

interface objectT {
  [propName: string]: any;
}
const TableList = () => {
  const { TabPane } = Tabs;
  const intl = useIntl();
  const listDatas: readonly any[] | undefined = [];
  const columns = [
    {
      title: 'Rank',
      render: (text: any, record: any, index: any) => {
        return index + 1;
      },
    },
    {
      title: 'Player',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Total Yield',
      dataIndex: 'total',
      key: 'total',
      render: () => {
        return '0 USDT';
      },
    },
    {
      title: 'Hours Played',
      dataIndex: 'hours',
      key: 'hours',
      render: () => {
        return '0 h';
      },
    },
    {
      title: 'Last Week Yield',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Last Week Hours Played',
      dataIndex: 'date2',
      key: 'date2',
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
      title: 'Player',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Total Yield',
      dataIndex: 'Total Yield',
      key: 'DTotal Total Yield',
      render: () => {
        return '0';
      },
    },
    {
      title: 'Hours Played',
      dataIndex: 'Tranding Volume',
      key: 'Tranding Volume',
      render: () => {
        return '0 USDT';
      },
    },
    {
      title: 'Last Week Yield',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Last Week Hours Played',
      dataIndex: 'date2',
      key: 'date2',
    },
  ];
  const tabClick = () => {};
  return (
    <div className={styles['game-list']}>
      <Tabs defaultActiveKey="1" onChange={tabClick}>
        <TabPane tab={'Guild'} key="1">
          <Table
            columns={columns}
            rowKey={'id'}
            dataSource={listDatas}
            pagination={{ position: ['bottomCenter'] }}
          />
        </TabPane>
        <TabPane tab={'Metaone'} key="2">
          <Table
            rowKey={'id'}
            columns={columns2}
            dataSource={listDatas}
            pagination={{ position: ['bottomCenter'] }}
          />
        </TabPane>
      </Tabs>
    </div>
  );
};
const Detail = (props: objectT) => {
  const {
    location = {},
    dispatch,
    gamefi = {},
    match = {},
    login: {
      userInfo: { roles },
    },
  } = props;
  const intl = useIntl();
  const [loading, setLoading] = useState(true as boolean);
  const [gameDatas, setGameDatas] = useState({} as objectT);
  const { params = {} } = match;
  const [role, setRole] = useState('GAMERS');
  const goBack = () => {
    history.goBack();
  };
  const list = useEffect(() => {
    // setLoading(true);
    // roles && setRole(roles[0].code);

    dispatch({
      type: 'gamefi/getData',
      payload: {
        id: params.id,
      },
    }).then((res: objectT) => {
      const { code, data } = res;
      if (code === 0) {
        setGameDatas(data);
      }
      setLoading(false);
    });
  }, [params.id]);
  return (
    <>
      <div className={styles['back']} onClick={goBack}>
        {'< BACK'}
      </div>
      <div className={styles['game-info']}>
        <ul className={styles['nft-info']}>
          <li className={styles['img']}>
            <img src={gameDatas?.gameInfo?.gameCover}></img>
          </li>
          <li className={styles['nft-info-con']}>
            <dl>
              <dt>{gameDatas.name}</dt>
              <dd>
                <ul>
                  <li>Chain:</li>
                  <li>Gaming Strategy: </li>
                  <li>Website:</li>
                  <li>Genre:</li>
                  <li>Date:</li>
                </ul>
              </dd>
              <dd className={styles['des']}>{gameDatas.description}</dd>
              <dd className={styles['button']}>
                <a href={gameDatas.gameHomePage} target="_blank">
                  {intl.formatMessage({
                    id: 'PERSONAL_GAMEINFO_PLAY',
                  })}
                </a>
              </dd>
            </dl>
          </li>
        </ul>
        <ul className={styles['game-data']}>
          <li className="clearfix">
            <span className={styles['title']}>
              {intl.formatMessage({
                id: 'PERSONAL_GAMEINFO_DATA1',
              })}
            </span>
            <span className={styles['data']}>
              <i className={styles['num']}>0</i>
              <i className={styles['name']}>USDT</i>
              <i className={styles['status']}>0%</i>
            </span>
          </li>
          <li className="clearfix">
            <span className={styles['title']}>
              {intl.formatMessage({
                id: 'PERSONAL_GAMEINFO_DATA2',
              })}
            </span>
            <span className={styles['data']}>
              <i className={styles['num']}>0</i>
              <i className={styles['name']}>h</i>
            </span>
          </li>
          {role == 'GAMERS' ? (
            ''
          ) : (
            <>
              <li className="clearfix">
                <span className={styles['title']}>
                  {intl.formatMessage({
                    id: 'PERSONAL_GAMEINFO_DATA3',
                  })}
                </span>
                <span className={styles['data']}>
                  <i className={styles['num']}>0</i>
                  <i className={styles['status']}>0%</i>
                </span>
              </li>
              <li className="clearfix">
                <span className={styles['title']}>
                  {intl.formatMessage({
                    id: 'PERSONAL_GAMEINFO_DATA4',
                  })}
                </span>
                <span className={styles['data']}>
                  <i className={styles['num']}>0</i>
                  <i className={styles['status']}>0%</i>
                </span>
              </li>
            </>
          )}
        </ul>
        {role == 'GAMERS' ? <></> : <TableList />}
      </div>
    </>
  );
};
export default connect(
  ({ gamefi, login }: { gamefi: objectT; login: objectT }) => ({
    gamefi,
    login,
  }),
)(Detail);
