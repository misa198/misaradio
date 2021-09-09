import { Box, Container, Grid, makeStyles, Paper } from '@material-ui/core';
import { VideoBox, VideoCardListBox } from 'components/pages/player';
import { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';
import en from 'translations/en/player';
import vi from 'translations/vi/player';

const useStyles = makeStyles((theme) => ({
  pageRoot: {
    paddingBottom: '70px',
    paddingTop: '120px',
  },
  container: {
    padding: 0,
  },
  paper: {
    textAlign: 'center',
    backgroundColor: '#212121',
    color: theme.palette.text.secondary,
    padding: theme.spacing(1.5),
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
        <Box display="flex" justifyContent="center" alignItems="center">
          <Grid container spacing={3} className={classes.container}>
            <Grid item xs={12} md={8}>
              <Paper className={classes.paper}>
                <VideoBox />
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper className={classes.paper}>
                <VideoCardListBox />
              </Paper>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
};

export default Player;
