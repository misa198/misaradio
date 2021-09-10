import { Box, Button, makeStyles, Typography } from '@material-ui/core';
import { Add, MusicNote } from '@material-ui/icons';
import { useRouter } from 'next/router';
import React, { FC } from 'react';
import en from 'translations/en/player';
import vi from 'translations/vi/player';

const useStyles = makeStyles(() => ({
  videoListBox: {
    padding: '0 !important',
    maxHeight: '65vh',
  },
}));

export const VideoCardListBox: FC = () => {
  const { locale } = useRouter();
  const t = locale === 'vi' ? vi : en;
  const classes = useStyles();

  return (
    <Box display="flex" flexDirection="column" className={classes.videoListBox}>
      <Box flexGrow={1} width="100%">
        {/* <SongCard />
        <SongCard />
        <SongCard />
        <SongCard />
        <SongCard /> */}
        <Box width="100%" pt={2} pb={2}>
          <MusicNote />
          <Typography variant="body1">{t.addMessage}</Typography>
        </Box>
      </Box>
      <Box pt={1}>
        <Button variant="contained" color="primary" fullWidth>
          <Add />
        </Button>
      </Box>
    </Box>
  );
};
