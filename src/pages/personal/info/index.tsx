import { Link } from 'umi';
import styles from './index.scss';
import { useIntl } from 'umi';
import { Button, message, Radio, Tabs, Select, Image } from 'antd';
import { useState, useEffect } from 'react';
import { Pie, G2 } from '@ant-design/plots';
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
  const [selectType, setSelectType] = useState('Yield');

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
    const arrNew: [] = [];

    for (let i = 0; i < Arr.length; i++) {
      let obj = Arr[i];
      let isPush = false;
      if (obj?.name == 'Age of Tanks') {
        obj.hours = 0;
        obj.ustd = 0;
        isPush = true;
      } else if (obj?.name == 'The Killbox') {
        obj.hours = 0;
        obj.ustd = 0;
        isPush = true;
      } else if (obj?.name == 'Zombie World Z') {
        obj.hours = 252.9;
        obj.ustd = 31;
        isPush = true;
      }
      isPush ? arrNew.push(obj) : null;
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
  const handleChange = (value: any) => {
    setSelectType(value);
  };
  const toPage = () => {
    history.push(`/personal/info/revenue`);
  };
  const { registerTheme } = G2;
  registerTheme('custom-theme', {
    components: {
      legend: {
        common: {
          itemName: {
            style: {
              fill: '#9e9e9e',
            },
          },
        },
      },
    },
  });
  const lineConfig = {
    data: lineData,
    xField: 'year',
    seriesField: 'name',
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
    theme: 'custom-theme',
  };
  const lineConfigYeild = {
    ...lineConfig,
    yField: 'gdp',
    yAxis: {
      label: {
        formatter: (v: number) => `${v} U`,
        style: {
          fill: '#9e9e9e',
        },
      },
    },
  };
  const lineConfigDuration = {
    ...lineConfig,
    yField: 'hours',
    yAxis: {
      label: {
        formatter: (v: number) => `${v} H`,
        style: {
          fill: '#9e9e9e',
        },
      },
    },
  };
  const ldata = [
    {
      name: 'The Killbox',
      year: '1',
      gdp: 105.2,
      hours: 320,
    },
    {
      name: 'The Killbox',
      year: '2',
      gdp: 165.3,
      hours: 420,
    },
    {
      name: 'The Killbox',
      year: '3',
      gdp: 201.5,
      hours: 510,
    },
    {
      name: 'The Killbox',
      year: '4',
      gdp: 262.6,
      hours: 620,
    },
    {
      name: 'The Killbox',
      year: '5',
      gdp: 353.2,
      hours: 770,
    },
    {
      name: 'The Killbox',
      year: '6',
      gdp: 380.5,
      hours: 880,
    },
    {
      name: 'The Killbox',
      year: '7',
      gdp: 355.1,
      hours: 990,
    },

    {
      name: 'Age of Tanks',
      year: '1',
      gdp: 100.3,
      hours: 201,
    },
    {
      name: 'Age of Tanks',
      year: '2',
      gdp: 200.3,
      hours: 420,
    },
    {
      name: 'Age of Tanks',
      year: '3',
      gdp: 240.0,
      hours: 540,
    },
    {
      name: 'Age of Tanks',
      year: '4',
      gdp: 300.0,
      hours: 660,
    },
    {
      name: 'Age of Tanks',
      year: '5',
      gdp: 350.3,
      hours: 720,
    },
    {
      name: 'Age of Tanks',
      year: '6',
      gdp: 360.3,
      hours: 810,
    },
    {
      name: 'Age of Tanks',
      year: '7',
      gdp: 380.5,
      hours: 940,
    },

    {
      name: 'Zombie World Z',
      year: '1',
      gdp: 78.5,
      hours: 440,
    },
    {
      name: 'Zombie World Z',
      year: '2',
      gdp: 149.1,
      hours: 520,
    },
    {
      name: 'Zombie World Z',
      year: '3',
      gdp: 163.3,
      hours: 630,
    },
    {
      name: 'Zombie World Z',
      year: '4',
      gdp: 205.2,
      hours: 870,
    },
    {
      name: 'Zombie World Z',
      year: '5',
      gdp: 241.2,
      hours: 930,
    },
    {
      name: 'Zombie World Z',
      year: '6',
      gdp: 253.0,
      hours: 1150,
    },
    {
      name: 'Zombie World Z',
      year: '7',
      gdp: 371.2,
      hours: 1200,
    },

    {
      name: 'RaceFi',
      year: '1',
      gdp: 59.9,
      hours: 200,
    },
    {
      name: 'RaceFi',
      year: '2',
      gdp: 106.5,
      hours: 500,
    },
    {
      name: 'RaceFi',
      year: '3',
      gdp: 245.8,
      hours: 610,
    },
    {
      name: 'RaceFi',
      year: '4',
      gdp: 324.7,
      hours: 750,
    },
    {
      name: 'RaceFi',
      year: '5',
      gdp: 342.8,
      hours: 820,
    },
    {
      name: 'RaceFi',
      year: '6',
      gdp: 372.3,
      hours: 1040,
    },
    {
      name: 'RaceFi',
      year: '7',
      gdp: 378.7,
      hours: 1100,
    },

    {
      name: 'SolChicks',
      year: '1',
      gdp: 44.8,
      hours: 330,
    },
    {
      name: 'SolChicks',
      year: '2',
      gdp: 142.7,
      hours: 450,
    },
    {
      name: 'SolChicks',
      year: '3',
      gdp: 169.7,
      hours: 650,
    },
    {
      name: 'SolChicks',
      year: '4',
      gdp: 222.8,
      hours: 850,
    },
    {
      name: 'SolChicks',
      year: '5',
      gdp: 262.1,
      hours: 950,
    },
    {
      name: 'SolChicks',
      year: '6',
      gdp: 312.1,
      hours: 1100,
    },
    {
      name: 'SolChicks',
      year: '7',
      gdp: 370.4,
      hours: 1150,
    },
  ];

  const data = [
    {
      type: 'The Killbox',
      value: 27,
    },
    {
      type: 'Age of Tanks',
      value: 25,
    },
    {
      type: 'Zombie World Z',
      value: 18,
    },
    {
      type: 'RaceFi',
      value: 15,
    },
    {
      type: 'SolChicks',
      value: 10,
    },
    {
      type: 'Other',
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
      style: {
        fill: '#9e9e9e',
      },
    },
    interactions: [
      {
        type: 'pie-legend-active',
      },
      {
        type: 'element-active',
      },
    ],
    theme: 'custom-theme',
  };
  useEffect(() => {
    // asyncFetch();
    setLineData(ldata);
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
      const link = `${window.location.origin}/personal/joinguild/?invitationCode=${guildInfo.invitationCode}`;
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
              <p className={styles['txt']}>Total Revenue</p>
              <p className={styles['txt1']}>
                <strong>252.9 </strong>
                <label>USDT</label>
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
              {/* <Link to={`/personal/info`} className={styles['view']}>
                {intl.formatMessage({
                  id: 'PERSONAL_GUILD_VIEW',
                })}
              </Link> */}
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
                  <strong>{guildInfo.numbeGamers}</strong>
                </p>
              </li>
              <li
                className={`${styles['ico-item']} ${styles['ico-item2']}`}
                // onClick={toPage}
              >
                <p className={styles['txt']}>
                  {intl.formatMessage({
                    id: 'PERSONAL_GUILD_TXT5',
                  })}
                </p>
                <p className={styles['txt1']}>
                  <strong>13,287 </strong>
                  <label>USDT</label>
                </p>
              </li>
              <li className={`${styles['ico-item']} ${styles['ico-item3']}`}>
                <p className={styles['txt']}>
                  {intl.formatMessage({
                    id: 'PERSONAL_GUILD_TXT6',
                  })}
                </p>
                <p className={styles['txt1']}>
                  <strong>NO.{guildInfo.guildRanking}</strong>
                </p>
              </li>
              <li className={`${styles['ico-item']} ${styles['ico-item4']}`}>
                <p className={styles['txt']}>
                  {intl.formatMessage({
                    id: 'PERSONAL_GUILD_TXT7',
                  })}
                </p>
                <p className={styles['txt1']}>
                  <strong>{guildInfo.dua}</strong>
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
                <strong>2,866.29 </strong>
                <label>USDT</label>
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
            <label>last yield</label> <b>{item.ustd ? item.ustd : 0} USDT</b>
          </p>
          <p>
            <label>last game duration</label>{' '}
            <b>{item.hours ? item.hours : 0} h</b>
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
      <div className={styles['back']}>{`${backTitle}`}</div>
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
              defaultValue={selectType}
              style={{ width: 120 }}
              onChange={handleChange}
              className={styles['line-select']}
            >
              <Option value="Yield">Yield</Option>
              <Option value="Duration">Duration</Option>
            </Select>
            {selectType == 'Yield' ? (
              <Line {...lineConfigYeild} />
            ) : (
              <Line {...lineConfigDuration} />
            )}
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
