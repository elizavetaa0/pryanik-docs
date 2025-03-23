import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../../entities/user/model/userSlice';
import documentReducer from '../../entities/document/model/documentSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    document: documentReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
