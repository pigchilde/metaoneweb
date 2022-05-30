import styles from './index.scss';
import { useIntl, Link } from 'umi';
import { connect } from 'dva';
import { useEffect, useState } from 'react';
import GuildList from './components/GuildList';
import GamerList from './components/GamerList';
interface objectT {
  [propName: string]: any;
}
const gameList = (props: objectT) => {
  const intl = useIntl();
  const {
    location = {},
    dispatch,
    gamefi = {},
    match = {},
    login: {
      userInfo: { roles },
    },
  } = props;
  const [role, setRole] = useState('Guild');
  useEffect(() => {
    roles && setRole(roles[0].code);
  }, []);
  return (
    <>
      <Link to="/" className={styles['back']}>
        {'< '}
        {role == 'GAMERS' ? 'MY GAME LIST' : ' LIST OF GAMES'}
      </Link>
      {role == 'GAMERS' ? <GamerList /> : <GuildList />}
    </>
  );
};
export default connect(
  ({ gamefi, login }: { gamefi: objectT; login: objectT }) => ({
    gamefi,
    login,
  }),
)(gameList);
