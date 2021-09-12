import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Song } from 'models/Song';
import { Room } from 'models/Room';
import { RoomUser } from 'models/RoomUser';
import { toast } from 'react-toastify';
import { searchSongs, SearchResponse } from './playerThunk';

export interface PlayerState {
  search: {
    loading: boolean;
    error: boolean;
    data: Song[];
  };
  room?: Room;
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
    setRoom(state, action: PayloadAction<Room>) {
      state.room = action.payload;
    },
    addUser(state, action: PayloadAction<RoomUser>) {
      if (state.room) state.room.users.push(action.payload);
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
