import { yupResolver } from '@hookform/resolvers/yup';
import {
  Box,
  Button,
  LinearProgress,
  makeStyles,
  Paper,
  TextField,
  Typography
} from '@material-ui/core';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { useRouter } from 'next/router';
import React, { FC } from 'react';
import { useForm } from 'react-hook-form';
import en from 'translations/en/auth';
import vi from 'translations/vi/auth';
import * as yup from 'yup';
import { register as registerThunk } from '../authThunk';

interface RegisterFormFields {
  email: string;
  password: string;
  name: string;
  confirmPassword: string;
}

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

export const RegisterForm: FC = () => {
  const { locale } = useRouter();
  const t = locale === 'vi' ? vi : en;
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const loading = useAppSelector((state) => state.auth.register.loading);

  const schema = yup.object().shape({
    email: yup.string().email(t.emailValidation).required(t.requiredValidation),
    name: yup.string().max(20, t.nameValidation).required(t.requiredValidation),
    password: yup
      .string()
      .min(6, t.passwordValidation)
      .required(t.requiredValidation),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password'), null], t.confirmPasswordValidation),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  function onSubmit(data: RegisterFormFields) {
    dispatch(
      registerThunk({
        email: data.email,
        password: data.password,
        name: data.name,
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
            {t.register}
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
        <Box>
          <TextField
            label={t.name}
            margin="normal"
            variant="outlined"
            fullWidth
            {...register('name')}
            helperText={errors.name?.message}
          />
        </Box>
        <Box>
          <TextField
            label={t.password}
            margin="normal"
            variant="outlined"
            fullWidth
            type="password"
            {...register('password')}
            helperText={errors.password?.message}
          />
        </Box>
        <Box>
          <TextField
            label={t.confirmPassword}
            margin="normal"
            variant="outlined"
            fullWidth
            type="password"
            {...register('confirmPassword')}
            helperText={errors.confirmPassword?.message}
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
