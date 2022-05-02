import styles from './index.scss';
import Banner from './components/Banner';
import { useIntl } from 'umi';
import avater from '../../assets/gamers/pic/avater.png';
import PhotoText from '@/components/PhotoText';

const Gamers = () => {
  const intl = useIntl();
  const onShowSizeChange = () => {};
  const onClick = () => {
    // history.push('/news/1');
  };
  return (
    <>
      <Banner />

      <section className={`${styles['main']} wrapper`}>
        <section className={styles['gamers-list']}>
          <h3>
            {intl.formatMessage({
              id: 'GAMERS_List_TITLE',
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
        <section className={styles['gamers-bridge']}>
          <h3>
            {intl.formatMessage({
              id: 'GAMERS_BRIDGE_TITLE',
            })}
          </h3>
          <p className={styles['gamers-bridge-des']}>
            {intl.formatMessage({
              id: 'GAMERS_BRIDGE_CON2_DES',
            })}
          </p>
          <ul className={styles['gamers-bridge-con']}>
            <li>
              <span className={styles['img']}></span>
              <span className={styles['title']}>
                {intl.formatMessage({
                  id: 'GAMERS_BRIDGE_CON1_TITLE',
                })}
              </span>
              <span className={styles['des']}>
                {intl.formatMessage({
                  id: 'GAMERS_BRIDGE_CON1_DES',
                })}
              </span>
            </li>
            <li>
              <span className={styles['img']}></span>
              <span className={styles['title']}>
                {intl.formatMessage({
                  id: 'GAMERS_BRIDGE_CON2_TITLE',
                })}
              </span>
              <span className={styles['des']}>
                {intl.formatMessage({
                  id: 'GAMERS_BRIDGE_CON2_DES',
                })}
              </span>
            </li>
            <li>
              <span className={styles['img']}></span>
              <span className={styles['title']}>
                {intl.formatMessage({
                  id: 'GAMERS_BRIDGE_CON3_TITLE',
                })}
              </span>
              <span className={styles['des']}>
                {intl.formatMessage({
                  id: 'GAMERS_BRIDGE_CON3_DES',
                })}
              </span>
            </li>
            <li>
              <span className={styles['img']}></span>
              <span className={styles['title']}>
                {intl.formatMessage({
                  id: 'GAMERS_BRIDGE_CON4_TITLE',
                })}
              </span>
              <span className={styles['des']}>
                {intl.formatMessage({
                  id: 'GAMERS_BRIDGE_CON4_DES',
                })}
              </span>
            </li>
          </ul>
        </section>
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
      <section className={styles['gamers-training']}>
        <div
          className={`${styles['gamers-training-bg']} ${styles['main']} wrapper`}
        >
          <h3>
            {intl.formatMessage({
              id: 'GAMERS_GAME_TRAINING',
            })}
          </h3>
          <ul>
            <li>
              <span className={styles['img']}></span>
              <p>
                {intl.formatMessage({
                  id: 'GAMERS_GAME_TITLE1',
                })}
              </p>
            </li>
            <li>
              <span className={styles['img']}></span>
              <p>
                {intl.formatMessage({
                  id: 'GAMERS_GAME_TITLE2',
                })}
              </p>
            </li>
            <li>
              <span className={styles['img']}></span>
              <p>
                {intl.formatMessage({
                  id: 'GAMERS_GAME_TITLE3',
                })}
              </p>
            </li>
            <li>
              <span className={styles['img']}></span>
              <p>
                {intl.formatMessage({
                  id: 'GAMERS_GAME_TITLE4',
                })}
              </p>
            </li>
          </ul>
        </div>
      </section>
      <section className={styles['gamers-tutorial']}>
        <div className={`${styles['main']} wrapper`}>
          <h3>
            {intl.formatMessage({
              id: 'GAMERS_GAME_TUTORIAL',
            })}
          </h3>
          <p className={styles['title-des']}>
            {intl.formatMessage({
              id: 'GAMERS_GAME_TUTORIAL_DES',
            })}
          </p>
          <ul>
            <li>
              <span className={styles['img']}></span>
              <p className={styles['title']}>
                {intl.formatMessage({
                  id: 'GAMERS_GAME_TUTORIAL_TITLE',
                })}{' '}
                1
              </p>
              <p className={styles['des']}>
                {intl.formatMessage({
                  id: 'GAMERS_GAME_TUTORIAL_DES1',
                })}
              </p>
            </li>
            <li>
              <span className={styles['img']}></span>
              <p className={styles['title']}>
                {intl.formatMessage({
                  id: 'GAMERS_GAME_TUTORIAL_TITLE',
                })}{' '}
                2
              </p>
              <p className={styles['des']}>
                {intl.formatMessage({
                  id: 'GAMERS_GAME_TUTORIAL_DES2',
                })}
              </p>
            </li>
            <li>
              <span className={styles['img']}></span>
              <p className={styles['title']}>
                {intl.formatMessage({
                  id: 'GAMERS_GAME_TUTORIAL_TITLE',
                })}{' '}
                3
              </p>
              <p className={styles['des']}>
                {intl.formatMessage({
                  id: 'GAMERS_GAME_TUTORIAL_DES3',
                })}
              </p>
            </li>
            <li>
              <span className={styles['img']}></span>
              <p className={styles['title']}>
                {intl.formatMessage({
                  id: 'GAMERS_GAME_TUTORIAL_TITLE',
                })}{' '}
                4
              </p>
              <p className={styles['des']}>
                {intl.formatMessage({
                  id: 'GAMERS_GAME_TUTORIAL_DES4',
                })}
              </p>
            </li>
            <li>
              <span className={styles['img']}></span>
              <p className={styles['title']}>
                {intl.formatMessage({
                  id: 'GAMERS_GAME_TUTORIAL_TITLE',
                })}{' '}
                5
              </p>
              <p className={styles['des']}>
                {intl.formatMessage({
                  id: 'GAMERS_GAME_TUTORIAL_DES5',
                })}
              </p>
            </li>
          </ul>
        </div>
      </section>
    </>
  );
};

export default Gamers;
