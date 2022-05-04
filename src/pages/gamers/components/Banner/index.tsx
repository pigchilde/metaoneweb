import styles from './index.scss';
import { useIntl } from 'umi';
interface objectT {
  [propName: string]: any;
}

const Banner = (props: objectT) => {
  const {
    data: { title, img, content, totalGamers },
  } = props;
  const intl = useIntl();

  const background = {
    background: `url(${img}) no-repeat right 0`,
  };
  return (
    <header className={styles['banner']} style={background}>
      <div className={`wrapper ${styles['wrap_bg']}`}>
        <div className={styles['banner-title']}>
          <h2>{totalGamers}+</h2>
          <p>
            {intl.formatMessage({
              id: 'GAMERS_BANNER_TITLE',
            })}
          </p>
        </div>
        <div className={styles['banner-con']}>
          <h2>{title}</h2>
          <p>{content}</p>
        </div>
      </div>
    </header>
  );
};
export default Banner;
