import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Song } from 'models/Song';
import { toast } from 'react-toastify';
import { searchSongs, SearchResponse } from './playerThunk';

export interface PlayerState {
  search: {
    loading: boolean;
    error: boolean;
    data: Song[];
  };
}

const initialState: PlayerState = {
  search: {
    loading: false,
    error: false,
    data: [],
  },
};

const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    clearSearchResult(state) {
      state.search.data = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(searchSongs.pending, (state) => {
      state.search.loading = true;
      state.search.error = false;
      state.search.data = [];
    });
    builder.addCase(
      searchSongs.fulfilled,
      (state, action: PayloadAction<SearchResponse>) => {
        state.search.loading = false;
        state.search.data = action.payload.data;
      },
    );
    builder.addCase(searchSongs.rejected, (state, action) => {
      state.search.loading = false;
      state.search.error = true;
      toast.error(action.error.message);
    });
  },
});

export const playerActions = playerSlice.actions;

export default playerSlice.reducer;
