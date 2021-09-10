import { createSlice, PayloadAction } from '@reduxjs/toolkit';

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

export interface LoginPayload {
  email: string;
  password: string;
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state) {
      state.login.loading = true;
      state.login.error = null;
      state.login.loggedIn = false;
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
