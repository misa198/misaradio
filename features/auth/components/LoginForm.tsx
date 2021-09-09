import {
  Box,
  Button,
  makeStyles,
  Paper,
  TextField,
  Typography,
} from '@material-ui/core';
import { indigo } from '@material-ui/core/colors';
import { Facebook } from '@material-ui/icons';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { FC } from 'react';
import { GoogleLogin } from 'react-google-login';
import { FcGoogle } from 'react-icons/fc';
import en from 'translations/en/auth';
import vi from 'translations/vi/auth';

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
}));

export const LoginForm: FC = () => {
  const { locale } = useRouter();
  const t = locale === 'vi' ? vi : en;
  const classes = useStyles();

  const responseGoogle = (response: any) => {
    console.log(response);
  };

  function onGoogleLogin() {}

  return (
    <Paper elevation={0} className={classes.formRoot}>
      <form className={classes.formContainer}>
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
          />
        </Box>
        <Box>
          <TextField
            label={t.password}
            margin="normal"
            variant="outlined"
            fullWidth
          />
        </Box>

        <Box mt={1.5}>
          <Button variant="contained" color="primary" size="large" fullWidth>
            {t.confirm}
          </Button>
        </Box>
        <Box mt={1.5}>
          <GoogleLogin
            clientId="771590027336-pd5q1mo51tf7m1b27eki00tdcmmi3min.apps.googleusercontent.com"
            render={(renderProps) => (
              <Button
                variant="contained"
                size="large"
                fullWidth
                startIcon={<FcGoogle />}
                className={classes.googleButton}
                disabled={renderProps.disabled}
                onClick={renderProps.onClick}
              >
                {t.google}
              </Button>
            )}
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={'single_host_origin'}
          />
        </Box>
        <Box mt={1.5}>
          <Button
            variant="contained"
            size="large"
            fullWidth
            startIcon={<Facebook />}
            className={classes.facebookButton}
          >
            {t.facebook}
          </Button>
        </Box>
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
