import styles from './index.scss';
import 'swiper/swiper.scss';
import { Button, Image } from 'antd';
import { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { history, useIntl } from 'umi';
import moment from 'moment';
import { ObjectT } from '../../typing';

const WalletList = (props: ObjectT) => {
  const intl = useIntl();
  const { datas = [], listIndex } = props;
  const split_array = (arr: any, len: number) => {
    let a_len = arr.length;
    let result = [];
    for (let i = 0; i < a_len; i += len) {
      result.push(arr.slice(i, i + len));
    }
    return result;
  };
  const mapList = split_array(datas, 5);

  // 跳转到详情
  const go2NFTDetail = (id: string | number) => {
    if (id === 14) {
      history.push(`/personal/nftAssets/${id}?type=makeOrder`);
    } else {
      history.push(`/personal/nftAssets/${id}`);
    }
  };

  return (
    <div className={styles['wallet-swiper']}>
      {datas.length > 0 ? (
        <>
          <Swiper
            modules={[Navigation]}
            navigation={{
              prevEl: `.btn-prev-${listIndex}`,
              nextEl: `.btn-next-${listIndex}`,
            }}
          >
            {mapList.map((plist: any, index: number) => {
              return (
                <SwiperSlide key={index}>
                  <ul className={styles['items']}>
                    {plist.map((item: ObjectT, index: number) => {
                      return (
                        <li
                          className={styles['item']}
                          key={index}
                          onClick={() => {
                            go2NFTDetail(item.id);
                          }}
                        >
                          <div className={styles['msgs']}>
                            <div className={styles['title']}>{item.name}</div>
                            <div className={styles['img']}>
                              <Image
                                preview={false}
                                src={item.image}
                                fallback="data:image/png;base64,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"
                              />
                            </div>
                            <div className={styles['info']}>
                              <div className={styles['labels']}>
                                <label className={styles['label-1']}>
                                  #{item.nftTokenId}
                                </label>
                                <label className={styles['label-2']}>
                                  {intl.formatMessage({
                                    id: 'NFTASSETS_LEVEL',
                                  })}{' '}
                                  {item.level}
                                </label>
                              </div>
                              <div className={styles['text']}>
                                <span className={styles['name']}>
                                  {intl.formatMessage({ id: 'NFTASSETS_RENT' })}
                                  (USDT/
                                  {intl.formatMessage({ id: 'NFTASSETS_DAY' })})
                                </span>
                                <span className={styles['price']}>
                                  {item.interest}
                                </span>
                              </div>
                            </div>
                          </div>
                          {listIndex === 1 ? (
                            <div
                              className={`${
                                index === 0 || index === 1
                                  ? styles['red']
                                  : index === 4
                                  ? styles['yellow']
                                  : ''
                              }`}
                            >
                              <Button type="primary">
                                {item.nftStatusText}
                              </Button>
                            </div>
                          ) : (
                            <div className={styles['default']}>
                              <Button>
                                {intl.formatMessage({
                                  id: 'NFTASSETS_END_DATE',
                                })}
                                :{' '}
                                {moment(item.rentInfo.rentTime).format(
                                  'YYYY/MM/DD HH:mm:ss',
                                )}
                              </Button>
                            </div>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </SwiperSlide>
              );
            })}
          </Swiper>
          {mapList.length > 1 ? (
            <div className={styles['swiper-ctrl']}>
              <span className={`${styles['btn-prev']} btn-prev-${listIndex}`}>
                <LeftOutlined />
              </span>
              <span className={`${styles['btn-next']} btn-next-${listIndex}`}>
                <RightOutlined />
              </span>
            </div>
          ) : null}
        </>
      ) : (
        <div className={styles['empty']}></div>
      )}
    </div>
  );
};
export default WalletList;
