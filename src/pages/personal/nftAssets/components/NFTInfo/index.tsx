import styles from './index.scss';

interface objectT {
  [propName: string]: any;
}

const NFTInfo = (props: objectT) => {
  const { data = {} } = props;
  return (
    <div>
      <div className={styles['info']}>
        <h2 className={styles['name']}>{data.name}</h2>
        <span className={styles['hash']}>#{data.hash}</span>
      </div>
      <div className={styles['attr-box']}>
        {/* <p className={styles['attr-tit']}>Attributes</p> */}
        <div className={styles['attr-list']}>
          {/* <dl>
            <dt>Quality</dt>
            <dd>{data.quality}</dd>
          </dl> */}
          {data.attr &&
            Object.entries(data.attr).map((item: any[], index) => (
              <dl key={index}>
                <dt>{item[0]}</dt>
                <dd>{item[1]}</dd>
              </dl>
            ))}
        </div>
      </div>
    </div>
  );
};

export default NFTInfo;
