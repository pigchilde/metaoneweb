import styles from './index.scss';
import { useIntl, Link } from 'umi';
import { Pagination, Tabs } from 'antd';
import { connect } from 'dva';
import { useEffect, useState } from 'react';
import Loading from '@/components/Loading';
import PaginationItem from '@/components/Pagination';
import PhotoText from '@/components/PhotoText';

const { TabPane } = Tabs;

const newsListData = [
  {
    title: 'How to be a NFT owner in MetaOne?',
    description:
      'Being a NFT owner is simple.  Create an account on metaone.gg, sign up as our gamer.  Once you connect your wallet with our platform, your NFT asset will show on your NFT page.  Set the duration and the price, and you will be able to see your NFT’s on our NFT’s hub.  Simply as that!  Sign up now at https://metaone.gg/login',
  },
  {
    title: 'How to earn as NFT’s owner in MetaOne?',
    description:
      'You can start earning after you place your NFT’s on our NFT Hub for rental and for staking.  You could use your NFT to play, and split according to what you set on the proportional.',
  },
  {
    title: 'NFT vs Investment',
    description:
      'The traditional principle of investing, buy low and sell high, also applies for NFTs. Market participants can buy NFTs early and turn around and sell them for a profit if the interest in the token grows.  There are NFTs that you can buy where you can flip right away and others you can hold.\
    NFTs are not like a stock or a bond where you have a quantifiable idea of the intrinsic value of the investment aside from its market value. They have a market value that\'s driven purely by what the crypto community is willing to pay for them.\
    Knowing that NFTs are risk assets, investors need to determine the right level of exposure to them. You would have a certain amount of money that you would put into your risk capital bucket, and that would be what you are willing to go to zero or 100.\
    Investors can think about NFTs as a commodity-like asset similar to silver, gold and art. When people buy art as an investment, it\'s an illiquid part of their portfolio.  Some would call that a part of a commodity allocation. One commodity-like aspect of NFTs, is that they are "completely uncorrelated" to any other market.\
    An NFT can be a legitimate investment if investors understand what the NFT is being used for.  Making sure that you have something that has utility is a better bet for the long-term life of what an NFT is.  The life span of the use case  is the life span of that utility.',
  },
];

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
      setNewsList(newsListData);
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
                    <Link to="">
                      <figure>
                        <div className={styles['hd']}>
                          <h3 className={styles['tit']}>{item.title}</h3>
                          <p className={styles['desc']}>{item.description}</p>
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
          <section className={styles['sec-video-text']}>
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
          </section>
        </div>
      </div>
    </>
  );
};

export default connect(({ nftsowners }: { nftsowners: objectT }) => ({
  nftsowners,
}))(Nftsowners);
