import styles from './index.scss';
import { useIntl, Link } from 'umi';
import { Pagination, Tabs } from 'antd';
import { connect } from 'dva';
import { useEffect, useState } from 'react';
import Loading from '@/components/Loading';
import PaginationItem from '@/components/Pagination';

const { TabPane } = Tabs;

interface objectT {
  [propName: string]: any;
}

const Nftsowners = (props: objectT) => {
  const intl = useIntl();
  const { dispatch } = props;
  const [loading, setLoading] = useState(true as boolean);
  const [bannerData, setBannerData] = useState({} as objectT);
  const [newsList, setNewsList] = useState<objectT[]>([]);
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
      // if (news.code === 0) {
      //   setNewsList(news.data);
      // }
      setNewsList([{}, {}, {}, {}]);
      if (list.code === 0) {
        setInformationList(list.data);
      }
      setLoading(false);
    });
  }, []);
  return (
    <>
      <section className={styles['main']}>
        <div className="wrapper">
          <h2 className={styles['sec-tit']}>About MetaOne NFT’s Owner</h2>
          <p className={styles['sec-desc']}>
            MetaOne provides professional and valuable NFT investment data
            analysis and information.
          </p>
          <div className={styles['news-list']}>
            {newsList && newsList.length
              ? newsList.map((item: objectT, index: number) => (
                  <Link to="">
                    <figure>
                      <div className={styles['hd']}>
                        <h3 className={styles['tit']}>
                          How to be a NFT’s owner in MetaOne ?How to be a NFT’s
                          owner in MetaOne ?How to be a NFT’s owner in MetaOne ?
                        </h3>
                        <p className={styles['desc']}>
                          MetaOne aims to be the world’s leading GameFi, guild
                          management and analytics platform. Recently it
                          announced the close of its seed round led by Infinity
                          Ventures .
                        </p>
                        <time>May 31 2022</time>
                      </div>
                      <div className={styles['img-wrap']}>
                        <img
                          src={require(`@/assets/nftsowner/pic/news-${
                            index + 1
                          }.jpg`)}
                        />
                      </div>
                    </figure>
                  </Link>
                ))
              : null}
          </div>
          <PaginationItem />
        </div>
      </section>
    </>
  );
};

export default connect(({ nftsowners }: { nftsowners: objectT }) => ({
  nftsowners,
}))(Nftsowners);
