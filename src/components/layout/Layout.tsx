import { ReactNode } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/hooks/useLanguage';
import { useTheme } from '@/hooks/useTheme';
import { 
  FilmIcon, 
  SunIcon, 
  MoonIcon, 
  LanguageIcon,
  TvIcon 
} from '@heroicons/react/24/outline';

interface LayoutProps {
  children: ReactNode;
}

const movieCategories = [
  { name: 'Popular', path: '/movies/categories/popular', nameTh: 'หนังยอดนิยม' },
  { name: 'Now Playing', path: '/movies/categories/now_playing', nameTh: 'หนังกำลังฉาย' },
  { name: 'Upcoming', path: '/movies/categories/upcoming', nameTh: 'หนังเข้าใหม่' },
  { name: 'Top Rated', path: '/movies/categories/top_rated', nameTh: 'หนังคะแนนสูงสุด' },
];

const tvCategories = [
  { name: 'Popular', path: '/tv/categories/popular', nameTh: 'ซีรีส์ยอดนิยม' },
  { name: 'Airing Today', path: '/tv/categories/airing_today', nameTh: 'ซีรีส์ออกอากาศวันนี้' },
  { name: 'On The Air', path: '/tv/categories/on_the_air', nameTh: 'ซีรีส์กำลังฉาย' },
  { name: 'Top Rated', path: '/tv/categories/top_rated', nameTh: 'ซีรีส์คะแนนสูงสุด' },
];

export default function Layout({ children }: LayoutProps) {
  const { darkMode, setDarkMode } = useTheme();
  const { isThaiLanguage, toggleLanguage } = useLanguage();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <nav className="sticky top-0 z-40 bg-white dark:bg-gray-800 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center h-16">
            {/* Logo and Navigation */}
            <div className="flex items-center space-x-8">
              {/* Logo */}
              <Link href="/" className="text-xl font-bold text-blue-600 dark:text-blue-400">
                pH Movie
              </Link>

              {/* Navigation Menu */}
              <div className="ml-8 hidden md:flex space-x-6">
                {/* Movies Dropdown */}
                <div className="relative group">
                  <button className="flex items-center space-x-1 px-3 py-2 text-gray-600 dark:text-gray-300 hover:text-blue-500">
                    <FilmIcon className="h-5 w-5" />
                    <span>{isThaiLanguage ? 'ภาพยนตร์' : 'Movies'}</span>
                  </button>
                  <div className="absolute left-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    {movieCategories.map((category) => (
                      <Link
                        key={category.path}
                        href={category.path}
                        className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        {isThaiLanguage ? category.nameTh : category.name}
                      </Link>
                    ))}
                  </div>
                </div>

                {/* TV Shows Dropdown */}
                <div className="relative group">
                  <button className="flex items-center space-x-1 px-3 py-2 text-gray-600 dark:text-gray-300 hover:text-blue-500">
                    <TvIcon className="h-5 w-5" />
                    <span>{isThaiLanguage ? 'ซีรีส์' : 'TV Shows'}</span>
                  </button>
                  <div className="absolute left-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    {tvCategories.map((category) => (
                      <Link
                        key={category.path}
                        href={category.path}
                        className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        {isThaiLanguage ? category.nameTh : category.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="ml-auto flex items-center space-x-4">
              <button
                onClick={toggleLanguage}
                className="p-2 text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400"
                aria-label="Toggle language"
              >
                <LanguageIcon className="h-5 w-5" />
              </button>

              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400"
                aria-label="Toggle theme"
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

      <main>{children}</main>

      <footer className="mt-12 py-6 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4 text-center text-gray-600 dark:text-gray-400">
          {isThaiLanguage ? 'Thanyaret pH' : 'Powered by Thanyaret pH'}
        </div>
      </footer>
    </div>
  );
}