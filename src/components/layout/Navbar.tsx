import Link from 'next/link';
import { useState } from 'react';
import { useTheme } from '@/hooks/useTheme';
import { useLanguage } from '@/hooks/useLanguage';
import { 
  FilmIcon, 
  SunIcon,
  MoonIcon,
  LanguageIcon
} from '@heroicons/react/24/outline';

const movieCategories = [
  { name: 'Popular', path: '/movies/popular', nameTh: 'หนังยอดนิยม' },
  { name: 'Now Playing', path: '/movies/now_playing', nameTh: 'หนังกำลังฉาย' },
  { name: 'Upcoming', path: '/movies/upcoming', nameTh: 'หนังเข้าใหม่' },
  { name: 'Top Rated', path: '/movies/top_rated', nameTh: 'หนังคะแนนสูงสุด' },
];

export default function Navbar() {
  const [isMovieMenuOpen, setIsMovieMenuOpen] = useState(false);
  const { darkMode, setDarkMode } = useTheme();
  const { isThaiLanguage, toggleLanguage } = useLanguage();

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold text-blue-500">
              pH Movie
            </span>
          </Link>

          {/* Navigation Items */}
          <div className="hidden md:flex items-center space-x-8">
            {/* Movies Dropdown */}
            <div className="relative group">
              <button
                onClick={() => setIsMovieMenuOpen(!isMovieMenuOpen)}
                className="flex items-center space-x-1 px-3 py-2 rounded-lg transition
                  text-gray-300 hover:text-blue-400"
              >
                <FilmIcon className="h-5 w-5" />
                <span>{isThaiLanguage ? 'หนัง' : 'Movies'}</span>
              </button>

              {/* Dropdown Menu */}
              <div className="absolute top-full left-0 mt-2 w-48 rounded-lg shadow-lg 
                            bg-gray-800 border border-gray-700 opacity-0 invisible
                            group-hover:opacity-100 group-hover:visible transition-all">
                {movieCategories.map((category) => (
                  <Link
                    key={category.path}
                    href={category.path}
                    className="block px-4 py-2 text-gray-300 hover:bg-gray-700 
                             first:rounded-t-lg last:rounded-b-lg"
                  >
                    {isThaiLanguage ? category.nameTh : category.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleLanguage}
              className="p-2 text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400"
            >
              <LanguageIcon className="h-5 w-5" />
              <span className="sr-only">
                {isThaiLanguage ? 'Switch to English' : 'เปลี่ยนเป็นภาษาไทย'}
              </span>
            </button>

            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400"
            >
              {darkMode ? (
                <SunIcon className="h-5 w-5" />
              ) : (
                <MoonIcon className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}