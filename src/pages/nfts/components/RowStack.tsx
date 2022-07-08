import { Stack, StackProps } from '@mui/material';
import React from 'react';

const RowStack: React.FC<StackProps> = (props) => {
  const {
    alignItems = 'center',
    direction = 'row',
    children,
    ...reset
  } = props;
  return (
    <Stack alignItems={alignItems} direction={direction} {...reset}>
      {children}
    </Stack>
  );
};
export default RowStack;
