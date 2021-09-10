import { createAsyncThunk } from '@reduxjs/toolkit';
import { LoginPayload, postLogin, postLoginByGoogle } from 'api/authApi';

export interface LoginResponse {
  data: string;
}

export const login = createAsyncThunk<LoginResponse, LoginPayload>(
  'auth/login',
  async (query) => postLogin(query),
);

export const loginByGoogle = createAsyncThunk<LoginResponse, string>(
  'auth/loginByGoogle',
  async (accessToken) => postLoginByGoogle(accessToken),
);
