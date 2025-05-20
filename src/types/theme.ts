import { RootState } from '../store';

export type ThemeMode = 'light' | 'dark';

export interface ThemeState {
  currentTheme: ThemeMode;
}

export const selectTheme = (state: RootState): ThemeMode =>
  state.theme.currentTheme;
