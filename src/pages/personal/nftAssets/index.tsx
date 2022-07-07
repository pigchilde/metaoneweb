import styles from './index.scss';
import ico from './ico.scss';
import { connect, Link, useIntl } from 'umi';
import { Button, Select } from 'antd';
import { CaretDownOutlined } from '@ant-design/icons';
import WalletList from './components/WalletList';
import { useState, useEffect } from 'react';
import { queryMyRentNFT } from '@/assets/personal/data/nfts';
import { ObjectT } from './typing';
import contractConfig from '@/utils/contract/config';

const NFTAssets = (props: ObjectT) => {
  const {
    dispatch,
    common: { account },
  } = props;
  const intl = useIntl();

  const [wallet, setWallet] = useState();
  const [myNFTList, setMyNFTList] = useState<any>([]); // mock数据用
  const [myRentNFT, setMyRentNFT] = useState<any>([]); // mock数据用

  // 获取nft列表(mock)
  const getMarketNFTs = () => {
    // setMyNFTs(queryMyNFT());
    setMyRentNFT(queryMyRentNFT());
  };

  /**
   * 获取nft列表
   */
  const getMyNFTList = () => {
    if (!account) {
      setMyNFTList({});
      return;
    }
    dispatch({
      type: 'nftAssets/getNFTList',
      payload: {
        nftAddress: contractConfig.erc721.address,
        owner: account,
        pageNum: 1,
        pageSize: 20,
      },
    }).then((res: any) => {
      setMyNFTList(res);
    });
  };

  useEffect(() => {
    getMarketNFTs();
  }, []);

  useEffect(() => {
    getMyNFTList();
  }, [account]);

  const selectList = [
    {
      label: 'All',
      key: 'All',
    },
    // {
    //   label: 'Listed',
    //   key: 'Listed',
    // },
    // {
    //   label: 'Leased',
    //   key: 'Leased',
    // },
    // {
    //   label: 'ldle',
    //   key: 'ldle',
    // },
  ];
  const selectList2 = [
    {
      label: 'All(Select the game)',
      key: 'All',
    },
    // {
    //   label: 'GameaAAA',
    //   key: 'GameaAAA',
    // },
  ];
  const { Option } = Select;
  const changeFilter = () => {};
  const tmpList2 = myRentNFT;
  return (
    <div className={styles['nft-wrap']}>
      <header className={styles['header-wrap']}>
        <p className={styles['back']}>
          {intl.formatMessage({ id: 'NFTASSETS_TITLE' })}
        </p>
        <div className={styles['seleted-wrap']}>
          <Select
            suffixIcon={<CaretDownOutlined />}
            onChange={changeFilter}
            defaultValue={selectList[0].key}
          >
            {selectList.map((item: ObjectT) => {
              return (
                <Option value={item.key} key={item.key}>
                  {item.label}
                </Option>
              );
            })}
          </Select>
          <Select
            suffixIcon={<CaretDownOutlined />}
            onChange={changeFilter}
            defaultValue={selectList2[0].key}
          >
            {selectList2.map((item: ObjectT) => {
              return (
                <Option value={item.key} key={item.key}>
                  {item.label}
                </Option>
              );
            })}
          </Select>
        </div>
      </header>
      <ul className={styles['nav-wrap']}>
        <li className={styles['item']}>
          <i className={`${ico['ico']} ${ico['ico-worth']}`}></i>
          <div className={styles['text']}>
            <div className={styles['name']}>
              {intl.formatMessage({ id: 'NFTASSETS_MY_NFTS_WORTH' })}
            </div>
            <b className={styles['num']}>
              1085.208 <i>USDT</i>
            </b>
          </div>
        </li>
        <li className={styles['item']}>
          <i className={`${ico['ico']} ${ico['ico-myNTFS']}`}></i>
          <div className={styles['text']}>
            <div className={styles['name']}>
              {intl.formatMessage({ id: 'NFTASSETS_MY_NFTS' })}
            </div>
            <b className={styles['num']}>42</b>
          </div>
        </li>
        <li className={styles['item']}>
          <i className={`${ico['ico']} ${ico['ico-leassingNTFS']}`}></i>
          <div className={styles['text']}>
            <div className={styles['name']}>
              {intl.formatMessage({ id: 'NFTASSETS_MY_LEASSING_NFTS' })}
            </div>
            <b className={styles['num']}>32</b>
          </div>
        </li>
        <li className={styles['item']}>
          <i className={`${ico['ico']} ${ico['ico-wallets']}`}></i>
          <div className={styles['text']}>
            <div className={styles['name']}>
              {intl.formatMessage({ id: 'NFTASSETS_MY_WALLETS' })}
            </div>
            <div className={styles['line']}>
              <b className={styles['num']}>3</b>
              <Button type="primary">
                {intl.formatMessage({ id: 'NFTASSETS_ADD_WALLET' })}
              </Button>
            </div>
          </div>
        </li>
      </ul>
      <section className={styles['wallet-wrap']}>
        <header className={styles['wallet-head']}>
          <div className={styles['text']}>
            {intl.formatMessage({ id: 'NFTASSETS_WALLET' })} 1 (0x1f2a....)
          </div>
          <Button>
            {intl.formatMessage({ id: 'NFTASSETS_WALLET_CONNECTED' })}
          </Button>
        </header>
        <div className={styles['lists-wrap']}>
          <p>
            {intl.formatMessage({ id: 'NFTASSETS_MY_NFTS' })} (
            {intl.formatMessage({ id: 'NFTASSETS_TOTAL' })}:{myNFTList?.count}{' '}
            {intl.formatMessage({ id: 'NFTASSETS_WORTH' })}:680)
          </p>
          <WalletList datas={myNFTList?.data} listIndex={1} />
          <p>
            {intl.formatMessage({ id: 'NFTASSETS_MY_LEASSING_NFTS' })} (
            {intl.formatMessage({ id: 'NFTASSETS_TOTAL' })}:{myRentNFT.length}{' '}
            {intl.formatMessage({ id: 'NFTASSETS_WORTH' })}:680){' '}
          </p>
          <WalletList datas={tmpList2} listIndex={2} />
        </div>
      </section>
      {/* <section className={styles['wallet-wrap']}>
        <header className={styles['wallet-head']}>
          <div className={styles['text']}>Wallet 2 (0x1f2a....)</div>
          <Button type="primary">Contect Wallet</Button>
        </header>
        <div className={styles['lists-wrap']}>
          <p>My NFTs (Totle:4 Worth:680)</p>
          <WalletList datas={tmpList2} />
          <p>My Leasiing NFTs (Totle:2) </p>
          <WalletList datas={tmpList1} />
        </div>
      </section> */}
    </div>
  );
};
export default connect(
  ({ nftAssets, common }: { nftAssets: ObjectT; common: ObjectT }) => ({
    nftAssets,
    common,
  }),
)(NFTAssets);
