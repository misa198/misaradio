import axios, { AxiosResponse } from 'axios';

export const axiosInstance = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.response.use(
  function (response: AxiosResponse) {
    return response.data;
  },
  function (error) {
    if (error.response) {
      if (error.response.data) {
        return Promise.reject({
          message: error.response.data.message || 'Error',
        });
      }
    }
    return Promise.reject({ message: 'Error' });
  },
);
