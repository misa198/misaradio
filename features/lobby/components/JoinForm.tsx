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
import React, { FC } from 'react';
import en from 'translations/en/lobby';
import vi from 'translations/vi/lobby';
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

export const JoinForm: FC = () => {
  const { locale } = useRouter();
  const t = locale === 'vi' ? vi : en;
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const socket = useSocket();

  function switchForm() {
    dispatch(lobbyActions.switch('create'));
  }

  return (
    <Paper elevation={0} className={classes.formRoot}>
      <form className={classes.formContainer}>
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
          />
        </Box>

        <Box mt={1.5}>
          <Button variant="contained" color="primary" size="large" fullWidth>
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
