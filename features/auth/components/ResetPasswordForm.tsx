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
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { useRouter } from 'next/router';
import React, { FC } from 'react';
import { useForm } from 'react-hook-form';
import en from 'translations/en/auth';
import vi from 'translations/vi/auth';
import * as yup from 'yup';
import { resetPassword } from '../authThunk';

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

interface ResetPasswordFormFields {
  newPassword: string;
  confirmNewPassword: string;
}

export const ResetPasswordForm: FC = () => {
  const router = useRouter();
  const { locale } = router;
  const t = locale === 'vi' ? vi : en;
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const loading = useAppSelector((state) => state.auth.changePassword.loading);

  const schema = yup.object().shape({
    newPassword: yup
      .string()
      .min(6, t.passwordValidation)
      .required(t.requiredValidation),
    confirmNewPassword: yup
      .string()
      .oneOf([yup.ref('newPassword'), null], t.confirmPasswordValidation),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  function onSubmit(data: ResetPasswordFormFields) {
    dispatch(
      resetPassword({
        password: data.newPassword,
        token: router.query.token as string,
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
            {t.resetPassword}
          </Typography>
        </Box>
        <Box>
          <TextField
            label={t.newPassword}
            margin="normal"
            variant="outlined"
            type="password"
            fullWidth
            {...register('newPassword')}
            helperText={errors.newPassword?.message}
          />
        </Box>
        <Box>
          <TextField
            label={t.confirmNewPassword}
            margin="normal"
            variant="outlined"
            type="password"
            fullWidth
            {...register('confirmNewPassword')}
            helperText={errors.confirmNewPassword?.message}
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
