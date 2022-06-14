import styles from './index.scss';
import Banner from './components/Banner';
import { useIntl } from 'umi';
// import avater from '../../assets/guilds/avater.png';
import PhotoText from '@/components/PhotoText';
import { Tabs } from 'antd';
import { connect } from 'dva';
import { useEffect, useState } from 'react';
import Loading from '@/components/Loading';
import Empty from '@/components/Empty';

import guild1 from '../../assets/guilds/guilds1.png';
import guild2 from '../../assets/guilds/guilds2.png';
import guild3 from '../../assets/guilds/guilds3.png';
import guild4 from '../../assets/guilds/guilds4.png';
import guild5 from '../../assets/guilds/guilds5.png';
import guild6 from '../../assets/guilds/guilds6.png';
import guild7 from '../../assets/guilds/guilds7.png';
import guild8 from '../../assets/guilds/guilds8.png';
import guild9 from '../../assets/guilds/guilds9.png';
import guild10 from '../../assets/guilds/guilds10.png';
import guild11 from '../../assets/guilds/guilds11.png';
import guild12 from '../../assets/guilds/guilds12.png';
import guild13 from '../../assets/guilds/guilds13.png';

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
      name: '创世大爆炸',
      gameType: 'STG',
      usdt: 12500,
      gamer: 393,
      avater: guild1,
    },
    {
      name: 'IFGG',
      gameType: 'STG',
      usdt: 11982,
      gamer: 342,
      avater: guild2,
    },
    {
      name: '白垩纪',
      gameType: 'STG',
      usdt: 10858,
      gamer: 431,
      avater: guild3,
    },
  ];

  const weekTop4To10 = [
    {
      name: '原始部落',
      gameType: 'STG',
      usdt: 9581,
      gamer: 332,
      avater: guild4,
    },
    {
      name: '涅槃公会',
      gameType: 'AVG、SRPG',
      usdt: 9225,
      gamer: 338,
      avater: guild5,
    },
    {
      name: '薄荷岛',
      gameType: 'FPS',
      usdt: 6751,
      gamer: 207,
      avater: guild6,
    },
    {
      name: 'Mintd',
      gameType: 'AVG、SRPG',
      usdt: 2542,
      gamer: 218,
      avater: guild7,
    },
    {
      name: 'shinluo',
      gameType: 'STG、ACT',
      usdt: 1126,
      gamer: 209,
      avater: guild8,
    },
    {
      name: 'MD',
      gameType: 'STG、ACT',
      usdt: 985,
      gamer: 215,
      avater: guild9,
    },
    {
      name: 'WSCC',

      gameType: 'FPS',
      usdt: 851,
      gamer: 70,
      avater: guild10,
    },
  ];

  const overAllTop3 = [
    {
      name: '白垩纪',

      gameType: 'STG',
      usdt: 58901,
      gamer: 431,
      avater: guild3,
    },
    {
      name: '创世大爆炸',

      gameType: 'STG',
      usdt: 39521,
      gamer: 393,
      avater: guild1,
    },
    {
      name: '黑绳地狱',

      gameType: 'STG',
      usdt: 38555,
      gamer: 349,
      avater: guild11,
    },
  ];

  const overAllTop4To10 = [
    {
      name: 'IFGG',

      gameType: 'STG',
      usdt: 28958,
      gamer: 342,
      avater: guild2,
    },
    {
      name: '涅槃公会',

      gameType: 'AVG、SRPG',
      usdt: 25015,
      gamer: 338,
      avater: guild5,
    },
    {
      name: '轮回2021',

      gameType: 'AVG、SRPG',
      usdt: 24581,
      gamer: 422,
      avater: guild12,
    },
    {
      name: '薄荷岛',

      gameType: 'FPS',
      usdt: 21115,
      gamer: 207,
      avater: guild6,
    },
    {
      name: '风信子',

      gameType: 'STG',
      usdt: 19687,
      gamer: 325,
      avater: guild13,
    },
    {
      name: 'Mintd',
      gameType: 'AVG、SRPG',
      usdt: 18541,
      gamer: 218,
      avater: guild7,
    },
    {
      name: '原始部落',

      gameType: 'STG',
      usdt: 15985,
      gamer: 332,
      avater: guild4,
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
                        <img src={item.avater} />
                      </span>
                      <span className={styles['name']}>{item.name}</span>
                      <span className={styles['score']}>
                        {String(item.usdt).replace(/(\d)(?=(\d{3})+$)/g, '$1,')}
                        <i>USDT</i>
                      </span>
                    </dt>
                    <dd className={styles['img']}></dd>
                    <dd className={styles['txt']}>
                      Gamer:{item.gamer}
                      <br />
                      GameType:{item.gameType}
                    </dd>
                  </dl>
                );
              })
            ) : (
              <Empty></Empty>
            )}

            <div className={styles['gamers-list-table']}>
              <Tabs defaultActiveKey="1" onChange={onTabChange}>
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
                          <li key={index}>
                            <span className={styles['num']}>{index + 4}</span>
                            <span className={styles['avatar']}>
                              <img src={item.avater} />
                            </span>
                            <span className={styles['info']}>
                              {item.name}
                              <br />
                              <i>
                                Gamer:{item.gamer} GameType:{item.gameType}
                              </i>
                            </span>
                            <span className={styles['score']}>
                              {String(item.usdt).replace(
                                /(\d)(?=(\d{3})+$)/g,
                                '$1,',
                              )}
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
                          <li key={index}>
                            <span className={styles['num']}>{index + 4}</span>
                            <span className={styles['avatar']}>
                              <img src={item.avater} />
                            </span>
                            <span className={styles['info']}>
                              {item.name}
                              <br />
                              <i>
                                Gamer:{item.gamer} GameType:{item.gameType}
                              </i>
                            </span>
                            <span className={styles['score']}>
                              {String(item.usdt).replace(
                                /(\d)(?=(\d{3})+$)/g,
                                '$1,',
                              )}
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
