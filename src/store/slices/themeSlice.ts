import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type ThemeMode = 'dark' | 'gray';

export interface ThemeState {
  mode: ThemeMode;
}

const THEME_KEY = 'theme_mode';

const getInitialTheme = (): ThemeMode => {
  const saved = localStorage.getItem(THEME_KEY) as ThemeMode | null;
  return saved || 'dark';
};

const applyTheme = (mode: ThemeMode) => {
  document.documentElement.setAttribute('data-theme', mode);
};

const initialState: ThemeState = {
  mode: getInitialTheme(),
};

// 初始化时应用主题
if (typeof window !== 'undefined') {
  applyTheme(initialState.mode);
}

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<ThemeMode>) => {
      state.mode = action.payload;
      localStorage.setItem(THEME_KEY, action.payload);
      applyTheme(action.payload);
    },
    toggleTheme: (state) => {
      const newMode: ThemeMode = state.mode === 'dark' ? 'gray' : 'dark';
      state.mode = newMode;
      localStorage.setItem(THEME_KEY, newMode);
      applyTheme(newMode);
    },
  },
});

export const { setTheme, toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
