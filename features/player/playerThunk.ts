import { createAsyncThunk } from '@reduxjs/toolkit';
import { getSearch, SearchPayload } from 'api/songsApi';
import { push } from 'connected-next-router';
import Cookies from 'js-cookie';
import { Song } from 'models/Song';

export interface SearchResponse {
  data: Song[];
}

export const searchSongs = createAsyncThunk<SearchResponse, SearchPayload>(
  'songs/search',
  async (query, { dispatch }) => {
    const token = Cookies.get('token');
    if (token) {
      const res = await getSearch(query, token);
      return res;
    }
    dispatch(push('/auth/login'));
    return { data: [] };
  },
);
