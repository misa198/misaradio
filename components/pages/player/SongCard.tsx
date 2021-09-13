import { Box, Grid, makeStyles, Typography, Tooltip } from '@material-ui/core';
import { defaultCoverUrl } from 'constants/config';
import { Song } from 'models/Song';
import { useRouter } from 'next/router';
import React, { FC, useMemo } from 'react';
import en from 'translations/en/player';
import vi from 'translations/vi/player';
import { timeNumberToString } from 'utils/formatTime';

const useStyles = makeStyles(() => ({
  songCardRoot: {
    padding: 0,
    userSelect: 'none',
    width: '100%',
    borderRadius: '5px',
    transition: 'all 200ms',
    marginBottom: '0.5rem',

    '&:hover': {
      backgroundColor: '#313131',
    },
  },
  songCardImgWrapper: {
    width: '100%',
    paddingBottom: '56.25%',
    position: 'relative',
    overflow: 'hidden',
    borderRadius: '0.25rem',
  },
  songCardImg: {
    width: '100%',
    height: 'auto',
    objectFit: 'cover',
    position: 'absolute',
    top: 0,
    lef: 0,
    borderRadius: '0.25rem',
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
  inQueue?: boolean;
}

export const SongCard: FC<PropTypes> = ({ song, inQueue = false }) => {
  const classes = useStyles();
  const router = useRouter();
  const { locale } = router;
  const t = locale === 'vi' ? vi : en;
  const time = useMemo(
    () => timeNumberToString(song.duration),
    [song.duration],
  );

  return (
    <Tooltip
      title={`${song.title} | ${song.author}`}
      enterDelay={1000}
      enterNextDelay={1000}
    >
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
                {time}
              </Typography>
            </Box>
            {!inQueue && (
              <Box textAlign="left" mt={0.65}>
                <Typography
                  variant="body2"
                  noWrap
                  className={classes.songCardUser}
                >
                  {song.author}
                </Typography>
              </Box>
            )}
            {song.orderBy && (
              <Box textAlign="left" mt={0.65}>
                <Typography
                  variant="body2"
                  noWrap
                  className={classes.songCardUser}
                >
                  {t.orderedBy} <b>{song.orderBy}</b>
                </Typography>
              </Box>
            )}
          </Grid>
        </Grid>
      </Box>
    </Tooltip>
  );
};
