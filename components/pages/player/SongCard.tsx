import { Box, Grid, Typography, makeStyles } from '@material-ui/core';
import Image from 'next/image';
import React, { FC } from 'react';

const useStyles = makeStyles(() => ({
  songCardRoot: {
    userSelect: 'none',
  },
  songCardImg: {
    width: '100%',
    height: 'auto',
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

export const SongCard: FC = () => {
  const classes = useStyles();

  return (
    <Box className={classes.songCardRoot}>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <img
            src="https://i.ytimg.com/vi/3bJkVSMs4dw/maxresdefault.jpg"
            className={classes.songCardImg}
            alt="song"
            width="100%"
            height="auto"
          />
        </Grid>
        <Grid item xs={8}>
          <Box textAlign="left">
            <Typography
              variant="subtitle2"
              noWrap
              className={classes.songCardTitle}
            >
              Chuyện “Sao kê”: Nghệ sĩ cần minh bạch trong hoạt động từ thiện |
              VTV24
            </Typography>
          </Box>
          <Box textAlign="left" mt={0.2}>
            <Typography
              variant="body2"
              noWrap
              className={classes.songCardDuration}
            >
              04:06 | Youtube
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
