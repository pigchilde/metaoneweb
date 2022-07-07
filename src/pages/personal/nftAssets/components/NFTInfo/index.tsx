import { useIntl } from 'umi';
import { ObjectT } from '../../typing';
import styles from './index.scss';

const NFTInfo = (props: ObjectT) => {
  const { data = {} } = props;
  const intl = useIntl();

  const nftAsset: ObjectT = data.asset;
  const nftAttributes: ObjectT[] = data.assetAttributes;

  return (
    <div>
      <div className={styles['info']}>
        <h2 className={styles['name']}>{nftAsset?.name}</h2>
        <span className={styles['hash']}>#{nftAsset?.nftTokenId}</span>
      </div>
      <div className={styles['attr-box']}>
        {/* <p className={styles['attr-tit']}>Attributes</p> */}
        <div className={styles['attr-list']}>
          {/* <dl>
            <dt>Quality</dt>
            <dd>{data.quality}</dd>
          </dl> */}
          {/* {nftAttributes &&
            nftAttributes.map((item: any[], index) => (
              <dl key={index}>
                <dt>{item[0]}</dt>
                <dd>{item[1]}</dd>
              </dl>
            ))} */}
        </div>
      </div>
    </div>
  );
};

export default NFTInfo;
