import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { login, loginByGoogle } from './authThunk';

export interface AuthState {
  login: {
    loading: boolean;
    error: string | null;
    loggedIn: boolean;
  };
}

const initialState: AuthState = {
  login: {
    loading: false,
    error: null,
    loggedIn: false,
  },
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.login.loading = true;
      state.login.error = null;
      state.login.loggedIn = false;
    });
    builder.addCase(login.fulfilled, (state) => {
      state.login.loading = false;
      state.login.loggedIn = true;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.login.loading = false;
      state.login.error = action.error.message as string;
      toast.error(action.error.message);
    });

    builder.addCase(loginByGoogle.pending, (state) => {
      state.login.loading = true;
      state.login.error = null;
      state.login.loggedIn = false;
    });
    builder.addCase(loginByGoogle.fulfilled, (state) => {
      state.login.loading = false;
      state.login.loggedIn = true;
    });
    builder.addCase(loginByGoogle.rejected, (state, action) => {
      state.login.loading = false;
      state.login.error = action.error.message as string;
      toast.error(action.error.message);
    });
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
