import { Box, Button, makeStyles } from '@material-ui/core';
import React, { FC } from 'react';
import { Add } from '@material-ui/icons';
import { SongCard } from '.';

const useStyles = makeStyles(() => ({
  videoListBox: {
    padding: '0 !important',
    minHeight: '65vh',
  },
}));

export const VideoCardListBox: FC = () => {
  const classes = useStyles();

  return (
    <Box display="flex" flexDirection="column" className={classes.videoListBox}>
      <Box flexGrow={1} width="100%">
        <SongCard />
        <SongCard />
        <SongCard />
        <SongCard />
        <SongCard />
      </Box>
      <Box pt={1}>
        <Button variant="contained" color="primary" fullWidth>
          <Add />
        </Button>
      </Box>
    </Box>
  );
};
