import {
  Box,
  Container,
  Grid,
  Typography,
  makeStyles,
  Paper,
} from '@material-ui/core';
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
    padding: 0,
  },
  paper: {
    textAlign: 'center',
    backgroundColor: '#212121',
    color: theme.palette.text.secondary,
    padding: theme.spacing(1.5),
  },
  videoBox: {
    padding: '0 !important',
  },
  videoListBox: {
    padding: '0 !important',
    minHeight: '65vh',
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
                <Box
                  display="flex"
                  flexDirection="column"
                  className={classes.videoBox}
                >
                  <Box>
                    <iframe
                      style={{ width: '100%' }}
                      frameBorder="0"
                      allowFullScreen
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      title="YouTube video player"
                      width="640"
                      height="400"
                      src="https://www.youtube.com/embed/jXpdAJcrTVs?autoplay=1&amp;controls=0&amp;mute=1&amp;start=1&amp;enablejsapi=1&amp;origin=https%3A%2F%2Fongdev.cool&amp;widgetid=1"
                    />
                  </Box>

                  <Box width="100%" mt={2} textAlign="left">
                    <Box>
                      <Typography variant="h6">
                        Chuyện “Sao kê”: Nghệ sĩ cần minh bạch trong hoạt động
                        từ thiện | VTV24
                      </Typography>
                    </Box>
                    <Box mt={1}>
                      <Typography variant="body2">
                        {t.duration}: 04:06 | Youtube
                      </Typography>
                    </Box>
                    <Box mt={1}>
                      <Typography variant="body2">
                        {t.member} <b>Misa198</b>
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper className={classes.paper}>
                <Box className={classes.videoListBox}>csdc</Box>
              </Paper>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
};

export default Player;
