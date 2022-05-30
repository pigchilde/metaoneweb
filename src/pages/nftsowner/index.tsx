import styles from './index.scss';
import Banner from './components/Banner';
import { useIntl } from 'umi';
import avater from '../../assets/gamers/pic/avater.png';
import PhotoText from '@/components/PhotoText';
import { Tabs } from 'antd';
import { connect } from 'dva';
import { useEffect, useState } from 'react';
import CustomSwiper from '@/components/CustomSwiper';
import Loading from '@/components/Loading';

const { TabPane } = Tabs;

interface objectT {
  [propName: string]: any;
}

const Nftsowners = (props: objectT) => {
  const intl = useIntl();
  const { dispatch } = props;
  const [loading, setLoading] = useState(true as boolean);
  const [bannerData, setBannerData] = useState({} as objectT);
  const [newsList, setNewsList] = useState({} as objectT);
  const [informationList, setInformationList] = useState({} as objectT);

  useEffect(() => {
    setLoading(true);

    dispatch({
      type: 'nftsowners/getNftsOwnerInfo',
      payload: {},
    }).then((res: objectT) => {
      const { banner, news, list } = res;
      if (banner.code === 0) {
        setBannerData(banner.data);
      }
      if (news.code === 0) {
        setNewsList(news.data);
      }
      if (list.code === 0) {
        setInformationList(list.data);
      }
      setLoading(false);
    });
  }, []);
  return (
    <>
      <Banner data={bannerData} />
      <section className={`${styles['main']} wrapper`}>
        <section className={styles['gamers-list']}>
          <h3>
            {intl.formatMessage({
              id: 'NFTSOWNER_NFTS_OWNERS_EARNINGS',
            })}
          </h3>
          <div className={styles['gamers-list-con']}>
            <dl>
              <dt>
                <span className={styles['avatar']}>
                  <img src={avater} />
                </span>
                <span className={styles['name']}>OwnerName</span>
                <span className={styles['score']}>
                  7700<i>USDT</i>
                </span>
              </dt>
              <dd className={styles['img']}></dd>
              <dd className={styles['txt']}>Prime NFTS:RPG、ACT、AVG</dd>
            </dl>
            <dl>
              <dt>
                <span className={styles['avatar']}>
                  <img src={avater} />
                </span>
                <span className={styles['name']}>OwnerName</span>
                <span className={styles['score']}>
                  7700<i>USDT</i>
                </span>
              </dt>
              <dd className={styles['img']}></dd>
              <dd className={styles['txt']}>Prime NFTS:RPG、ACT、AVG</dd>
            </dl>
            <dl>
              <dt>
                <span className={styles['avatar']}>
                  <img src={avater} />
                </span>
                <span className={styles['name']}>OwnerName</span>
                <span className={styles['score']}>
                  7700<i>USDT</i>
                </span>
              </dt>
              <dd className={styles['img']}></dd>
              <dd className={styles['txt']}>Prime NFTS:RPG、ACT、AVG</dd>
            </dl>
            <div className={styles['gamers-list-table']}>
              <Tabs defaultActiveKey="1">
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
                    <li>
                      <span className={styles['num']}>4</span>
                      <span className={styles['avatar']}>
                        <img src={avater} />
                      </span>
                      <span className={styles['info']}>
                        OwnerName
                        <br />
                        <i>Prime NFTS:RPG、ACT、AVG</i>
                      </span>
                      <span className={styles['score']}>
                        7700<i>USDT</i>
                      </span>
                    </li>
                    <li>
                      <span className={styles['num']}>5</span>
                      <span className={styles['avatar']}>
                        <img src={avater} />
                      </span>
                      <span className={styles['info']}>
                        OwnerName
                        <br />
                        <i>Prime NFTS:RPG、ACT、AVG</i>
                      </span>
                      <span className={styles['score']}>
                        7700<i>USDT</i>
                      </span>
                    </li>
                    <li>
                      <span className={styles['num']}>6</span>
                      <span className={styles['avatar']}>
                        <img src={avater} />
                      </span>
                      <span className={styles['info']}>
                        OwnerName
                        <br />
                        <i>Prime NFTS:RPG、ACT、AVG</i>
                      </span>
                      <span className={styles['score']}>
                        7700<i>USDT</i>
                      </span>
                    </li>
                    <li>
                      <span className={styles['num']}>7</span>
                      <span className={styles['avatar']}>
                        <img src={avater} />
                      </span>
                      <span className={styles['info']}>
                        OwnerName
                        <br />
                        <i>Prime NFTS:RPG、ACT、AVG</i>
                      </span>
                      <span className={styles['score']}>
                        7700<i>USDT</i>
                      </span>
                    </li>
                    <li>
                      <span className={styles['num']}>8</span>
                      <span className={styles['avatar']}>
                        <img src={avater} />
                      </span>
                      <span className={styles['info']}>
                        OwnerName
                        <br />
                        <i>Prime NFTS:RPG、ACT、AVG</i>
                      </span>
                      <span className={styles['score']}>
                        7700<i>USDT</i>
                      </span>
                    </li>
                    <li>
                      <span className={styles['num']}>9</span>
                      <span className={styles['avatar']}>
                        <img src={avater} />
                      </span>
                      <span className={styles['info']}>
                        OwnerName
                        <br />
                        <i>Prime NFTS:RPG、ACT、AVG</i>
                      </span>
                      <span className={styles['score']}>
                        7700<i>USDT</i>
                      </span>
                    </li>
                    <li>
                      <span className={styles['num']}>10</span>
                      <span className={styles['avatar']}>
                        <img src={avater} />
                      </span>
                      <span className={styles['info']}>
                        OwnerName
                        <br />
                        <i>Prime NFTS:RPG、ACT、AVG</i>
                      </span>
                      <span className={styles['score']}>
                        7700<i>USDT</i>
                      </span>
                    </li>
                  </ul>
                </TabPane>
                <TabPane
                  tab={intl.formatMessage({
                    id: 'GAMERS_List_TAB2',
                  })}
                  key="2"
                >
                  <ul className={styles['table-list']}>
                    <li>
                      <span className={styles['num']}>4</span>
                      <span className={styles['avatar']}>
                        <img src={avater} />
                      </span>
                      <span className={styles['info']}>
                        OwnerName1
                        <br />
                        <i>Prime NFTS:RPG、ACT、AVG</i>
                      </span>
                      <span className={styles['score']}>
                        7700<i>USDT</i>
                      </span>
                    </li>
                    <li>
                      <span className={styles['num']}>5</span>
                      <span className={styles['avatar']}>
                        <img src={avater} />
                      </span>
                      <span className={styles['info']}>
                        OwnerName
                        <br />
                        <i>Prime NFTS:RPG、ACT、AVG</i>
                      </span>
                      <span className={styles['score']}>
                        7700<i>USDT</i>
                      </span>
                    </li>
                    <li>
                      <span className={styles['num']}>6</span>
                      <span className={styles['avatar']}>
                        <img src={avater} />
                      </span>
                      <span className={styles['info']}>
                        OwnerName
                        <br />
                        <i>Prime NFTS:RPG、ACT、AVG</i>
                      </span>
                      <span className={styles['score']}>
                        7700<i>USDT</i>
                      </span>
                    </li>
                    <li>
                      <span className={styles['num']}>7</span>
                      <span className={styles['avatar']}>
                        <img src={avater} />
                      </span>
                      <span className={styles['info']}>
                        OwnerName
                        <br />
                        <i>Prime NFTS:RPG、ACT、AVG</i>
                      </span>
                      <span className={styles['score']}>
                        7700<i>USDT</i>
                      </span>
                    </li>
                    <li>
                      <span className={styles['num']}>8</span>
                      <span className={styles['avatar']}>
                        <img src={avater} />
                      </span>
                      <span className={styles['info']}>
                        OwnerName
                        <br />
                        <i>Prime NFTS:RPG、ACT、AVG</i>
                      </span>
                      <span className={styles['score']}>
                        7700<i>USDT</i>
                      </span>
                    </li>
                    <li>
                      <span className={styles['num']}>9</span>
                      <span className={styles['avatar']}>
                        <img src={avater} />
                      </span>
                      <span className={styles['info']}>
                        OwnerName
                        <br />
                        <i>Prime NFTS:RPG、ACT、AVG</i>
                      </span>
                      <span className={styles['score']}>
                        7700<i>USDT</i>
                      </span>
                    </li>
                    <li>
                      <span className={styles['num']}>10</span>
                      <span className={styles['avatar']}>
                        <img src={avater} />
                      </span>
                      <span className={styles['info']}>
                        OwnerName
                        <br />
                        <i>Prime NFTS:RPG、ACT、AVG</i>
                      </span>
                      <span className={styles['score']}>
                        7700<i>USDT</i>
                      </span>
                    </li>
                  </ul>
                </TabPane>
              </Tabs>
            </div>
          </div>
        </section>
      </section>
      <section className={styles['news-swiper']}>
        <div className={styles['wrapper']}>
          <p className={styles['txt-top']}>
            {intl.formatMessage({ id: 'INDEX_NEWS_SWIPER_TOP_TEXT' })}
          </p>
          <h3 className={styles['tit']}>
            {intl.formatMessage({ id: 'INDEX_NEWS_SWIPER_TITLE' })}
          </h3>
          <p className={styles['desc']}>
            {intl.formatMessage({ id: 'INDEX_NEWS_SWIPER_DESCRIPTION' })}
          </p>
          <div className={styles['swiper']}>
            <CustomSwiper
              type="image"
              datas={newsList}
              moreLink="/news?tab=1001"
            ></CustomSwiper>
          </div>
        </div>
      </section>
      <section className={`${styles['main']} wrapper`}>
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

export default connect(({ nftsowners }: { nftsowners: objectT }) => ({
  nftsowners,
}))(Nftsowners);
