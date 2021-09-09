import {
  Box,
  Button,
  makeStyles,
  Paper,
  TextField,
  Typography,
} from '@material-ui/core';
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
}));

export const ChangePasswordForm: FC = () => {
  const { locale } = useRouter();
  const t = locale === 'vi' ? vi : en;
  const classes = useStyles();

  return (
    <Paper elevation={0} className={classes.formRoot}>
      <form className={classes.formContainer}>
        <Box mb={1.5}>
          <Typography variant="h5" className={classes.formTitle}>
            {t.changePassword}
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
            label={t.oldPassword}
            margin="normal"
            variant="outlined"
            type="password"
            fullWidth
          />
        </Box>
        <Box>
          <TextField
            label={t.newPassword}
            margin="normal"
            variant="outlined"
            type="password"
            fullWidth
          />
        </Box>
        <Box>
          <TextField
            label={t.confirmNewPassword}
            margin="normal"
            variant="outlined"
            type="password"
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