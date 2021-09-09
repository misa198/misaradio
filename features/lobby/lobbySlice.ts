import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type Option = 'join' | 'create';

export interface LobbyState {
  option: Option;
}

const initialState: LobbyState = {
  option: 'join',
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

export const authActions = lobbySlice.actions;

export default lobbySlice.reducer;
