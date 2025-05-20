import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LanguageCode, LanguageState } from '../../types/language';
import { RootState } from '..';

const initialState: LanguageState = {
  currentLanguage: 'en',
};

const languageSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    changeLanguage: (state, action: PayloadAction<LanguageCode>) => {
      state.currentLanguage = action.payload;
    },
  },
});

export const { changeLanguage } = languageSlice.actions;
export const selectLanguage = (state: RootState) =>
  state.language.currentLanguage;
export default languageSlice.reducer;
