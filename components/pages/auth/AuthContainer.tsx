import { Box, makeStyles } from '@material-ui/core';
import bannerBackground from 'public/banner.jpeg';
import React, { FC } from 'react';

const useStyles = makeStyles(() => ({
  authContainerRoot: {
    backgroundImage: `linear-gradient(
      0deg, rgba(0,0,0,0.9) 0%,
      rgba(0,0,0,0.85) 10%,
      rgba(0,0,0,0.6) 50%,
      rgba(0,0,0,0.85) 90%,
      rgba(0,0,0,0.9) 100%
    ), url(${bannerBackground.src})`,
    backgroundPosition: 'center',
    padding: '120px 0',
    width: '100vw',
    minHeight: '100vh',
  },
}));

export const AuthContainer: FC = ({ children }) => {
  const classes = useStyles();

  return (
    <Box
      className={classes.authContainerRoot}
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      {children}
    </Box>
  );
};
