import { Box, Grid, makeStyles, Typography } from '@material-ui/core';
import { Song } from 'models/Song';
import React, { FC } from 'react';
import { defaultCoverUrl } from 'constants/config';

const useStyles = makeStyles(() => ({
  songCardRoot: {
    userSelect: 'none',
    width: '100%',
  },
  songCardImgWrapper: {
    width: '100%',
    paddingBottom: '56.25%',
    position: 'relative',
    overflow: 'hidden',
  },
  songCardImg: {
    width: '100%',
    height: 'auto',
    borderRadius: '0.25rem',
    objectFit: 'cover',
    position: 'absolute',
    top: 0,
    lef: 0,
  },
  songCardTitle: {
    fontWeight: 700,
  },
  songCardDuration: {
    fontSize: '0.8rem',
  },
  songCardUser: {
    fontSize: '0.8rem',
  },
}));

interface PropTypes {
  song: Song;
}

export const SongCard: FC<PropTypes> = ({ song }) => {
  const classes = useStyles();

  return (
    <Box className={classes.songCardRoot}>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
            className={classes.songCardImgWrapper}
          >
            <img
              src={song.cover || defaultCoverUrl}
              className={classes.songCardImg}
              alt="song"
              width="100%"
              height="auto"
            />
          </Box>
        </Grid>
        <Grid item xs={8}>
          <Box textAlign="left">
            <Typography
              variant="subtitle2"
              noWrap
              className={classes.songCardTitle}
            >
              {song.title}
            </Typography>
          </Box>
          <Box textAlign="left" mt={0.2}>
            <Typography
              variant="body2"
              noWrap
              className={classes.songCardDuration}
            >
              04:06 | {song.platform === 'youtube' ? 'YouTube' : 'SoundCloud'}
            </Typography>
          </Box>
          <Box textAlign="left" mt={0.65}>
            <Typography variant="body2" noWrap className={classes.songCardUser}>
              Add by VTV24
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};
