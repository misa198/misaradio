import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type Option = 'join' | 'create';

export interface LobbyState {
  option: Option;
}

const initialState: LobbyState = {
  option: 'create',
};

const lobbySlice = createSlice({
  name: 'lobby',
  initialState,
  reducers: {
    switch(state, action: PayloadAction<Option>) {
      state.option = action.payload;
    },
  },
});

export const lobbyActions = lobbySlice.actions;

export default lobbySlice.reducer;
