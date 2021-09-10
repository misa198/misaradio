import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  ChangePasswordPayload,
  LoginPayload,
  postChangePassword,
  postLogin,
  postLoginByGoogle,
  postRegister,
  RegisterPayload,
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
