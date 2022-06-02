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
  const [backTitle, setTitle] = useState('');
  const [role, setRole] = useState('GAMERS');
  useEffect(() => {
    if (roles) {
      setRole(roles[0].code);
      switch (roles[0].code) {
        case 'GAMERS':
          setTitle('MY GAME LIST');
          break;
        default:
          setTitle('LIST OF GAMES');
          break;
      }
    }
  }, [roles]);
  return (
    <>
      <Link to="/" className={styles['back']}>
        {`< ${backTitle}`}
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
