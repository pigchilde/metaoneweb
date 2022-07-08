import styles from './yield.scss';
import { useIntl, Link } from 'umi';
import { Tabs, Table, Tag, Select } from 'antd';
import { useEffect, useState } from 'react';
import { connect } from 'dva';
const { Option } = Select;

interface objectT {
  [propName: string]: any;
}
const Management = (props: objectT) => {
  const {
    dispatch,
    login: {
      userInfo: { roles },
    },
  } = props;
  const [guildInfo, setGuildInfo] = useState<objectT>({});
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
      gamer: 'kuku',
      earnings: '381.6',
      hours_played: '47',
      hours_played1: 'moxis@slai.uu.me',
      hours_played2: 'Player',
      hours_played3: '2022.02.17',
      hours_played4: 'Online',
    },
    {
      rank: '2',
      gamer: 'shasha',
      earnings: '365.7',
      hours_played: '45',
      hours_played1: 'shasha18@slai.uu.me',
      hours_played2: 'Player',
      hours_played3: '2022.02.17',
      hours_played4: 'Online',
    },

    {
      rank: '3',
      gamer: 'xun',
      earnings: '297',
      hours_played: '37',
      hours_played1: '536dhxun1@slai.uu.me',
      hours_played2: 'Player',
      hours_played3: '2022.02.18',
      hours_played4: 'Online',
    },
    {
      rank: '4',
      gamer: 'qiqi',
      earnings: '289.9',
      hours_played: '36',
      hours_played1: 'qiqi626@slai.uu.me',
      hours_played2: 'Player',
      hours_played3: '2022.02.18',
      hours_played4: 'in-game',
    },
    {
      rank: '5',
      gamer: 'ddudprlq2180',
      earnings: '276.1',
      hours_played: '34',
      hours_played1: 'ddudprlq2180@5133game.com',
      hours_played2: 'Player',
      hours_played3: '2022.04.10',
      hours_played4: 'Online',
    },
    {
      rank: '6',
      gamer: 'kffejub7120',
      earnings: '253.2',
      hours_played: '31',
      hours_played1: 'kffejub7120@5133game.com',
      hours_played2: 'Player',
      hours_played3: '2022.04.10',
      hours_played4: 'in-game',
    },
    {
      rank: '7',
      gamer: 'disc',
      earnings: '252.9',
      hours_played: '31',
      hours_played1: 'disc@md123.uu.me',
      hours_played2: 'Player',
      hours_played3: '2022.02.22',
      hours_played4: 'in-game',
    },
    {
      rank: '8',
      gamer: 'tiantian',
      earnings: '231.7',
      hours_played: '28',
      hours_played1: 'tiantian@slai.uu.me',
      hours_played2: 'Player',
      hours_played3: '2022.02.17',
      hours_played4: 'Online',
    },
    {
      rank: '9',
      gamer: 'liuchao',
      earnings: '219.4',
      hours_played: '27',
      hours_played1: 'liuchao389@slai.uu.me',
      hours_played2: 'Player',
      hours_played3: '2022.02.18',
      hours_played4: 'Online',
    },
    {
      rank: '10',
      gamer: 'txc',
      earnings: '218.5',
      hours_played: '27',
      hours_played1: '284810097@qq.com',
      hours_played2: 'Player',
      hours_played3: '2022.05.04',
      hours_played4: 'in-game',
    },
  ];

  useEffect(() => {
    dispatch({
      type: 'guilds/getGuildRoleInfo',
    }).then((res: objectT) => {
      setGuildInfo(res.data);
    });
  }, []);
  return (
    <>
      <span className={styles['back']}>
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
              <i className={styles['num']}>{guildInfo?.invitationCode}</i>
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
export default connect(
  ({
    gamefi,
    guilds,
    login,
  }: {
    gamefi: objectT;
    guilds: objectT;
    login: objectT;
  }) => ({
    gamefi,
    guilds,
    login,
  }),
)(Management);
