import { yupResolver } from '@hookform/resolvers/yup';
import {
  Box,
  Button,
  LinearProgress,
  makeStyles,
  Paper,
  TextField,
  Typography,
} from '@material-ui/core';
import { useRouter } from 'next/router';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { useForm } from 'react-hook-form';
import React, { FC } from 'react';
import en from 'translations/en/auth';
import vi from 'translations/vi/auth';
import * as yup from 'yup';
import { forgotPassword } from '../authThunk';

const useStyles = makeStyles((theme) => ({
  formRoot: {
    width: '350px',
    backgroundColor: theme.palette.background.paper,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
    position: 'relative',
    overflow: 'hidden',
  },
  formContainer: {
    width: '100%',
  },
  formTitle: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
  loading: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
}));

interface ForgotPasswordFormFields {
  email: string;
}

export const ForgotPasswordForm: FC = () => {
  const { locale } = useRouter();
  const t = locale === 'vi' ? vi : en;
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const loading = useAppSelector((state) => state.auth.forgotPassword.loading);

  const schema = yup.object().shape({
    email: yup.string().email(t.emailValidation).required(t.requiredValidation),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  function onSubmit(data: ForgotPasswordFormFields) {
    dispatch(
      forgotPassword({
        email: data.email,
      }),
    );
  }

  return (
    <Paper elevation={0} className={classes.formRoot}>
      <Box width="100%" className={classes.loading}>
        {loading && <LinearProgress color="primary" />}
      </Box>
      <form onSubmit={handleSubmit(onSubmit)} className={classes.formContainer}>
        <Box mb={1.5}>
          <Typography variant="h5" className={classes.formTitle}>
            {t.forgotPassword}
          </Typography>
        </Box>
        <Box>
          <TextField
            label={t.email}
            margin="normal"
            variant="outlined"
            fullWidth
            {...register('email')}
            helperText={errors.email?.message}
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
      </form>
    </Paper>
  );
};
