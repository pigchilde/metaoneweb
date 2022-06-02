import { Stack } from '@mui/material';
import StarRateIcon from '@mui/icons-material/StarRate';
import { useMemo } from 'react';

interface NFTLevelProps {
  level: number;
  maxLevel?: number;
}

const NFTLevel: React.FC<NFTLevelProps> = ({ level, maxLevel = 5 }) => {
  const stars = useMemo(() => {
    const arr = [];
    for (let i = 1; i <= maxLevel; i++) {
      arr.push(
        <StarRateIcon
          key={i}
          style={{
            fontSize: 16,
            color: i <= level ? '#F05A23' : '#D5F8FF',
          }}
        />,
      );
    }
    return arr;
  }, [level, maxLevel]);

  return <Stack direction="row">{stars}</Stack>;
};
export default NFTLevel;
