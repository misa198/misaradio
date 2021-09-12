import {
  Box,
  Container,
  Fade,
  Grid,
  IconButton,
  makeStyles,
  Modal,
  Paper,
  Tooltip,
  Typography,
} from '@material-ui/core';
import { FilterNone, PeopleAlt } from '@material-ui/icons';
import useSocket from 'app/socket';
import { wrapper } from 'app/store';
import { VideoBox, VideoCardListBox } from 'components/pages/player';
import { ModalPopup } from 'features/player/components/ModalPopup';
import { authSSR } from 'libs/authSSR';
import { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import en from 'translations/en/player';
import vi from 'translations/vi/player';
import { Room } from 'models/Room';
import { RoomUser } from 'models/RoomUser';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { playerActions } from 'features/player/playerSlice';

const useStyles = makeStyles((theme) => ({
  pageRoot: {
    minHeight: '100vh',
    paddingBottom: '120px',
    paddingTop: '100px',
  },
  container: {
    padding: 0,
  },
  roomNameWrapper: {
    overflow: 'hidden',
  },
  roomName: {
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    fontSize: '1.5rem',
    fontWeight: 'bold',
    marginRight: '5px',
    textOverflow: 'ellipsis',
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
  const dispatch = useAppDispatch();
  const room = useAppSelector((state) => state.player.room);
  const currentUser = useAppSelector((state) => state.auth.login.user);

  function handleOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  useEffect(() => {
    const { id } = router.query;
    if (socket) {
      socket.emit('join-room', {
        roomId: id,
      });
    }
  }, [router, socket]);

  useEffect((): any => {
    if (socket) {
      socket.on('join-room-fail', () => {
        router.push('/lobby');
        toast.error(t.joinRoomFail);
      });
      return () => socket.off('join-room-fail');
    }
  }, [socket, router, t.joinRoomFail]);

  useEffect((): any => {
    if (socket) {
      socket.on('join-room-success', (payload: { room: Room }) => {
        dispatch(playerActions.setRoom(payload.room));
      });
      return () => socket.off('join-room-success');
    }
  }, [socket, router, dispatch]);

  useEffect((): any => {
    if (socket) {
      socket.on('join-room', (payload: { user: RoomUser }) => {
        if (currentUser?.id !== payload.user.userId) {
          toast.info(`${payload.user.name} ${t.joinedRoom}`);
        }
        dispatch(playerActions.addUser(payload.user));
      });
      return () => socket.off('join-room');
    }
  }, [socket, router, t.joinedRoom, dispatch, currentUser]);

  useEffect((): any => {
    if (socket) {
      socket.on('leave-room', (payload: { userId: string }) => {
        dispatch(playerActions.removeUser(payload.userId));
      });
      return () => socket.off('leave-room');
    }
  }, [socket, router, t.joinedRoom, dispatch, currentUser]);

  return (
    <>
      <Head>
        <title>{t.title} - Misa Radio</title>
      </Head>
      {socket && room && (
        <>
          <Container className={classes.pageRoot}>
            <Box
              mb={2.2}
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <Box
                display="flex"
                alignItems="center"
                flexGrow={1}
                className={classes.roomNameWrapper}
              >
                <Typography className={classes.roomName}>
                  Những con người văn minh
                </Typography>
              </Box>
              <Box display="flex" width="fit-content">
                <Tooltip title={t.copyRoomCode}>
                  <IconButton aria-label="copy" size="medium">
                    <FilterNone fontSize="small" />
                  </IconButton>
                </Tooltip>
                <Tooltip title={t.people}>
                  <IconButton aria-label="people" size="medium">
                    <PeopleAlt fontSize="medium" />
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
