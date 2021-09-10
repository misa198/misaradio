import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  ChangePasswordPayload,
  ForgotPasswordPayload,
  LoginPayload,
  postChangePassword,
  postForgotPassword,
  postLogin,
  postLoginByGoogle,
  postRegister,
  postResetPassword,
  RegisterPayload,
  ResetPasswordPayload,
} from 'api/authApi';
import { push } from 'connected-next-router';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';

export interface LoginResponse {
  data: string;
}

export const login = createAsyncThunk<LoginResponse, LoginPayload>(
  'auth/login',
  async (query, { dispatch }) => {
    const res = await postLogin(query);
    Cookies.set('token', res.data);
    dispatch(push('/lobby'));
    return res;
  },
);

export const loginByGoogle = createAsyncThunk<LoginResponse, string>(
  'auth/loginByGoogle',
  async (accessToken, { dispatch }) => {
    const res = await postLoginByGoogle(accessToken);
    Cookies.set('token', res.data);
    dispatch(push('/lobby'));
    return res;
  },
);

export const register = createAsyncThunk<void, RegisterPayload>(
  'auth/register',
  async (query, { dispatch }) => {
    await postRegister(query);
    dispatch(push('/auth/login'));
    toast.success('Register successfully, please verify your email');
  },
);

export const changePassword = createAsyncThunk<void, ChangePasswordPayload>(
  'auth/changePassword',
  async (query, { dispatch }) => {
    await postChangePassword(query);
    dispatch(push('/auth/login'));
    toast.success('Change password successfully');
  },
);

export const forgotPassword = createAsyncThunk<void, ForgotPasswordPayload>(
  'auth/forgotPassword',
  async (query, { dispatch }) => {
    await postForgotPassword(query);
    dispatch(push('/auth/login'));
    toast.success('We have sent you a confirmation email');
  },
);

export const resetPassword = createAsyncThunk<void, ResetPasswordPayload>(
  'auth/resetPassword',
  async (query, { dispatch }) => {
    await postResetPassword(query);
    dispatch(push('/auth/login'));
    toast.success('Reset password successfully');
  },
);
