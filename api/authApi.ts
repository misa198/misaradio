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
