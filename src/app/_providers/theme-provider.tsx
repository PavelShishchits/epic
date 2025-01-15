'use client';

import { Dispatch, SetStateAction, useEffect } from 'react';

import {
  ThemeProvider as NextThemeProvider,
  ThemeProviderProps as NextThemeProviderProps,
  useTheme as useNextTheme,
} from 'next-themes';

interface ThemeProviderProps extends NextThemeProviderProps {
  children: React.ReactNode;
}

const ThemeProvider = ({ children, ...props }: ThemeProviderProps) => {
  return <NextThemeProvider {...props}>{children}</NextThemeProvider>;
};

type Theme = 'light' | 'dark';
type SetTheme = Dispatch<SetStateAction<Theme>>;

const useSystemTheme = () => {
  const { theme, setTheme, systemTheme } = useNextTheme();

  useEffect(() => {
    // change theme if systemTheme has changed
    if (systemTheme !== theme) {
      setTheme(systemTheme!);
    }
  }, [systemTheme]);

  return {
    theme: theme === 'system' ? systemTheme : theme,
    setTheme: setTheme,
  } as {
    theme: Theme;
    setTheme: SetTheme;
  };
};

export { ThemeProvider, useSystemTheme };
