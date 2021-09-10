import { axiosInstance } from './axiosInstance';

export interface LoginPayload {
  email: string;
  password: string;
}

export const postLogin = ({ email, password }: LoginPayload) => {
  return axiosInstance.post('/auth/login', { email, password });
};

export const postLoginByGoogle = (accessToken: string) => {
  return axiosInstance.post('/auth/google', { accessToken });
};

export const getUserByToken = async (token: string) => {
  const res = await axiosInstance.get('/auth/user', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res;
};

export interface RegisterPayload {
  email: string;
  password: string;
  name: string;
}

export const postRegister = (payload: RegisterPayload) => {
  return axiosInstance.post('/auth/register', payload);
};

export interface ChangePasswordPayload {
  email: string;
  password: string;
  newPassword: string;
}

export const postChangePassword = (payload: ChangePasswordPayload) => {
  return axiosInstance.post('/auth/change-password', payload);
};

export interface ForgotPasswordPayload {
  email: string;
}

export const postForgotPassword = (payload: ForgotPasswordPayload) => {
  return axiosInstance.post('/auth/forgot-password', payload);
};

export interface ResetPasswordPayload {
  password: string;
  token: string;
}

export const postResetPassword = (payload: ResetPasswordPayload) => {
  return axiosInstance.post('/auth/reset-password', payload);
};
