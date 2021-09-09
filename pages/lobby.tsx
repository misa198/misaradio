import { Box, makeStyles } from '@material-ui/core';
import { useAppSelector } from 'app/hooks';
import { CreateForm } from 'features/lobby/components/CreateForm';
import { JoinForm } from 'features/lobby/components/JoinForm';
import { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import bannerBackground from 'public/banner.jpeg';
import React from 'react';
import en from 'translations/en/lobby';
import vi from 'translations/vi/lobby';

const useStyles = makeStyles((theme) => ({
  pageRoot: {
    width: '100vw',
    minHeight: '100vh',
    paddingTop: '80px',
    backgroundImage: `linear-gradient(
      0deg, rgba(0,0,0,0.9) 0%,
      rgba(0,0,0,0.85) 10%,
      rgba(0,0,0,0.6) 50%,
      rgba(0,0,0,0.85) 90%,
      rgba(0,0,0,0.9) 100%
    ), url(${bannerBackground.src})`,
    backgroundPosition: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(4),
    width: '350px',
  },
  paperBox: {
    margin: 0,
    padding: 0,
  },
}));

const Lobby: NextPage = () => {
  const { locale } = useRouter();
  const t = locale === 'vi' ? vi : en;
  const classes = useStyles();
  const option = useAppSelector((state) => state.lobby.option);

  return (
    <>
      <Head>
        <title>{t.title} - Misa Radio</title>
      </Head>
      <Box
        className={classes.pageRoot}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        {option === 'join' ? <JoinForm /> : <CreateForm />}
      </Box>
    </>
  );
};

export default Lobby;
