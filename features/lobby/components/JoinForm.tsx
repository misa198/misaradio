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
import { push } from 'connected-next-router';
import { useRouter } from 'next/router';
import React, { FC } from 'react';
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

interface JoinFormProps {
  code: string;
}

export const JoinForm: FC = () => {
  const { locale } = useRouter();
  const t = locale === 'vi' ? vi : en;
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const socket = useSocket();

  const schema = yup.object().shape({
    code: yup.string().length(6, t.codeLength).required(t.require),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  function switchForm() {
    dispatch(lobbyActions.switch('create'));
  }

  function onSubmit(value: JoinFormProps) {
    if (socket) {
      dispatch(push(`/player/${value.code}`));
    } else {
      toast.info(t.socketNull);
    }
  }

  return (
    <Paper elevation={0} className={classes.formRoot}>
      <form onSubmit={handleSubmit(onSubmit)} className={classes.formContainer}>
        <Box mb={1.5}>
          <Typography variant="h5" className={classes.formTitle}>
            {t.join}
          </Typography>
        </Box>
        <Box>
          <TextField
            label={t.code}
            margin="normal"
            variant="outlined"
            fullWidth
            {...register('code')}
            helperText={errors.code?.message}
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
            {t.create}
          </Button>
        </Box>
      </form>
    </Paper>
  );
};
