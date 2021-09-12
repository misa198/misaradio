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
  playing?: Song;
  startAt: number;
}

const initialState: PlayerState = {
  search: {
    loading: false,
    error: false,
    data: [],
  },
  startAt: 0,
};

const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    clearSearchResult(state) {
      state.search.data = [];
    },
    updateRoom(state, action: PayloadAction<Room>) {
      state.room = action.payload;
    },
    addUser(state, action: PayloadAction<RoomUser>) {
      if (state.room) state.room.users.push(action.payload);
    },
    removeUser(state, action: PayloadAction<string>) {
      if (state.room) {
        state.room.users = state.room.users.filter(
          (user) => user.id !== action.payload,
        );
      }
    },
    updateQueue(state, action: PayloadAction<Song[]>) {
      if (state.room) {
        state.room.queue = action.payload;
      }
    },
    updatePlaying(
      state,
      action: PayloadAction<{ playing?: Song; startAt: number }>,
    ) {
      state.playing = action.payload.playing;
      state.startAt = action.payload.startAt;
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
