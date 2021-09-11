import { createSlice } from '@reduxjs/toolkit';
import { Song } from 'models/Song';
import { toast } from 'react-toastify';
import { searchSongs } from './playerThunk';

export interface PlayerState {
  search: {
    loading: boolean;
    error: boolean;
    results: Song[];
  };
}

const initialState: PlayerState = {
  search: {
    loading: false,
    error: false,
    results: [],
  },
};

const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(searchSongs.pending, (state) => {
      state.search.loading = true;
      state.search.error = false;
    });
    builder.addCase(searchSongs.fulfilled, (state) => {
      state.search.loading = false;
    });
    builder.addCase(searchSongs.rejected, (state, action) => {
      state.search.loading = false;
      state.search.error = true;
      toast.error(action.error.message);
    });
  },
});

export const playerActions = playerSlice.actions;

export default playerSlice.reducer;
