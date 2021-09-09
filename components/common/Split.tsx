import { Box, makeStyles } from '@material-ui/core';
import React, { FC } from 'react';

const useStyles = makeStyles(() => ({
  splitRoot: {
    width: '100%',
    height: '0.5rem',
    backgroundColor: '#222',
  },
}));

export const Split: FC = () => {
  const classes = useStyles();

  return <Box className={classes.splitRoot} />;
};
