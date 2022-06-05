import styles from './index.scss';
const PhotoText = (props: any) => {
  const { datas = {}, onPageChange } = props;
  const {
    title,
    content,
    img,
    video,
    layoutCategory,
  }: {
    title: string;
    content: string;
    img: string | undefined;
    video: string | undefined;
    layoutCategory: string;
  } = datas;

  const types = {
    11: 1,
    12: 2,
    13: 3,
    14: 4,
  };

  return (
    <section className={styles['photo-text']}>
      <div className={`${styles['type' + types[layoutCategory]]}`}>
        <div className={styles['text']}>
          <h3>{title}</h3>
          <div
            className={styles['text-con']}
            dangerouslySetInnerHTML={{ __html: content }}
          ></div>
        </div>
        <div className={styles['img']}>
          {img ? (
            <img src={img} />
          ) : (
            <video controls width="100%">
              <source src={video} type="video/mp4" />
              Sorry, your browser doesn't support embedded videos.
            </video>
          )}
        </div>
      </div>
    </section>
  );
};
export default PhotoText;
