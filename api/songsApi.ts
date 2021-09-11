import queryString from 'query-string';
import { axiosInstance } from './axiosInstance';

export interface SearchPayload {
  type: string;
  query: string;
}

export const getSearch = ({ type, query }: SearchPayload, token: string) => {
  return axiosInstance.get(
    `/songs?${queryString.stringify({
      type,
      query,
    })}`,
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
    },
  );
};
