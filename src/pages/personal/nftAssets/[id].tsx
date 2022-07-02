import { Link } from 'umi';
import styles from './detail.scss';
import { useIntl } from 'umi';
import { Radio } from 'antd';
import { useEffect, useState } from 'react';
import NFTInfo from './components/NFTInfo';
import { queryNFTDetailsById } from '@/assets/personal/data/nfts';
import OrderInfo from './components/OrderInfo';
import { ObjectT } from './typing';

enum TabType {
  info = 0, // nft信息
  order = 1, // nft订单
}

const NFTDetail = (props: ObjectT) => {
  const {
    match: { params },
  } = props;
  const [radioValue, setRadioValue] = useState<TabType>(TabType.order);
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

  const handleSizeChange = (e: ObjectT) => {
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
            <Radio.Button value={TabType.info}>
              {intl.formatMessage({
                id: 'PERSONAL_GUILD_RADIO1',
              })}
            </Radio.Button>
            {itemInfo.leaseInfo ? (
              <Radio.Button value={TabType.order}>
                {intl.formatMessage({
                  id: 'PERSONAL_GUILD_RADIO2',
                })}
              </Radio.Button>
            ) : null}
          </Radio.Group>
          {radioValue === TabType.info ? (
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
