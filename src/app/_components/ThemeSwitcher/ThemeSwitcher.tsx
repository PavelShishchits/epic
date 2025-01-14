'use client';

import { useEffect, useState } from 'react';

import { Moon, Sun } from 'lucide-react';

import Button from '@/app/_components/ui/Button/Button';
import { useSystemTheme } from '@/app/_providers/theme-provider';

const ThemeSwitcher = () => {
  const { theme, setTheme } = useSystemTheme();
  // to avoid hydration mismatch
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSwitchButtonClick = () => {
    if (theme === 'light') {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  };

  if (!mounted) {
    return null;
  }

  return (
    <div>
      <Button variant={'ghost'} onClick={handleSwitchButtonClick}>
        {theme === 'light' ? <Sun /> : <Moon />}
      </Button>
    </div>
  );
};

export { ThemeSwitcher };
