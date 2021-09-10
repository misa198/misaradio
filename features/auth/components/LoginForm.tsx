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
import { indigo } from '@material-ui/core/colors';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { googleClientId } from 'constants/config';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { FC } from 'react';
import { GoogleLogin } from 'react-google-login';
import { useForm } from 'react-hook-form';
import { FcGoogle } from 'react-icons/fc';
import { toast } from 'react-toastify';
import en from 'translations/en/auth';
import vi from 'translations/vi/auth';
import * as yup from 'yup';
import { login, loginByGoogle } from '../authThunk';

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
  facebookButton: {
    backgroundColor: `${indigo[500]} !important`,
    color: '#fff !important',
  },
  googleButton: {
    backgroundColor: 'white !important',
    color: '#000 !important',
  },
  link: {
    textDecoration: 'underline',
  },
  loading: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
}));

interface LoginFormFields {
  email: string;
  password: string;
}

export const LoginForm: FC = () => {
  const { locale } = useRouter();
  const t = locale === 'vi' ? vi : en;
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const loading = useAppSelector((state) => state.auth.login.loading);

  const schema = yup.object().shape({
    email: yup.string().email(t.emailValidation).required(t.requiredValidation),
    password: yup
      .string()
      .min(6, t.passwordValidation)
      .required(t.requiredValidation),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onLoginByGoogleFulfilled = (response: any) => {
    dispatch(loginByGoogle(response.accessToken));
  };

  const onLoginByGoogleRejected = () => {
    toast.error(t.commonErrorMessage);
  };

  function onLoginByEmail(data: LoginFormFields) {
    dispatch(login(data));
  }

  return (
    <Paper elevation={0} className={classes.formRoot}>
      <Box width="100%" className={classes.loading}>
        {loading && <LinearProgress color="primary" />}
      </Box>
      <form
        onSubmit={handleSubmit(onLoginByEmail)}
        className={classes.formContainer}
      >
        <Box mb={1.5}>
          <Typography variant="h5" className={classes.formTitle}>
            {t.login}
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
            {...register('password')}
            label={t.password}
            margin="normal"
            variant="outlined"
            fullWidth
            helperText={errors.password?.message}
          />
        </Box>

        <Box mt={1.5}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            fullWidth
            type="submit"
            disabled={loading}
          >
            {t.confirm}
          </Button>
        </Box>
        <Box mt={1.5}>
          <GoogleLogin
            clientId={googleClientId}
            render={(renderProps) => (
              <Button
                variant="contained"
                size="large"
                fullWidth
                startIcon={<FcGoogle />}
                className={classes.googleButton}
                disabled={renderProps.disabled || loading}
                onClick={renderProps.onClick}
              >
                {t.google}
              </Button>
            )}
            onSuccess={onLoginByGoogleFulfilled}
            onFailure={onLoginByGoogleRejected}
            cookiePolicy="single_host_origin"
          />
        </Box>
        {/* <Box mt={1.5}>
          <Button
            variant="contained"
            size="large"
            fullWidth
            startIcon={<Facebook />}
            className={classes.facebookButton}
          >
            {t.facebook}
          </Button>
        </Box> */}
        <Box mt={2} textAlign="center">
          <Link href="/auth/forgot-password">
            <a>
              <Typography variant="body2" className={classes.link}>
                {t.forgotPassword}
              </Typography>
            </a>
          </Link>
        </Box>
        <Box mt={1} textAlign="center">
          <Link href="/auth/change-password">
            <a>
              <Typography variant="body2" className={classes.link}>
                {t.changePassword}
              </Typography>
            </a>
          </Link>
        </Box>
        <Box mt={1} textAlign="center">
          <Link href="/auth/register">
            <a>
              <Typography variant="body2" className={classes.link}>
                {t.register}
              </Typography>
            </a>
          </Link>
        </Box>
      </form>
    </Paper>
  );
};
