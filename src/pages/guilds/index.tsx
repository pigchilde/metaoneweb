import styles from './index.scss';
import Banner from './components/Banner';
import { useIntl } from 'umi';
import avater from '../../assets/gamers/pic/avater.png';
import PhotoText from '@/components/PhotoText';
import { Tabs } from 'antd';
import { connect } from 'dva';
import { useEffect, useState } from 'react';
import Loading from '@/components/Loading';
import Empty from '@/components/Empty';

const { TabPane } = Tabs;

interface objectT {
  [propName: string]: any;
}

const Guilds = (props: objectT) => {
  const intl = useIntl();
  const { dispatch } = props;
  const [loading, setLoading] = useState(true as boolean);
  const [bannerData, setBannerData] = useState({} as objectT);
  const [informationList, setInformationList] = useState({} as objectT);
  const [top3, setTop3] = useState({} as objectT);

  useEffect(() => {
    setLoading(true);

    dispatch({
      type: 'guilds/getGuildsInfo',
      payload: {},
    }).then((res: objectT) => {
      const { banner, list } = res;
      if (banner.code === 0) {
        setBannerData(banner.data);
      }
      if (list.code === 0) {
        setInformationList(list.data);
      }
      setLoading(false);
    });
  }, []);

  const weekTop3 = [
    {
      name: 'AMU',
      size: 832,
      from: 'SG',
      gameType: 'SLG、TCG、AVG',
      usdt: 1207,
    },
    {
      name: 'B.C.A.',
      size: 776,
      from: 'MY',
      gameType: 'SLG、SIM、CAG',
      usdt: 1131,
    },
    {
      name: 'HEROES',
      size: 735,
      from: 'CN',
      gameType: 'PZL、TAB、RTS',
      usdt: 1034,
    },
  ];

  const weekTop4To10 = [
    {
      name: 'King Of Legend',
      size: 692,
      from: 'US',
      gameType: 'RTS、TCG、TAB',
      usdt: 993,
    },
    {
      name: 'SliverLand',
      size: 665,
      from: 'KP',
      gameType: 'CAG、TAB、SLG',
      usdt: 928,
    },
    {
      name: 'TTGS',
      size: 637,
      from: 'KH',
      gameType: 'PZL、SIM、MSC',
      usdt: 875,
    },
    {
      name: 'SMTH',
      size: 611,
      from: 'SG',
      gameType: 'SLG、AVG、PZL',
      usdt: 837,
    },
    {
      name: 'ZIXIA',
      size: 570,
      from: 'JP',
      gameType: 'STG、SIM、MSC',
      usdt: 806,
    },
    {
      name: 'Free World',
      size: 563,
      from: 'LA',
      gameType: 'SLG、STG、RTS',
      usdt: 779,
    },
    {
      name: 'Destiny',
      size: 559,
      from: 'HK-CN',
      gameType: 'TCG、SIM、CAG',
      usdt: 751,
    },
  ];

  const overAllTop3 = [
    {
      name: 'AMU',
      size: 832,
      from: 'SG',
      gameType: 'SLG、TCG、AVG',
      usdt: 17998,
    },
    {
      name: 'B.C.A.',
      size: 776,
      from: 'MY',
      gameType: 'SLG、SIM、CAG',
      usdt: 15437,
    },
    {
      name: 'TTGS',
      size: 637,
      from: 'KH',
      gameType: 'PZL、SIM、MSC',
      usdt: 13904,
    },
  ];

  const overAllTop4To10 = [
    {
      name: 'GTA',
      size: 591,
      from: 'US',
      gameType: 'STG、SIM、MSC',
      usdt: 11796,
    },
    {
      name: 'SliverLand',
      size: 665,
      from: 'KP',
      gameType: 'CAG、TAB、SLG',
      usdt: 10880,
    },
    {
      name: 'HEROES',
      size: 735,
      from: 'CN',
      gameType: 'PZL、TAB、RTS ',
      usdt: 10427,
    },
    {
      name: 'Risen',
      size: 493,
      from: 'KH',
      gameType: 'TCG、SIM、CAG',
      usdt: 9979,
    },
    {
      name: 'King Of Legend',
      size: 692,
      from: 'US',
      gameType: 'RTS、TCG、TAB',
      usdt: 9910,
    },
    {
      name: 'SMTH',
      size: 611,
      from: 'SG',
      gameType: 'SLG、AVG、PZL',
      usdt: 9825,
    },
    {
      name: 'Absolute Domain',
      size: 438,
      from: 'CN',
      gameType: 'SLG、STG、RTS',
      usdt: 9703,
    },
  ];

  useEffect(() => {
    setTop3(weekTop3);
  }, []);

  const onTabChange = (e) => {
    if (e === '1') {
      setTop3(weekTop3);
    } else {
      setTop3(overAllTop3);
    }
  };

  return (
    <>
      <Banner data={bannerData} />

      <section className={`${styles['main']} wrapper`}>
        <section className={styles['gamers-guilds']}>
          <h3>
            {intl.formatMessage({
              id: 'GUILDS_EARNINGS',
            })}
          </h3>
          <div className={styles['gamers-list-con']}>
            {loading ? (
              <Loading></Loading>
            ) : top3?.length ? (
              top3.map((item: objectT, index: number) => {
                return (
                  <dl key={index}>
                    <dt>
                      <span className={styles['avatar']}>
                        <img src={avater} />
                      </span>
                      <span className={styles['name']}>{item.name}</span>
                      <span className={styles['score']}>
                        {item.usdt}
                        <i>USDT</i>
                      </span>
                    </dt>
                    <dd className={styles['img']}></dd>
                    <dd className={styles['txt']}>
                      size:{item.size} from:{item.from} <br />
                      Gametype:{item.gameType}
                    </dd>
                  </dl>
                );
              })
            ) : (
              <Empty></Empty>
            )}

            <div className={styles['gamers-list-table']}>
              <Tabs defaultActiveKey="1" onChange={onTabChange}>
                {/* <ul className={styles['table-tab']}>
                  <li className={styles['active']}>
                    {intl.formatMessage({
                      id: 'GAMERS_List_TAB1',
                    })}
                  </li>
                  <li>
                    {intl.formatMessage({
                      id: 'GAMERS_List_TAB2',
                    })}
                  </li>
                </ul> */}
                <TabPane
                  tab={intl.formatMessage({
                    id: 'GAMERS_List_TAB1',
                  })}
                  key="1"
                >
                  <ul className={styles['table-list']}>
                    {loading ? (
                      <Loading></Loading>
                    ) : weekTop4To10?.length ? (
                      weekTop4To10.map((item: objectT, index: number) => {
                        return (
                          <li>
                            <span className={styles['num']}>{index + 4}</span>
                            <span className={styles['avatar']}>
                              <img src={avater} />
                            </span>
                            <span className={styles['info']}>
                              {item.name}
                              <br />
                              <i>
                                size:{item.size} from:{item.from} Gametype:
                                {item.gameType}
                              </i>
                            </span>
                            <span className={styles['score']}>
                              {item.usdt}
                              <i>USDT</i>
                            </span>
                          </li>
                        );
                      })
                    ) : (
                      <Empty></Empty>
                    )}
                  </ul>
                </TabPane>
                <TabPane
                  tab={intl.formatMessage({
                    id: 'GAMERS_List_TAB2',
                  })}
                  key="2"
                >
                  <ul className={styles['table-list']}>
                    {loading ? (
                      <Loading></Loading>
                    ) : overAllTop4To10?.length ? (
                      overAllTop4To10.map((item: objectT, index: number) => {
                        return (
                          <li>
                            <span className={styles['num']}>{index + 4}</span>
                            <span className={styles['avatar']}>
                              <img src={avater} />
                            </span>
                            <span className={styles['info']}>
                              {item.name}
                              <br />
                              <i>
                                size:{item.size} from:{item.from} Gametype:
                                {item.gameType}
                              </i>
                            </span>
                            <span className={styles['score']}>
                              {item.usdt}
                              <i>USDT</i>
                            </span>
                          </li>
                        );
                      })
                    ) : (
                      <Empty></Empty>
                    )}
                  </ul>
                </TabPane>
              </Tabs>
            </div>
          </div>
        </section>
        {loading ? (
          <Loading></Loading>
        ) : informationList.length ? (
          informationList.map((item: objectT, index: number) => {
            return informationList.length - 1 !== index ? (
              <div key={item.id}>
                <PhotoText datas={item} />
              </div>
            ) : (
              <PhotoText datas={item} key="index" />
            );
          })
        ) : (
          ''
        )}
      </section>
    </>
  );
};

export default connect(({ guilds }: { guilds: objectT }) => ({
  guilds,
}))(Guilds);
