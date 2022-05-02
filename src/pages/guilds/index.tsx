import styles from './index.scss';
import Banner from './components/Banner';
import { useIntl } from 'umi';
import avater from '../../assets/gamers/pic/avater.png';
import PhotoText from '@/components/PhotoText';

const Guilds = () => {
  const intl = useIntl();
  const onShowSizeChange = () => {};
  const onClick = () => {
    // history.push('/news/1');
  };
  return (
    <>
      <Banner />

      <section className={`${styles['main']} wrapper`}>
        <section className={styles['line']}></section>
        <section className={styles['gamers-guilds']}>
          <h3>
            {intl.formatMessage({
              id: 'GUILDS_LARGEST_GAMES',
            })}
          </h3>
          <div className={styles['gamers-list-con']}>
            <dl>
              <dt>
                <span className={styles['avatar']}>
                  <img src={avater} />
                </span>
                <span className={styles['name']}>Gamer Name</span>
                <span className={styles['score']}>7700</span>
              </dt>
              <dd></dd>
            </dl>
            <dl>
              <dt>
                <span className={styles['avatar']}>
                  <img src={avater} />
                </span>
                <span className={styles['name']}>Gamer Name</span>
                <span className={styles['score']}>7700</span>
              </dt>
              <dd></dd>
            </dl>
            <dl>
              <dt>
                <span className={styles['avatar']}>
                  <img src={avater} />
                </span>
                <span className={styles['name']}>Gamer Name</span>
                <span className={styles['score']}>7700</span>
              </dt>
              <dd></dd>
            </dl>
            <div className={styles['gamers-list-table']}>
              <ul className={styles['table-tab']}>
                <li className={styles['active']}>
                  {intl.formatMessage({
                    id: 'GAMERS_List_TAB1',
                  })}
                </li>
                <li>
                  {intl.formatMessage({
                    id: 'GAMERS_List_TAB2',
                  })}
                </li>
              </ul>
              <ul className={styles['table-list']}>
                <li>
                  <span className={styles['num']}>4</span>
                  <span className={styles['avatar']}>
                    <img src={avater} />
                  </span>
                  <span className={styles['info']}>
                    Gamer Name
                    <br />
                    <i>size:500 from:Area Gametype:RPG、ACT、AVG</i>
                  </span>
                  <span className={styles['score']}>7700</span>
                </li>
                <li>
                  <span className={styles['num']}>5</span>
                  <span className={styles['avatar']}>
                    <img src={avater} />
                  </span>
                  <span className={styles['info']}>
                    Gamer Name
                    <br />
                    <i>size:500 from:Area Gametype:RPG、ACT、AVG</i>
                  </span>
                  <span className={styles['score']}>7700</span>
                </li>
                <li>
                  <span className={styles['num']}>6</span>
                  <span className={styles['avatar']}>
                    <img src={avater} />
                  </span>
                  <span className={styles['info']}>
                    Gamer Name
                    <br />
                    <i>size:500 from:Area Gametype:RPG、ACT、AVG</i>
                  </span>
                  <span className={styles['score']}>7700</span>
                </li>
                <li>
                  <span className={styles['num']}>7</span>
                  <span className={styles['avatar']}>
                    <img src={avater} />
                  </span>
                  <span className={styles['info']}>
                    Gamer Name
                    <br />
                    <i>size:500 from:Area Gametype:RPG、ACT、AVG</i>
                  </span>
                  <span className={styles['score']}>7700</span>
                </li>
                <li>
                  <span className={styles['num']}>8</span>
                  <span className={styles['avatar']}>
                    <img src={avater} />
                  </span>
                  <span className={styles['info']}>
                    Gamer Name
                    <br />
                    <i>size:500 from:Area Gametype:RPG、ACT、AVG</i>
                  </span>
                  <span className={styles['score']}>7700</span>
                </li>
                <li>
                  <span className={styles['num']}>9</span>
                  <span className={styles['avatar']}>
                    <img src={avater} />
                  </span>
                  <span className={styles['info']}>
                    Gamer Name
                    <br />
                    <i>size:500 from:Area Gametype:RPG、ACT、AVG</i>
                  </span>
                  <span className={styles['score']}>7700</span>
                </li>
                <li>
                  <span className={styles['num']}>10</span>
                  <span className={styles['avatar']}>
                    <img src={avater} />
                  </span>
                  <span className={styles['info']}>
                    Gamer Name
                    <br />
                    <i>size:500 from:Area Gametype:RPG、ACT、AVG</i>
                  </span>
                  <span className={styles['score']}>7700</span>
                </li>
              </ul>
            </div>
          </div>
        </section>
        <section className={styles['line']}></section>
        <PhotoText
          type="1"
          title="MetaOne NFT Assets Leasing"
          des="Gamers can browse available NFTs for leasing based on GameFi
              titles offered in the MetaOne platform; even the NFTs are on
              different blockchain from the owner of the assets.<br/>

              Gamers can browse available NFTs for leasing based on GameFi
              titles offered in the MetaOne platform; even the NFTs are on
              different blockchain from the owner of the assets."
          imgSrc="http://dummyimage.com/848x500"
        />
        <section className={styles['line']}></section>
        <PhotoText
          type="2"
          title="MetaOne NFT Assets Leasing"
          des="Gamers can browse available NFTs for leasing based on GameFi
              titles offered in the MetaOne platform; even the NFTs are on
              different blockchain from the owner of the assets.<br/>

              Gamers can browse available NFTs for leasing based on GameFi
              titles offered in the MetaOne platform; even the NFTs are on
              different blockchain from the owner of the assets."
          imgSrc="http://dummyimage.com/848x500"
        />
        <section className={styles['line']}></section>
        <PhotoText
          type="3"
          title="MetaOne NFT Assets Leasing"
          des="Gamers can browse available NFTs for leasing based on GameFi
              titles offered in the MetaOne platform; even the NFTs are on
              different blockchain from the owner of the assets.<br/>

              Gamers can browse available NFTs for leasing based on GameFi
              titles offered in the MetaOne platform; even the NFTs are on
              different blockchain from the owner of the assets."
          imgSrc="http://dummyimage.com/848x500"
        />
      </section>
    </>
  );
};

export default Guilds;
