import { Link } from 'umi';
import styles from './index.scss';
import { useIntl } from 'umi';
import { Button, message, Radio, Tabs, Select, Image } from 'antd';
import { useState, useEffect } from 'react';
import { Pie } from '@ant-design/plots';
import { Line } from '@ant-design/plots';
import { history } from 'umi';
import { connect } from 'dva';
import copy from 'copy-to-clipboard';
const { TabPane } = Tabs;
const { Option } = Select;
import Loading from '@/components/Loading';
interface objectT {
  [propName: string]: any;
}
const myInfo = (props: objectT) => {
  const {
    dispatch,
    login: {
      userInfo: { roles },
    },
  } = props;
  const [loading, setLoading] = useState<boolean>(true);
  const [role, setRole] = useState('GAMERS');
  const [radioValue, setRadioValue] = useState('large' as string);
  const [lineData, setLineData] = useState([]);
  const [listDatas, setListDatas] = useState<objectT>({});
  const [backTitle, setTitle] = useState('');
  const [guildInfo, setGuildInfo] = useState<objectT>({});

  const toDetail = (id: string) => {
    history.push(`/personal/gamelist/${id}`);
  };
  const toPalyGame = (link: string, e: any) => {
    //
    e.stopPropagation();
    window.open(link);
    return false;
  };
  const random = (Arr: []) => {
    const arrNew: never[] = [];
    for (let i = 0; i < 3; i++) {
      var _num = Math.floor(Math.random() * Arr.length);
      var mm = Arr[_num];
      Arr.splice(_num, 1);
      arrNew.push(mm);
    }
    return arrNew;
  };

  const asyncFetch = () => {
    fetch(
      'https://gw.alipayobjects.com/os/bmw-prod/e00d52f4-2fa6-47ee-a0d7-105dd95bde20.json',
    )
      .then((response) => response.json())
      .then((json) => setLineData(json))
      .catch((error) => {
        console.log('fetch data failed', error);
      });
  };

  const intl = useIntl();
  const handleChange = () => {};
  const toPage = () => {
    history.push(`/personal/info/revenue`);
  };
  const lineConfig = {
    data: lineData,
    xField: 'year',
    yField: 'gdp',
    seriesField: 'name',
    yAxis: {
      label: {
        formatter: (v: number) => `${(v / 10e8).toFixed(1)} B`,
      },
    },
    legend: {
      position: 'top',
    },
    smooth: true,
    // @TODO 后续会换一种动画方式
    animation: {
      appear: {
        animation: 'path-in',
        duration: 5000,
      },
    },
  };
  const data = [
    {
      type: '分类一',
      value: 27,
    },
    {
      type: '分类二',
      value: 25,
    },
    {
      type: '分类三',
      value: 18,
    },
    {
      type: '分类四',
      value: 15,
    },
    {
      type: '分类五',
      value: 10,
    },
    {
      type: '其他',
      value: 5,
    },
  ];
  const config = {
    appendPadding: 10,
    data,
    angleField: 'value',
    colorField: 'type',
    radius: 0.8,
    label: {
      type: 'outer',
      content: '{name} {percentage}',
    },
    interactions: [
      {
        type: 'pie-legend-active',
      },
      {
        type: 'element-active',
      },
    ],
  };
  useEffect(() => {
    asyncFetch();
    dispatch({
      type: 'gamefi/getList',
      payload: {
        data: {
          pageNum: 1,
          pageSize: 10,
        },
      },
    }).then((res: objectT) => {
      const { data } = res;
      const list = data.length > 3 ? random(data) : data;
      setListDatas({ data: list });
      setLoading(false);
    });
  }, []);
  useEffect(() => {
    if (roles) {
      setRole(roles[0].code);
      switch (roles[0].code) {
        case 'GAMERS':
          setTitle('MY INFOMATION');
          break;
        case 'NFTS_OWNER':
          setTitle('OWNER INFOMATION');
          break;
        case 'GUILD':
          setTitle('GUILD INFOMATION');
          dispatch({
            type: 'guilds/getGuildRoleInfo',
          }).then((res: objectT) => {
            setGuildInfo(res.data);
          });
          break;
      }
    }
  }, [roles]);
  const copyMsg = (msg: any, tip: string) => {
    copy(msg);
    message.info(tip);
  };
  const header = () => {
    if (role == 'GUILD') {
      const code = guildInfo.invitationCode;
      const link = window.location.origin + guildInfo.invitationCodeLink;
      return (
        <div className={styles['box']}>
          <p className={styles['txt-item']}>
            <span>Guild invitation code:</span>
            <span className={styles['link']}> {code}</span>
            <span
              className={styles['copy']}
              onClick={() => {
                copyMsg(code, 'Invitation code copied to clipboard');
              }}
            >
              {intl.formatMessage({
                id: 'PERSONAL_GUILD_COPY',
              })}
            </span>
          </p>
          <p className={styles['txt-item']}>
            <span>Guild invitation link:</span>
            <span className={styles['link']}>{link}</span>
            <span
              className={styles['copy']}
              onClick={() => {
                copyMsg(link, 'Invitation link copied to clipboard');
              }}
            >
              {intl.formatMessage({
                id: 'PERSONAL_GUILD_COPY1',
              })}
            </span>
          </p>
        </div>
      );
    }
  };
  const navList = () => {
    if (role == 'GAMERS') {
      return (
        <div className={styles['box']}>
          <ul className={styles['ico-list']}>
            <li
              className={`${styles['ico-item']} ${styles['ico-item1']}  ${styles['cursor']}`}
              onClick={toPage}
            >
              <p className={styles['txt']}>Recent Game Played </p>
              <p className={styles['txt1']}>
                <strong>USDT 0</strong>
              </p>
            </li>
            <li className={`${styles['ico-item']} ${styles['ico-item4']}`}>
              <p className={styles['txt']}>Last Login</p>
              <p className={styles['txt1']}>
                <strong>Feb 3, 2022</strong>
              </p>
            </li>
          </ul>
        </div>
      );
    } else if (role == 'GUILD') {
      return (
        <>
          <div className={styles['box']}>
            <p className={styles['txt-wallet']}>
              <span>
                {intl.formatMessage({
                  id: 'PERSONAL_GUILD_TXT3',
                })}
              </span>
              <Link to={`/personal/info`} className={styles['view']}>
                {intl.formatMessage({
                  id: 'PERSONAL_GUILD_VIEW',
                })}
              </Link>
            </p>
          </div>
          <div className={styles['box']}>
            <ul className={styles['ico-list']}>
              <li className={`${styles['ico-item']} ${styles['ico-item1']}`}>
                <p className={styles['txt']}>
                  {intl.formatMessage({
                    id: 'PERSONAL_GUILD_TXT4',
                  })}
                </p>
                <p className={styles['txt1']}>
                  <strong>87</strong>
                </p>
              </li>
              <li
                className={`${styles['ico-item']} ${styles['ico-item2']}  ${styles['cursor']}`}
                onClick={toPage}
              >
                <p className={styles['txt']}>
                  {intl.formatMessage({
                    id: 'PERSONAL_GUILD_TXT5',
                  })}
                </p>
                <p className={styles['txt1']}>
                  <strong>2866.29</strong>
                </p>
              </li>
              <li className={`${styles['ico-item']} ${styles['ico-item3']}`}>
                <p className={styles['txt']}>
                  {intl.formatMessage({
                    id: 'PERSONAL_GUILD_TXT6',
                  })}
                </p>
                <p className={styles['txt1']}>
                  <strong>NO.15</strong>
                </p>
              </li>
              <li className={`${styles['ico-item']} ${styles['ico-item4']}`}>
                <p className={styles['txt']}>
                  {intl.formatMessage({
                    id: 'PERSONAL_GUILD_TXT7',
                  })}
                </p>
                <p className={styles['txt1']}>
                  <strong>0</strong>
                </p>
              </li>
            </ul>
          </div>
        </>
      );
    } else if (role == 'NFTS_OWNER') {
      return (
        <div className={styles['box']}>
          <ul className={styles['ico-list']}>
            <li
              onClick={toPage}
              className={`${styles['ico-item']} ${styles['ico-item2']}  ${styles['cursor']}`}
            >
              <p className={styles['txt']}>
                {intl.formatMessage({
                  id: 'PERSONAL_GUILD_TXT5',
                })}
              </p>
              <p className={styles['txt1']}>
                <strong>2866.29</strong>
              </p>
            </li>
            <li className={`${styles['ico-item']} ${styles['ico-item1']}`}>
              <p className={styles['txt']}>My NTFS </p>
              <p className={styles['txt1']}>
                <strong>123</strong>
              </p>
            </li>
            <li className={`${styles['ico-item']} ${styles['ico-item4']}`}>
              <p className={styles['txt']}>My Wallets</p>
              <p className={styles['txt1']}>
                <strong>0</strong>
              </p>
            </li>
          </ul>
        </div>
      );
    }
  };

  const list = listDatas?.data?.map((item: objectT) => {
    return (
      <div
        className={styles['item']}
        key={item.id}
        onClick={() => {
          toDetail(item.id);
        }}
      >
        <div className={styles['img']}>
          <Image
            preview={false}
            src={item?.gameCover}
            fallback="data:image/png;base64,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"
          />
        </div>
        <div className={styles['text']}>
          <h6 className={styles['name']}>{item.name}</h6>
          <p>
            <label>last yield</label> <b>0 USDT</b>
          </p>
          <p>
            <label>last game duration</label> <b>0 h</b>
          </p>
          <Button type="primary">
            <a
              onClick={(e) => {
                toPalyGame(item.gameHomePage, e);
              }}
            >
              {intl.formatMessage({
                id: 'PERSONAL_GAMEINFO_PLAY',
              })}
            </a>
          </Button>
        </div>
      </div>
    );
  });
  return (
    <>
      <Link to="/" className={styles['back']}>
        {`< ${backTitle}`}
      </Link>
      <div className={styles['main']}>
        {header()}
        {navList()}
        {role == 'GAMERS' ? (
          <>
            <header className={styles['list-header']}>
              Recent Game Played
            </header>
            <div className={styles['list-wrap']}>
              {loading ? <Loading /> : listDatas.data?.length > 0 ? list : ''}
            </div>
          </>
        ) : (
          ''
        )}
        <div className={styles['chart-box']}>
          <div className={`${styles['box']} ${styles['box1']}`}>
            <h6 className={styles['title']}>
              {intl.formatMessage({
                id: 'PERSONAL_GUILD_TXT8',
              })}
            </h6>
            <Pie {...config} />
          </div>
          <div className={`${styles['box']} ${styles['box2']}`}>
            <h6 className={styles['title']}>
              {intl.formatMessage({
                id: 'PERSONAL_GUILD_TXT9',
              })}
            </h6>
            <Select
              defaultValue="lucy"
              style={{ width: 120 }}
              onChange={handleChange}
              className={styles['line-select']}
            >
              <Option value="jack">Jack</Option>
              <Option value="lucy">Lucy</Option>
            </Select>
            <Line {...lineConfig} />
          </div>
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
)(myInfo);
