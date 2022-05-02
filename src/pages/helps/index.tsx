import styles from './index.scss';
import { Collapse } from 'antd';
import tmp1 from '@/assets/gamefi/img/d-1.png';

const Helps = () => {
  const { Panel } = Collapse;
  return (
    <div className={styles['help-wrapper']}>
      <header className={styles.banner}>
        <div className="wrapper">
          <h1>Help center</h1>
          <p>Are you in trouble? We hope we can give you an answer here.</p>
        </div>
      </header>
      <div className={`wrapper ${styles['help-list']}`}>
        <Collapse bordered={false} defaultActiveKey={['1']}>
          <Panel header="why play gamefi?" key="1">
            <article className={styles.article}>
              <img src={tmp1} />
              <p>
                The fundamental potential of GameFi is enormous.Play to earn is
                fundamentally a more attractive model for many gamers and the
                ability to define and create different kinds of contract only
                increases the value of a game to its players.Tokenomics
                encourage and motivate players to engage more deeply with
                games.It is extremely likely that Play to Earn games will
                eclipse traditional gaming models and today.The game market
                globally today is estimated to be worth in excess of $200
                billion and the gaming sector is one of the fastest growing
                spaces in the tech economy.The use of blockchain and
                decentralized finance will only increase the revenue potential
                of games and as the game space integrates further into the
                metaverse space there is virtually no limit to the potential of
                GameFi.
              </p>
            </article>
          </Panel>
          <Panel header="why metaone?" key="2">
            <article className={styles.article}>
              <img src={tmp1} />
              <p>
                The fundamental potential of GameFi is enormous.Play to earn is
                fundamentally a more attractive model for many gamers and the
                ability to define and create different kinds of contract only
                increases the value of a game to its players.Tokenomics
                encourage and motivate players to engage more deeply with
                games.It is extremely likely that Play to Earn games will
                eclipse traditional gaming models and today.The game market
                globally today is estimated to be worth in excess of $200
                billion and the gaming sector is one of the fastest growing
                spaces in the tech economy.The use of blockchain and
                decentralized finance will only increase the revenue potential
                of games and as the game space integrates further into the
                metaverse space there is virtually no limit to the potential of
                GameFi.
              </p>
            </article>
          </Panel>
          <Panel header="Why create a guild in metaone?" key="3">
            <article className={styles.article}>
              <img src={tmp1} />
              <p>
                The fundamental potential of GameFi is enormous.Play to earn is
                fundamentally a more attractive model for many gamers and the
                ability to define and create different kinds of contract only
                increases the value of a game to its players.Tokenomics
                encourage and motivate players to engage more deeply with
                games.It is extremely likely that Play to Earn games will
                eclipse traditional gaming models and today.The game market
                globally today is estimated to be worth in excess of $200
                billion and the gaming sector is one of the fastest growing
                spaces in the tech economy.The use of blockchain and
                decentralized finance will only increase the revenue potential
                of games and as the game space integrates further into the
                metaverse space there is virtually no limit to the potential of
                GameFi.
              </p>
            </article>
          </Panel>
        </Collapse>
      </div>
    </div>
  );
};
export default Helps;
