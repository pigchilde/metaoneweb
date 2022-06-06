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

  const weekTop3 = [
    {
      name: 'Lucky',
      guild: 'Accelerate',
      favGames: 'Age of Tanks',
      usdt: 238,
      avater: gamer1,
    },
    {
      name: 'CROSS',
      guild: 'B.C.A.',
      favGames: 'RaceFi、SolChicks',
      usdt: 212,
      avater: gamer2,
    },
    {
      name: 'TheEggman ',
      guild: 'Accelerate',
      favGames: 'Age of Tanks',
      usdt: 203,
      avater: gamer3,
    },
  ];

  const weekTop4To10 = [
    {
      name: 'Moon',
      guild: 'HEROES',
      favGames: 'Zombie World Z ',
      usdt: 197,
    },
    {
      name: 'HOHO',
      guild: 'B.C.A.',
      favGames: 'RaceFi、SolChicks',
      usdt: 191,
    },
    {
      name: 'YouHornV2',
      guild: 'Sliverhand',
      favGames: 'Age of Tanks',
      usdt: 188,
    },
    {
      name: 'Lanzzi',
      guild: 'Accelerate',
      favGames: 'Age of Tanks',
      usdt: 186,
    },
    {
      name: 'Foggy',
      guild: 'King Of Legend',
      favGames: 'Seoul Stars',
      usdt: 182,
    },
    {
      name: 'RRC',
      guild: 'SMTH',
      favGames: 'The Killbox',
      usdt: 179,
    },
    {
      name: 'Simon',
      guild: 'ZIXIA',
      favGames: 'The Next War',
      usdt: 177,
    },
  ];

  const overAllTop3 = [
    {
      name: 'TheEggman',
      guild: 'Accelerate',
      favGames: 'Age of Tanks',
      usdt: 3507,
    },
    {
      name: 'Lanzzi',
      guild: 'Accelerate',
      favGames: 'Age of Tanks',
      usdt: 3044,
    },
    {
      name: 'YeoRae',
      guild: 'TTGS',
      favGames: 'Seoul Stars',
      usdt: 2761,
    },
  ];

  const overAllTop4To10 = [
    {
      name: 'CROSS',
      guild: 'B.C.A.',
      favGames: 'RaceFi、SolChicks',
      usdt: 2399,
    },
    {
      name: 'Lucky',
      guild: 'Accelerate',
      favGames: 'Age of Tanks',
      usdt: 1974,
    },
    {
      name: 'YouHornV2',
      guild: 'Sliverhand',
      favGames: 'Age of Tanks',
      usdt: 1746,
    },
    {
      name: 'LeoQuixere',
      guild: 'GTA',
      favGames: 'The Next Wa',
      usdt: 1535,
    },
    {
      name: 'HOHO',
      guild: 'B.C.A.',
      favGames: 'RaceFi、SolChicks',
      usdt: 1329,
    },
    {
      name: 'Nemisis120',
      guild: 'Risen',
      favGames: 'The Killbox',
      usdt: 1311,
    },
    {
      name: 'Moon',
      guild: 'HEROES',
      favGames: 'Zombie World Z ',
      usdt: 1297,
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
                        {item.usdt}
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
