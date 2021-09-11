import { yupResolver } from '@hookform/resolvers/yup';
import {
  Box,
  Button,
  makeStyles,
  Paper,
  TextField,
  Typography,
} from '@material-ui/core';
import { useAppDispatch } from 'app/hooks';
import useSocket from 'app/socket';
import { useRouter } from 'next/router';
import React, { FC, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import en from 'translations/en/lobby';
import vi from 'translations/vi/lobby';
import * as yup from 'yup';
import { lobbyActions } from '../lobbySlice';

const useStyles = makeStyles((theme) => ({
  formRoot: {
    width: '350px',
    backgroundColor: theme.palette.background.paper,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  formContainer: {
    width: '100%',
  },
  formTitle: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
}));

interface CreateRoomFormFields {
  name: string;
}

export const CreateForm: FC = () => {
  const router = useRouter();
  const { locale } = router;
  const t = locale === 'vi' ? vi : en;
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const socket = useSocket();
  const schema = yup.object().shape({
    name: yup.string().max(20, t.nameMaxLength).required(t.require),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  function switchForm() {
    dispatch(lobbyActions.switch('join'));
  }

  function onSubmit(value: CreateRoomFormFields) {
    if (socket)
      socket.emit('create-room', {
        name: value.name,
      });
    else {
      toast.info(t.socketNull);
    }
  }

  useEffect((): any => {
    if (socket) {
      socket.on('create-room-success', (payload: { roomId: string }) => {
        toast.success(t.createRoomSuccess);
        router.push(`/player/${payload.roomId}`);
      });
      return () => socket.off('create-room-success');
    }
  }, [router, socket, t.createRoomSuccess]);

  return (
    <Paper elevation={0} className={classes.formRoot}>
      <form onSubmit={handleSubmit(onSubmit)} className={classes.formContainer}>
        <Box mb={1.5}>
          <Typography variant="h5" className={classes.formTitle}>
            {t.create}
          </Typography>
        </Box>
        <Box>
          <TextField
            label={t.name}
            margin="normal"
            variant="outlined"
            fullWidth
            {...register('name')}
            helperText={errors.name?.message}
            autoComplete="off"
          />
        </Box>

        <Box mt={1.5}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            fullWidth
            type="submit"
          >
            {t.confirm}
          </Button>
        </Box>
        <Box mt={1}>
          <Button
            variant="outlined"
            color="primary"
            size="large"
            fullWidth
            onClick={switchForm}
          >
            {t.join}
          </Button>
        </Box>
      </form>
    </Paper>
  );
};
