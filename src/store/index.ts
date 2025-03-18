import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './slices/counterSlice';
import userInfoReducer from './slices/userInfoSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    userInfo: userInfoReducer,
  },
});

// 為 TypeScript 導出類型
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
