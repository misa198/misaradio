import { Box, makeStyles } from '@material-ui/core';
import React, { FC } from 'react';

const useStyles = makeStyles(() => ({
  videoListBox: {
    padding: '0 !important',
    minHeight: '65vh',
  },
}));

export const VideoCardListBox: FC = () => {
  const classes = useStyles();

  return <Box className={classes.videoListBox}>csdc</Box>;
};
