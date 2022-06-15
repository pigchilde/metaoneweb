import styles from './index.scss';
import { useIntl } from 'umi';

interface objectT {
  [propName: string]: any;
}

const Banner = (props: objectT) => {
  const intl = useIntl();
  const {
    data: { title, backageImg, img, content, newGuilds },
  } = props;
  const background1 = {
    backgroundImage: `url(${backageImg})`,
  };

  const background2 = {
    background: `url(${img}) no-repeat right 0`,
  };
  return (
    <header className={styles['banner']} style={background1}>
      <div className={`wrapper ${styles['wrap_bg']}`} style={background2}>
        <div className={styles['banner-title']}>
          <h2>
            {newGuilds
              ? newGuilds
                  ?.split('')
                  .map((str: string) => <span className="sp-num">{str}</span>)
              : newGuilds}
          </h2>
          <p>
            {intl.formatMessage({
              id: 'GUILDS_BANNER_TITLE',
            })}
          </p>
        </div>
        <div className={styles['banner-con']}>
          <h2>{title}</h2>
          <p dangerouslySetInnerHTML={{ __html: content }}></p>
        </div>
      </div>
    </header>
  );
};
export default Banner;
