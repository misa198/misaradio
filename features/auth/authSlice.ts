import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import { login, LoginResponse } from './authThunk';

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
    builder.addCase(
      login.fulfilled,
      (state, action: PayloadAction<LoginResponse>) => {
        state.login.loading = false;
        state.login.loggedIn = true;
        Cookies.set('token', action.payload.data);
      },
    );
    builder.addCase(login.rejected, (state, action) => {
      state.login.loading = false;
      state.login.error = action.error.message as string;
      toast.error(action.error.message);
    });
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
