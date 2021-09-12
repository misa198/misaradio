import {
  Box,
  Container,
  Grid,
  makeStyles,
  Paper,
  Modal,
  Fade,
  Typography,
  IconButton,
  Tooltip,
} from '@material-ui/core';
import { FilterNone, PeopleAlt } from '@material-ui/icons';
import { wrapper } from 'app/store';
import { VideoBox, VideoCardListBox } from 'components/pages/player';
import { authSSR } from 'libs/authSSR';
import { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import en from 'translations/en/player';
import vi from 'translations/vi/player';
import useSocket from 'app/socket';
import { ModalPopup } from 'features/player/components/ModalPopup';

const useStyles = makeStyles((theme) => ({
  pageRoot: {
    minHeight: '100vh',
    paddingBottom: '120px',
    paddingTop: '100px',
  },
  container: {
    padding: 0,
  },
  roomName: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    marginRight: '5px',
  },
  paper: {
    textAlign: 'center',
    backgroundColor: '#212121',
    color: theme.palette.text.secondary,
    padding: theme.spacing(1.5),
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

const Player: NextPage = () => {
  const router = useRouter();
  const { locale } = router;
  const t = locale === 'vi' ? vi : en;
  const classes = useStyles();
  const socket = useSocket();
  const [open, setOpen] = useState(false);

  function handleOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  useEffect(() => {
    if (!socket) {
      router.push('/lobby');
    }
  }, [router, socket]);

  return (
    <>
      <Head>
        <title>{t.title} - Misa Radio</title>
      </Head>
      {socket && (
        <>
          <Container className={classes.pageRoot}>
            <Box
              mb={2.2}
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <Box display="flex" alignItems="center">
                <Typography className={classes.roomName}>MisaRoom</Typography>
              </Box>
              <Box>
                <Tooltip title={t.copyRoomCode}>
                  <IconButton aria-label="copy" size="middle">
                    <FilterNone fontSize="small" />
                  </IconButton>
                </Tooltip>
                <Tooltip title={t.people}>
                  <IconButton aria-label="people" size="middle">
                    <PeopleAlt fontSize="middle" />
                  </IconButton>
                </Tooltip>
              </Box>
            </Box>
            <Box display="flex" justifyContent="center" alignItems="center">
              <Grid container spacing={3} className={classes.container}>
                <Grid item xs={12} md={8}>
                  <Paper className={classes.paper}>
                    <VideoBox />
                  </Paper>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Paper className={classes.paper}>
                    <VideoCardListBox handleOpen={handleOpen} />
                  </Paper>
                </Grid>
              </Grid>
            </Box>
          </Container>
          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal}
            open={open}
            onClose={handleClose}
            closeAfterTransition
          >
            <Fade in={open}>
              <div>
                <ModalPopup />
              </div>
            </Fade>
          </Modal>
        </>
      )}
    </>
  );
};

export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps((store) => async (context) => {
    const res = await authSSR(
      context.req.cookies,
      store.dispatch,
      context.res,
      true,
    );
    return res;
  });

export default Player;
