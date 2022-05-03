import styles from './index.scss';
import { useIntl, Link } from 'umi';
import { Tabs, Table, Tag, Space } from 'antd';

const gameInfo = () => {
  const intl = useIntl();

  const { TabPane } = Tabs;
  function tabClick(key) {
    console.log(key);
  }

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
      <Link to="/" className={styles['back']}>
        {'< '}
        {intl.formatMessage({
          id: 'PERSONAL_GAMEINFO_BACK',
        })}
      </Link>
      <div className={styles['game-info']}>
        <ul className={styles['nft-info']}>
          <li className={styles['img']}>
            <img src="http://dummyimage.com/431x207"></img>
          </li>
          <li className={styles['nft-info-con']}>
            <dl>
              <dt>NFT Info</dt>
              <dd>
                <ul>
                  <li>Chain:BSC</li>
                  <li>Gaming Strategy:click here </li>
                  <li>Website:click here</li>
                  <li>Genre:io</li>
                  <li>Date:2022/1/402:12:16</li>
                </ul>
              </dd>
              <dd className={styles['des']}>
                Jump into Earth Zero,where you will mine resources,build your
                NFTtanks and defend your territory against thousands of other
                rival players.Battle it out in thrilling military conflicts and
                spectacular locales alongside your allies to conauer the
                Metaverse.A uniaue mix of strateay and action with stunnina
                araphics awaits!
              </dd>
              <dd className={styles['button']}>
                <a href="###">
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
              <i className={styles['name']}>h</i>
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
              Content of Tab Pane 2
            </TabPane>
          </Tabs>
        </div>
      </div>
    </>
  );
};
export default gameInfo;
