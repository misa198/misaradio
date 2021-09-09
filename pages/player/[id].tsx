import { Container, Grid, makeStyles, Paper } from '@material-ui/core';
import { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';
import en from 'translations/en/player';
import vi from 'translations/vi/player';

const useStyles = makeStyles((theme) => ({
  pageRoot: {
    minHeight: '100vh',
    paddingTop: '120px',
  },
  container: {
    height: '75vh',
    padding: 0,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    backgroundColor: '#212121',
    color: theme.palette.text.secondary,
    height: '100%',
  },
}));

const Player: NextPage = () => {
  const { locale } = useRouter();
  const t = locale === 'vi' ? vi : en;
  const classes = useStyles();

  return (
    <>
      <Head>
        <title>{t.title} - Misa Radio</title>
      </Head>
      <Container className={classes.pageRoot}>
        <Grid container spacing={3} className={classes.container}>
          <Grid item xs={8}>
            <Paper className={classes.paper}>xs=6</Paper>
          </Grid>
          <Grid item xs={4}>
            <Paper className={classes.paper}>xs=6</Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Player;
