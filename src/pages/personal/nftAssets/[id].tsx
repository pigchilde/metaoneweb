import { Link } from 'umi';
import styles from './detail.scss';
import { useIntl } from 'umi';
import { Radio } from 'antd';
import { useEffect, useState } from 'react';
import NFTInfo from './components/NFTInfo';
import { queryNFTDetailsById } from '@/assets/personal/data/nfts';
import OrderInfo from './components/OrderInfo';
interface objectT {
  [propName: string]: any;
}

const NFTDetail = (props: objectT) => {
  const {
    match: { params },
  } = props;
  const [radioValue, setRadioValue] = useState('nft');
  const [itemInfo, setItemInfo] = useState<any>({});
  const intl = useIntl();
  // 获取nft数据
  const getNFTDetails = () => {
    queryNFTDetailsById(params.id).then((res) => {
      setItemInfo(res.data);
    });
  };

  useEffect(() => {
    getNFTDetails();
  }, []);

  const handleSizeChange = (e: objectT) => {
    const { target } = e;
    setRadioValue(target.value);
  };
  const onFinish = (values: any) => {
    console.log('Success:', values);
  };
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <>
      <Link to="/personal/nftAssets" className={styles['back']}>
        {'< '}
        {intl.formatMessage({
          id: 'PERSONAL_BACK',
        })}
      </Link>
      <section className={styles['main']}>
        <div className={styles['img-box']}>
          <img src={itemInfo.image} alt="" />
        </div>
        <div className={styles['content-box']}>
          <Radio.Group
            value={radioValue}
            onChange={handleSizeChange}
            className={styles['radio-btn']}
          >
            <Radio.Button value="nft">
              {intl.formatMessage({
                id: 'PERSONAL_GUILD_RADIO1',
              })}
            </Radio.Button>
            {itemInfo.leaseInfo ? (
              <Radio.Button value="order">
                {intl.formatMessage({
                  id: 'PERSONAL_GUILD_RADIO2',
                })}
              </Radio.Button>
            ) : null}
          </Radio.Group>
          {radioValue === 'nft' ? (
            <NFTInfo data={itemInfo} />
          ) : (
            <OrderInfo data={itemInfo} />
          )}
        </div>
      </section>
    </>
  );
};
export default NFTDetail;
