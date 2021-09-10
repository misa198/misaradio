import { axiosInstance } from './axiosInstance';

export interface LoginPayload {
  email: string;
  password: string;
}

export const postLogin = ({ email, password }: LoginPayload) => {
  return axiosInstance.post('/auth/login', { email, password });
};
