import styles from './index.scss';
const PhotoText = (props: any) => {
  const { datas = {}, onPageChange } = props;
  const {
    title,
    content,
    img,
    layoutCategory,
  }: {
    title: string;
    content: string;
    img: string;
    layoutCategory: string;
  } = datas;

  const types = {
    11: 1,
    12: 2,
    13: 3,
    14: 4,
    21: 5,
    22: 6,
  };
  return (
    <section className={styles['photo-text']}>
      <div className={`${styles['type' + types[layoutCategory]]}`}>
        <div className={styles['text']}>
          <h3>{title}</h3>
          <div className={styles['text-con']}>{content}</div>
        </div>
        <div className={styles['img']}>
          <img src={img} />
        </div>
      </div>
    </section>
  );
};
export default PhotoText;
