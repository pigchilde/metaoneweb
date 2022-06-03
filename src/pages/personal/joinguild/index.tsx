import { Link } from 'umi';
import styles from './index.scss';
import { useIntl } from 'umi';
import { message, Select } from 'antd';
import { useState, useEffect } from 'react';
import { history } from 'umi';
import { connect } from 'dva';
const { Option } = Select;
import Loading from '@/components/Loading';
interface objectT {
  [propName: string]: any;
}
const joinGuild = (props: objectT) => {
  const { dispatch, login = {}, location = {} } = props;
  const { userInfo = {} } = login;
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    const invitationCode = location.query?.invitationCode;
    dispatch({
      type: 'guilds/joinGuild',
      payload: { invitationCode },
    }).then((res: objectT) => {
      const { code } = res;
      if (code == 0) {
        setLoading(false);
        message.info('Success to join').then(() => {
          history.push('/');
        });
      } else {
        //   message.error('Join the failure');
      }
    });
    // if (userInfo?.uid) {

    // } else {
    //   history.push('/login');
    // }
  }, []);

  return <>{loading ? <Loading /> : ''}</>;
};
export default connect(
  ({ guilds, login }: { guilds: objectT; login: objectT }) => ({
    guilds,
    login,
  }),
)(joinGuild);
