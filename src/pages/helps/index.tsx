import styles from './index.scss';
import { Collapse } from 'antd';
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
        const { code } = res;
        if (code === 0) {
          setListDatas(res);
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
        ) : listDatas.data?.length > 0 ? (
          <Collapse bordered={false}>
            {listDatas.data.map((item: objectT) => {
              return (
                <Panel header={item.title} key={item.id}>
                  <article className={styles.article}>{item.content}</article>
                </Panel>
              );
            })}
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
