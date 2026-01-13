import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from 'next-themes';

const ThemeToggle: React.FC = () => {
  const { theme, setTheme } = useTheme();

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="p-2 rounded-md hover:bg-justice-100 dark:hover:bg-justice-800 transition-colors"
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? (
        <Sun size={20} className="text-justice-600 dark:text-justice-400" />
      ) : (
        <Moon size={20} className="text-justice-600 dark:text-justice-400" />
      )}
    </button>
  );
};

export default ThemeToggle;
