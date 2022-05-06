import styles from './index.scss';
import { useIntl, Link } from 'umi';
import { useState } from 'react';
import GuildList from './components/GuildList';
import GamerList from './components/GamerList';
const gameList = () => {
  const intl = useIntl();
  const [role, setRole] = useState('gamer');
  return (
    <>
      <Link to="/" className={styles['back']}>
        {role == 'gamer' ? 'MY GAME LIST' : ' LIST OF GAMES'}
      </Link>
      {role == 'gamer' ? <GamerList /> : <GuildList />}
    </>
  );
};
export default gameList;
