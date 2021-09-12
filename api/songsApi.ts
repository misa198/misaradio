import queryString from 'query-string';
import { axiosInstance } from './axiosInstance';

export interface SearchPayload {
  query: string;
}

export const getSearch = ({ query }: SearchPayload, token: string) => {
  return axiosInstance.get(
    `/songs?${queryString.stringify({
      query,
    })}`,
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
    },
  );
};
