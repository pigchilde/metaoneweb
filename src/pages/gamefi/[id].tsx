import styles from './index.scss';
import BannerDetail from './components/BannerDetail';
import React from 'react';
import { Breadcrumb, Tabs } from 'antd';
import { LeftOutlined } from '@ant-design/icons';
import { history } from 'umi';
import tmp1 from '@/assets/gamefi/img/d-1.png';
const Detail = () => {
  const { TabPane } = Tabs;
  const returnBack = () => {
    history.push('/gamefi/');
  };

  return (
    <div className={styles['detail-wrapper']}>
      <div className={`wrapper ${styles['nav-wrapper']}`}>
        <Breadcrumb>
          <Breadcrumb.Item onClick={returnBack}>
            <LeftOutlined style={{ fontSize: '32px', color: '#00cacb' }} />
            <span className={styles.navlink}>BACK</span>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <span className={styles.navlabel}>Game name</span>
          </Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <BannerDetail />
      <div className={`wrapper ${styles['article-wrapper']}`}>
        <Tabs>
          <TabPane tab="ABOUT GAME" key="1">
            <article className={styles.article}>
              <h2>
                3D TURN-BASED STRATEGY GAME.BUILD &COMMAND YOUR FLEET OF TANKS
                TO CONQUER EARTH ZERO METAVERSE
              </h2>
              <p>
                resources.build vour NFT tanks. and defend your territory
                aaainst thousands of other rival players. Battle it out in
                thrilling military conflicts and spectacular locales alongside
                your allies to conquer the Metaverse. Aunique mix of strategy
                and action with stunning graphics awaits!
              </p>
              <img src={tmp1} />
            </article>
          </TabPane>
          <TabPane tab="GAME PLAY" key="2">
            <article className={styles.article}>
              <h2>
                3D TURN-BASED STRATEGY GAME.BUILD &COMMAND YOUR FLEET OF TANKS
                TO CONQUER EARTH ZERO METAVERSE
              </h2>
              <p>
                resources.build vour NFT tanks. and defend your territory
                aaainst thousands of other rival players. Battle it out in
                thrilling military conflicts and spectacular locales alongside
                your allies to conquer the Metaverse. Aunique mix of strategy
                and action with stunning graphics awaits!
              </p>
              <img src={tmp1} />
            </article>
          </TabPane>
          <TabPane tab="TOKENOMICS" key="3">
            <article className={styles.article}>
              <h2>
                3D TURN-BASED STRATEGY GAME.BUILD &COMMAND YOUR FLEET OF TANKS
                TO CONQUER EARTH ZERO METAVERSE
              </h2>
              <p>
                resources.build vour NFT tanks. and defend your territory
                aaainst thousands of other rival players. Battle it out in
                thrilling military conflicts and spectacular locales alongside
                your allies to conquer the Metaverse. Aunique mix of strategy
                and action with stunning graphics awaits!
              </p>
              <img src={tmp1} />
            </article>
          </TabPane>
          <TabPane tab="TEAM" key="4">
            <article className={styles.article}>
              <h2>
                3D TURN-BASED STRATEGY GAME.BUILD &COMMAND YOUR FLEET OF TANKS
                TO CONQUER EARTH ZERO METAVERSE
              </h2>
              <p>
                resources.build vour NFT tanks. and defend your territory
                aaainst thousands of other rival players. Battle it out in
                thrilling military conflicts and spectacular locales alongside
                your allies to conquer the Metaverse. Aunique mix of strategy
                and action with stunning graphics awaits!
              </p>
              <img src={tmp1} />
            </article>
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
};
export default Detail;
