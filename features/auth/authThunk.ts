import { createAsyncThunk } from '@reduxjs/toolkit';
import { LoginPayload, postLogin } from 'api/authApi';

export interface LoginResponse {
  data: string;
}

export const login = createAsyncThunk<LoginResponse, LoginPayload>(
  'blogs/fetchBlogs',
  async (query) => {
    const res = await postLogin(query);
    return res.data;
  },
);
