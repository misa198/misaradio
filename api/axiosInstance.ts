import axios, { AxiosResponse } from 'axios';
import { baseApiUrl } from 'constants/config';

export const axiosInstance = axios.create({
  baseURL: baseApiUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.response.use(
  // eslint-disable-next-line func-names
  function (response: AxiosResponse) {
    return response.data;
  },
  // eslint-disable-next-line func-names
  function (error) {
    if (error.response) {
      if (error.response.data) {
        // eslint-disable-next-line prefer-promise-reject-errors
        return Promise.reject({
          message: error.response.data.message || 'Error',
        });
      }
    }
    // eslint-disable-next-line prefer-promise-reject-errors
    return Promise.reject({ message: 'Error' });
  },
);
