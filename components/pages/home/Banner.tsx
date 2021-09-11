import { Box, Button, makeStyles, Typography } from '@material-ui/core';
import { useAppSelector } from 'app/hooks';
import { useRouter } from 'next/router';
import bannerBackground from 'public/banner.jpeg';
import React, { FC } from 'react';
import Link from 'next/link';
import en from 'translations/en/banner';
import vi from 'translations/vi/banner';

const useStyles = makeStyles(() => ({
  rootBanner: {
    paddingTop: '120px',
    paddingBottom: '120px',
    backgroundImage: `linear-gradient(
      0deg, rgba(0,0,0,0.9) 0%,
      rgba(0,0,0,0.85) 10%,
      rgba(0,0,0,0.6) 50%,
      rgba(0,0,0,0.85) 90%,
      rgba(0,0,0,0.9) 100%
    ), url(${bannerBackground.src})`,
    backgroundPosition: 'center',
    width: '100vw',
    minHeight: '100vh',
  },
  bannerTitle: {
    fontWeight: 500,
    lineHeight: 1.3,
  },
}));

export const Banner: FC = () => {
  const { locale } = useRouter();
  const t = locale === 'vi' ? vi : en;
  const classes = useStyles();
  const isLoggedIn = useAppSelector((state) => state.auth.login.loggedIn);

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
          <Typography variant="h6" component="p">
            {isLoggedIn ? t.loggedInBannerSubtitle : t.bannerSubtitle}
          </Typography>
        </Box>
        <Box mt={3}>
          {isLoggedIn ? (
            <Link href="/lobby">
              <a>
                <Button variant="contained" color="primary" size="large">
                  {t.lobby}
                </Button>
              </a>
            </Link>
          ) : (
            <Link href="/auth/register">
              <a>
                <Button variant="contained" color="primary" size="large">
                  {t.register}
                </Button>
              </a>
            </Link>
          )}
        </Box>
      </Box>
    </Box>
  );
};
