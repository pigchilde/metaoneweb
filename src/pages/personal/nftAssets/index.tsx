import styles from './index.scss';
import ico from './ico.scss';
import { Link, useIntl } from 'umi';
import { Button, Select } from 'antd';
import { CaretDownOutlined } from '@ant-design/icons';
import WalletList from './components/WalletList';
import { useState, useEffect } from 'react';
import web3Utils, { eth2Wei, wei2Eth } from '../../../utils/web3';
import config from '../../../utils/web3Config';

interface objectT {
  [propName: string]: any;
}
const NFTAssets = () => {
  const intl = useIntl();

  const [wallet, setWallet] = useState();

  useEffect(() => {
    /* web3Utils
      .getBalance('0xf653381Aa2e85737fDBf5b755a2Ade943542A96E')
      .then((res) => {
        console.log(wei2Eth(res), 'res');
      }); */

    ethereum.request({ method: 'eth_requestAccounts' }).then((accounts) => {
      const contract = web3Utils.initContract(
        config.CDMContractABI,
        config.CDMContractAddress,
        accounts[0],
      );

      contract.methods
        .getMyDepositsList()
        .call()
        .then((res) => {
          console.log(res, 'getMyDepositsList res');
        });

      contract.methods
        .earningItem(0)
        .call()
        .then((res) => {
          console.log(res, 'earningItem res');
        });

      contract.methods
        .getLendItemMsg(0)
        .call()
        .then((res) => {
          console.log(res, 'getLendItemMsg res');
        });
    });
  }, []);

  const selectList = [
    {
      label: 'All',
      key: 'All',
    },
    {
      label: 'Listed',
      key: 'Listed',
    },
    {
      label: 'Leased',
      key: 'Leased',
    },
    {
      label: 'ldle',
      key: 'ldle',
    },
  ];
  const selectList2 = [
    {
      label: 'All(Select the game)',
      key: 'All',
    },
    {
      label: 'GameaAAA',
      key: 'GameaAAA',
    },
  ];
  const { Option } = Select;
  const changeFilter = () => {};
  const tmpList1 = [
    { id: 1, type: 'yellow' },
    { id: 2, type: 'red' },
    { id: 3 },
    { id: 4 },
    { id: 5 },
    { id: 6 },
    { id: 7 },
  ];
  const tmpList2 = [
    { id: 1, type: 'yellow' },
    { id: 2, type: 'red' },
  ];
  return (
    <div className={styles['nft-wrap']}>
      <header className={styles['header-wrap']}>
        <Link to="/" className={styles['back']}>
          {'< '}
          NFT ASSETS
        </Link>
        <div className={styles['seleted-wrap']}>
          <Select
            suffixIcon={<CaretDownOutlined />}
            onChange={changeFilter}
            defaultValue={selectList[0].key}
          >
            {selectList.map((item: objectT) => {
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
            {selectList2.map((item: objectT) => {
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
            <b className={styles['num']}>USDT 1234</b>
          </div>
        </li>
        <li className={styles['item']}>
          <i className={`${ico['ico']} ${ico['ico-myNTFS']}`}></i>
          <div className={styles['text']}>
            <div className={styles['name']}>My NFTs</div>
            <b className={styles['num']}>17</b>
          </div>
        </li>
        <li className={styles['item']}>
          <i className={`${ico['ico']} ${ico['ico-leassingNTFS']}`}></i>
          <div className={styles['text']}>
            <div className={styles['name']}>My Leassing NFTs </div>
            <b className={styles['num']}>34</b>
          </div>
        </li>
        <li className={styles['item']}>
          <i className={`${ico['ico']} ${ico['ico-wallets']}`}></i>
          <div className={styles['text']}>
            <div className={styles['name']}>My Wallets</div>
            <div className={styles['line']}>
              <b className={styles['num']}>USDT 1234</b>
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
          <p>My NFTs (Totle:4 Worth:680)</p>
          <WalletList datas={tmpList1} />
          <p>My Leasiing NFTs (Totle:2) </p>
          <WalletList datas={[]} />
        </div>
      </section>
      <section className={styles['wallet-wrap']}>
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
      </section>
    </div>
  );
};
export default NFTAssets;