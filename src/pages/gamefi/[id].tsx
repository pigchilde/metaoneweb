import styles from './index.scss';
import BannerDetail from './components/BannerDetail';
import { Breadcrumb, Tabs } from 'antd';
import { LeftOutlined } from '@ant-design/icons';
import { history, useIntl } from 'umi';
import { connect } from 'dva';
import { useEffect, useState } from 'react';
import Loading from '@/components/Loading';
interface objectT {
  [propName: string]: any;
}
const Detail = (props: objectT) => {
  const { location = {}, dispatch, gamefi = {}, match = {} } = props;
  const [loading, setLoading] = useState(true as boolean);
  const [gameDatas, setGameDatas] = useState({} as objectT);
  const { params = {} } = match;
  const { TabPane } = Tabs;
  const returnBack = () => {
    history.push('/gamefi/');
  };
  const intl = useIntl();
  const GAMEFI_DETAIL_TAB1 = intl.formatMessage({
    id: 'GAMEFI_DETAIL_TAB1',
  });
  const GAMEFI_DETAIL_TAB2 = intl.formatMessage({
    id: 'GAMEFI_DETAIL_TAB2',
  });
  const GAMEFI_DETAIL_TAB3 = intl.formatMessage({
    id: 'GAMEFI_DETAIL_TAB3',
  });
  const GAMEFI_DETAIL_TAB4 = intl.formatMessage({
    id: 'GAMEFI_DETAIL_TAB4',
  });
  const GAMEFI_DETAIL_BACK = intl.formatMessage({
    id: 'GAMEFI_DETAIL_BACK',
  });
  useEffect(() => {
    setLoading(true);
    dispatch({
      type: 'gamefi/getData',
      payload: {
        id: params.id,
      },
    }).then((res: objectT) => {
      const { code, data } = res;
      if (code === 0) {
        setGameDatas(data);
      }
      setLoading(false);
    });
  }, [params.id]);

  return (
    <div className={styles['detail-wrapper']}>
      <div className={`wrapper ${styles['nav-wrapper']}`}>
        <Breadcrumb>
          <Breadcrumb.Item onClick={returnBack}>
            <LeftOutlined style={{ fontSize: '32px', color: '#00cacb' }} />
            <span className={styles.navlink}>{GAMEFI_DETAIL_BACK}</span>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <span className={styles.navlabel}>{gameDatas.name}</span>
          </Breadcrumb.Item>
        </Breadcrumb>
      </div>
      {loading ? <Loading /> : <BannerDetail datas={gameDatas} />}

      <div className={`wrapper ${styles['article-wrapper']}`}>
        <Tabs>
          <TabPane tab={GAMEFI_DETAIL_TAB1} key="1">
            <article
              className={styles.article}
              dangerouslySetInnerHTML={{
                __html: gameDatas?.gameInfo?.aboutGame,
              }}
            ></article>
          </TabPane>
          <TabPane tab={GAMEFI_DETAIL_TAB2} key="2">
            <article
              className={styles.article}
              dangerouslySetInnerHTML={{
                __html: gameDatas?.gameInfo?.gamePlay,
              }}
            ></article>
          </TabPane>
          <TabPane tab={GAMEFI_DETAIL_TAB3} key="3">
            <article
              className={styles.article}
              dangerouslySetInnerHTML={{
                __html: gameDatas?.gameInfo?.howToEarn,
              }}
            ></article>
          </TabPane>
          <TabPane tab={GAMEFI_DETAIL_TAB4} key="4">
            <article
              className={styles.article}
              dangerouslySetInnerHTML={{ __html: gameDatas?.gameInfo?.team }}
            ></article>
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
};
export default connect(({ gamefi }: { gamefi: objectT }) => ({
  gamefi,
}))(Detail);
