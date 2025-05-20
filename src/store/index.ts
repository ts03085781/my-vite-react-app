import { configureStore } from '@reduxjs/toolkit';
import userInfoReducer from './slices/userInfoSlice';
import themeReducer from './slices/themeSlice';
import languageReducer from './slices/languageSlice';

export const store = configureStore({
  reducer: {
    userInfo: userInfoReducer,
    theme: themeReducer,
    language: languageReducer,
  },
});

// 為 TypeScript 導出類型
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
