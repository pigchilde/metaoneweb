import styles from './index.scss';
const PhotoText = (props: any) => {
  const { type, title, des, imgSrc } = props;
  //const cssType = 'type' + type;
  const onShowSizeChange = (): void => {};
  return (
    <section className={styles['photo-text']}>
      <div className={`type ${styles['type' + type]}`}>
        <div className={styles['text']}>
          <h3>{title}</h3>
          <div className={styles['text-con']}>{des}</div>
        </div>
        <div className={styles['img']}>
          <img src={imgSrc} />
        </div>
      </div>
    </section>
  );
};
export default PhotoText;
