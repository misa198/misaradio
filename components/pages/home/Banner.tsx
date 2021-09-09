import { Box, makeStyles, Typography } from '@material-ui/core';
import { useRouter } from 'next/router';
import bannerBackground from 'public/banner.jpeg';
import React, { FC } from 'react';
import en from 'translations/en/banner';
import vi from 'translations/vi/banner';

const useStyles = makeStyles(() => ({
  rootBanner: {
    backgroundImage: `linear-gradient(
      0deg, rgba(0,0,0,0.9) 0%,
      rgba(0,0,0,0.85) 10%,
      rgba(0,0,0,0.6) 50%,
      rgba(0,0,0,0.85) 90%,
      rgba(0,0,0,0.9) 100%
    ), url(${bannerBackground.src})`,
    backgroundPosition: 'center',
    width: '100vw',
    height: '100vh',
  },
  bannerTitle: {
    fontWeight: 500,
    lineHeight: 1.3,
  },
  bannerSubtitle: {},
}));

export const Banner: FC = () => {
  const { locale } = useRouter();
  const t = locale === 'vi' ? vi : en;
  const classes = useStyles();

  return (
    <Box
      component="div"
      className={classes.rootBanner}
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Box textAlign="center" px={4} maxWidth={750}>
        <Box mb={1}>
          <Typography
            variant="h2"
            component="h2"
            className={classes.bannerTitle}
          >
            {t.bannerTitle}
          </Typography>
        </Box>
        <Box>
          <Typography variant="h6" component="h6">
            {t.bannerSubtitle}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};
