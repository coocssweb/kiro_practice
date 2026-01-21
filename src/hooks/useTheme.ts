import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '@/store';
import { setTheme, toggleTheme, ThemeMode } from '@/store/slices/themeSlice';

export const useTheme = () => {
  const dispatch = useAppDispatch();
  const mode = useAppSelector((state) => state.theme.mode);

  const changeTheme = useCallback(
    (newMode: ThemeMode) => {
      dispatch(setTheme(newMode));
    },
    [dispatch]
  );

  const toggle = useCallback(() => {
    dispatch(toggleTheme());
  }, [dispatch]);

  return {
    mode,
    isDark: mode === 'dark',
    isGray: mode === 'gray',
    setTheme: changeTheme,
    toggleTheme: toggle,
  };
};
