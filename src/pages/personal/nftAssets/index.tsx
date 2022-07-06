import styles from './index.scss';
import ico from './ico.scss';
import { connect, Link, useIntl } from 'umi';
import { Button, Select } from 'antd';
import { CaretDownOutlined } from '@ant-design/icons';
import WalletList from './components/WalletList';
import { useState, useEffect } from 'react';
import { queryMyRentNFT } from '@/assets/personal/data/nfts';
import { ObjectT } from './typing';

const NFTAssets = (props: ObjectT) => {
  const { dispatch } = props;
  const intl = useIntl();

  const [wallet, setWallet] = useState();
  const [myNFTList, setMyNFTList] = useState<any>([]); // mock数据用
  const [myRentNFT, setMyRentNFT] = useState<any>([]); // mock数据用

  // 获取nft列表(mock)
  const getMarketNFTs = () => {
    // setMyNFTs(queryMyNFT());
    setMyRentNFT(queryMyRentNFT());
  };

  const getNFTInfo = () => {
    dispatch({
      type: 'nftAssets/getNFTInfo',
      payload: {
        id: '1111111111',
      },
    });
  };

  /**
   * 获取nft列表
   */
  const getMyNFTList = () => {
    dispatch({
      type: 'nftAssets/getNFTList',
      payload: {
        nftAddress: '0x2104A90046AA9C73906C7f4beDDa20e94a354454',
        owner: '0xCdE6f9fD2A5789EF5aDFdF499676cC0979E33cd0',
        pageNum: 1,
        pageSize: 20,
      },
    }).then((res: any) => {
      setMyNFTList(res);
    });
  };

  useEffect(() => {
    getMarketNFTs();
    getMyNFTList();
    getNFTInfo();
  }, []);

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
  const tmpList1 = myNFTList?.data;
  const tmpList2 = myRentNFT;
  return (
    <div className={styles['nft-wrap']}>
      <header className={styles['header-wrap']}>
        <p className={styles['back']}>NFT ASSETS</p>
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
            <div className={styles['name']}>My NFTs Worth</div>
            <b className={styles['num']}>
              1085.208 <i>USDT</i>
            </b>
          </div>
        </li>
        <li className={styles['item']}>
          <i className={`${ico['ico']} ${ico['ico-myNTFS']}`}></i>
          <div className={styles['text']}>
            <div className={styles['name']}>My NFTs</div>
            <b className={styles['num']}>42</b>
          </div>
        </li>
        <li className={styles['item']}>
          <i className={`${ico['ico']} ${ico['ico-leassingNTFS']}`}></i>
          <div className={styles['text']}>
            <div className={styles['name']}>My Leassing NFTs </div>
            <b className={styles['num']}>32</b>
          </div>
        </li>
        <li className={styles['item']}>
          <i className={`${ico['ico']} ${ico['ico-wallets']}`}></i>
          <div className={styles['text']}>
            <div className={styles['name']}>My Wallets</div>
            <div className={styles['line']}>
              <b className={styles['num']}>3</b>
              <Button type="primary">ALL</Button>
            </div>
          </div>
        </li>
      </ul>
      <section className={styles['wallet-wrap']}>
        <header className={styles['wallet-head']}>
          <div className={styles['text']}>Wallet 1 (0x1f2a....)</div>
          <Button>Connected</Button>
        </header>
        <div className={styles['lists-wrap']}>
          <p>My NFTs (Totle:{myNFTList?.count} Worth:680)</p>
          <WalletList datas={tmpList1} listIndex={1} />
          <p>My Leasiing NFTs (Totle:{myRentNFT.length}) </p>
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
export default connect(({ nftAssets }: { nftAssets: ObjectT }) => ({
  nftAssets,
}))(NFTAssets);
