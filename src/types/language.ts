import { RootState } from '../store';

export type LanguageCode = 'en' | 'zh';

export interface LanguageState {
  currentLanguage: LanguageCode;
}

export const selectLanguage = (state: RootState): LanguageCode =>
  state.language.currentLanguage;
