import styles from './index.scss';
import { useIntl, Link } from 'umi';
import { Pagination, Tabs } from 'antd';
import { connect } from 'dva';
import { useEffect, useState } from 'react';
import Loading from '@/components/Loading';
import PaginationItem from '@/components/Pagination';
import PhotoText from '@/components/PhotoText';

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
      if (news.code === 0) {
        setNewsList(news.data);
      }
      // setNewsList(newsListData);
      if (list.code === 0) {
        setInformationList(list.data);
      }
      setLoading(false);
    });
  }, []);
  return (
    <>
      <div className={styles['main']}>
        <div className="wrapper">
          <section className={styles['sec-news']}>
            <h2 className={styles['sec-tit']}>About MetaOne NFT’s Owner</h2>
            <p className={styles['sec-desc']}>
              MetaOne provides professional and valuable NFT investment data
              analysis and information.
            </p>
            <div className={styles['news-list']}>
              {newsList && newsList.length
                ? newsList.map((item: objectT, index: number) => (
                    <Link to="###">
                      <figure>
                        <div className={styles['hd']}>
                          <h3 className={styles['tit']}>{item.title}</h3>
                          <p className={styles['desc']}>{item.outline}</p>
                          <time>May 31 2022</time>
                        </div>
                        <div className={styles['img-wrap']}>
                          <img src={item.img} />
                        </div>
                      </figure>
                    </Link>
                  ))
                : null}
            </div>
            <PaginationItem />
          </section>
          <section className={styles['sec-video-text']}>
            <PhotoText
              datas={{
                title: 'What Is NFT? ',
                video: require('@/assets/nftsowner/media/1.mp4'),
                layoutCategory: 11,
              }}
            />
          </section>
          {/*  <section className={styles['sec-video-text']}>
            <PhotoText
              datas={{
                title: 'How To List Your NFT’s In MetaOne?',
                video: '',
                layoutCategory: 11,
              }}
            />
          </section>
          <section className={styles['sec-video-text']}>
            <PhotoText
              datas={{
                title: 'NFT Vs Investment',
                video: '',
                layoutCategory: 11,
              }}
            />
          </section> */}
        </div>
      </div>
    </>
  );
};

export default connect(({ nftsowners }: { nftsowners: objectT }) => ({
  nftsowners,
}))(Nftsowners);
