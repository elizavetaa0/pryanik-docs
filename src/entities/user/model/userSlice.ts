import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from './userTypes';

const initialState: IUser = {
  username: localStorage.getItem('username') || '',
  token: localStorage.getItem('token') || '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login(state, action: PayloadAction<{ username: string; token: string }>) {
      state.username = action.payload.username;
      state.token = action.payload.token;

      localStorage.setItem('username', action.payload.username);
      localStorage.setItem('token', action.payload.token);
    },

    logout(state) {
      state.username = null;
      state.token = null;
      localStorage.removeItem('username');
      localStorage.removeItem('token');
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
