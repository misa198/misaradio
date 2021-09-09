import {
  Box,
  Button,
  makeStyles,
  Paper,
  TextField,
  Typography,
} from '@material-ui/core';
import { indigo } from '@material-ui/core/colors';
import { useRouter } from 'next/router';
import React, { FC } from 'react';
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
    color: '#000',
  },
  link: {
    textDecoration: 'underline',
  },
}));

export const ForgotPasswordForm: FC = () => {
  const { locale } = useRouter();
  const t = locale === 'vi' ? vi : en;
  const classes = useStyles();

  return (
    <Paper elevation={0} className={classes.formRoot}>
      <form className={classes.formContainer}>
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
          />
        </Box>

        <Box mt={1.5}>
          <Button variant="contained" color="primary" size="large" fullWidth>
            {t.confirm}
          </Button>
        </Box>
      </form>
    </Paper>
  );
};
