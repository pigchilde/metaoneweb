import styles from './index.scss';
import { Collapse } from 'antd';
import tmp1 from '@/assets/gamefi/img/d-1.png';
import { useIntl } from 'umi';
import { connect } from 'dva';
import { useEffect, useState } from 'react';
import Loading from '@/components/Loading';
import Empty from '@/components/Empty';

interface objectT {
  [propName: string]: any;
}
const Helps = (props: objectT) => {
  const { Panel } = Collapse;
  const { dispatch, helps = {} } = props;
  const intl = useIntl();
  const HELP_BANNER_TITLE = intl.formatMessage({
    id: 'HELP_BANNER_TITLE',
  });
  const HELP_BANNER_DES = intl.formatMessage({
    id: 'HELP_BANNER_DES',
  });
  const [listDatas, setListDatas] = useState({} as objectT);
  const [loading, setLoading] = useState(true as boolean);
  useEffect(() => {
    setLoading(true);
    dispatch({
      type: 'helps/getList',
    })
      .then((res: objectT) => {
        const { code, data } = res;
        if (code === 0) {
        }
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className={styles['help-wrapper']}>
      <header className={styles.banner}>
        <div className="wrapper">
          <h1>{HELP_BANNER_TITLE}</h1>
          <p>{HELP_BANNER_DES}</p>
        </div>
      </header>
      <div className={`wrapper ${styles['help-list']}`}>
        {loading ? (
          <Loading />
        ) : listDatas.data?.length ? (
          <Collapse bordered={false}>
            <Panel header="why play gamefi?" key="1">
              <article className={styles.article}>wwww</article>
            </Panel>
          </Collapse>
        ) : (
          <Empty />
        )}
      </div>
    </div>
  );
};
export default connect(({ helps }: { helps: objectT }) => ({
  helps,
}))(Helps);
