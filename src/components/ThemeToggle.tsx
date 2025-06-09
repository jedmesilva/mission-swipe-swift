
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-3 bg-white/10 dark:bg-black/20 backdrop-blur-md rounded-full hover:bg-white/20 dark:hover:bg-black/30 transition-all duration-300 border border-white/20 dark:border-white/10 group"
    >
      {theme === 'dark' ? (
        <Sun className="w-5 h-5 text-orange-300 group-hover:text-orange-200 transition-colors" />
      ) : (
        <Moon className="w-5 h-5 text-gray-700 group-hover:text-gray-600 transition-colors" />
      )}
    </button>
  );
};
