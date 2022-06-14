import styles from './index.scss';
import Banner from './components/Banner';
import { useIntl } from 'umi';
// import avater from '../../assets/gamers/pic/avater.png';
import PhotoText from '@/components/PhotoText';
import { Tabs } from 'antd';
import { connect } from 'dva';
import { useEffect, useState } from 'react';
import Loading from '@/components/Loading';
import Empty from '@/components/Empty';

import gamer1 from '../../assets/gamers/pic/gamer1.png';
import gamer2 from '../../assets/gamers/pic/gamer2.png';
import gamer3 from '../../assets/gamers/pic/gamer3.png';
import gamer4 from '../../assets/gamers/pic/gamer4.png';
import gamer5 from '../../assets/gamers/pic/gamer5.png';
import gamer6 from '../../assets/gamers/pic/gamer6.png';
import gamer7 from '../../assets/gamers/pic/gamer7.png';
import gamer8 from '../../assets/gamers/pic/gamer8.png';
import gamer9 from '../../assets/gamers/pic/gamer9.png';
import gamer10 from '../../assets/gamers/pic/gamer10.png';
import gamer11 from '../../assets/gamers/pic/gamer11.png';
import gamer12 from '../../assets/gamers/pic/gamer12.png';
import gamer13 from '../../assets/gamers/pic/gamer13.png';
import gamer14 from '../../assets/gamers/pic/gamer14.png';
import gamer15 from '../../assets/gamers/pic/gamer15.png';

const { TabPane } = Tabs;
interface objectT {
  [propName: string]: any;
}

const Gamers = (props: objectT) => {
  const intl = useIntl();
  const { dispatch } = props;
  const [loading, setLoading] = useState(true as boolean);
  const [bannerData, setBannerData] = useState({} as objectT);
  const [informationList, setInformationList] = useState({} as objectT);
  const [top3, setTop3] = useState({} as objectT);

  useEffect(() => {
    setLoading(true);

    dispatch({
      type: 'gamers/getGamersInfo',
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

  const overAllTop3 = [
    {
      name: '屠梦者',
      guild: '创世大爆炸',
      favGames: 'Zombie World Z',
      usdt: 1458.7,
      avater: gamer1,
    },
    {
      name: '安凉',
      guild: '黑绳地狱',
      favGames: 'Zombie World Z',
      usdt: 951.2,
      avater: gamer2,
    },
    {
      name: '眼中星光',
      guild: '风信子',
      favGames: 'Zombie World Z',
      usdt: 813.9,
      avater: gamer3,
    },
  ];

  const overAllTop4To10 = [
    {
      name: '落日西风',
      guild: '轮回2021',
      favGames: 'Age of tanks ',
      usdt: 402.1,
      avater: gamer4,
    },
    {
      name: '挽安',
      guild: 'IFGG',
      favGames: 'Zombie World Z',
      usdt: 400.6,
      avater: gamer5,
    },
    {
      name: 'Wendy Lee',
      guild: 'WSCC',
      favGames: 'The Killbox',
      usdt: 381.8,
      avater: gamer6,
    },
    {
      name: 'MD',
      guild: 'Zombie World Z',
      favGames: 'Age of Tanks',
      usdt: 381.6,
      avater: gamer7,
    },
    {
      name: 'didi',
      guild: 'shinluo',
      favGames: 'Zombie World Z',
      usdt: 376.9,
      avater: gamer8,
    },
    {
      name: 'pqnzovmyc1885',
      guild: '薄荷岛',
      favGames: 'The Killbox',
      usdt: 375,
      avater: gamer9,
    },
    {
      name: 'xdlagppo3995',
      guild: 'MintD',
      favGames: 'Age of tanks',
      usdt: 373.8,
      avater: gamer10,
    },
  ];

  const weekTop3 = [
    {
      name: '挽安',
      guild: 'IFGG',
      favGames: 'Zombie World Z',
      usdt: 70.8,
      avater: gamer5,
    },
    {
      name: '屠梦者',
      guild: '创世大爆炸',
      favGames: 'Zombie World Z',
      usdt: 62.5,
      avater: gamer1,
    },
    {
      name: '追梦者',
      guild: '原始部落',
      favGames: 'Zombie World Z',
      usdt: 58.06,
      avater: gamer11,
    },
  ];

  const weekTop4To10 = [
    {
      name: '眼睛没有故事',
      guild: '白垩纪',
      favGames: 'Zombie World Z',
      usdt: 55.2,
      avater: gamer12,
    },
    {
      name: '青色发尾',
      guild: '涅槃公会',
      favGames: 'Age of tanks',
      usdt: 55.09,
      avater: gamer13,
    },
    {
      name: 'fans',
      guild: '薄荷岛',
      favGames: 'The Killbox',
      usdt: 44.92,
      avater: gamer14,
    },
    {
      name: 'box',
      guild: 'MintD',
      favGames: 'Age of tanks',
      usdt: 25.42,
      avater: gamer15,
    },
    {
      name: 'Wendy Lee',
      guild: 'WSCC',
      favGames: 'The Killbox',
      usdt: 12.15,
      avater: gamer6,
    },
    {
      name: 'didi',
      guild: 'shinluo',
      favGames: 'Zombie World Z',
      usdt: 11.26,
      avater: gamer8,
    },
    {
      name: 'kuku',
      guild: 'MD',
      favGames: 'Zombie World Z',
      usdt: 9.85,
      avater: gamer7,
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
      {<Banner data={bannerData} />}

      <section className={`${styles['main']} wrapper`}>
        <section className={styles['gamers-list']}>
          <h3>
            {intl.formatMessage({
              id: 'GAMERS_List_TITLE',
            })}
          </h3>
          <div className={styles['gamers-list-con']}>
            {loading ? (
              <Loading></Loading>
            ) : top3?.length ? (
              top3.map((item: objectT, index: number) => {
                const avater = 'gamer' + index;
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
                      Guild:{item.guild} <br />
                      FAV Games:{item.favGames}
                    </dd>
                  </dl>
                );
              })
            ) : (
              <Empty></Empty>
            )}
            <div className={styles['gamers-list-table']}>
              <Tabs defaultActiveKey="1" onChange={onTabChange}>
                <TabPane tab="Weekly List" key="1">
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
                              <i>Guild:{item.guild} FAV Games:item.favGames</i>
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
                <TabPane tab="Overall List" key="2">
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
                              <i>Guild:{item.guild} FAV Games:item.favGames</i>
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
          informationList.map((item: objectT) => {
            return <PhotoText datas={item} key={item.id} />;
          })
        ) : (
          ''
        )}
      </section>
    </>
  );
};

export default connect(({ gamers }: { gamers: objectT }) => ({
  gamers,
}))(Gamers);
