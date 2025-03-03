import { useState } from 'react';
import { useRouter } from 'next/router';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

interface SearchBarProps {
  placeholder?: string;
  defaultValue?: string;
}

export default function SearchBar({ placeholder, defaultValue = '' }: SearchBarProps) {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState(defaultValue);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/search/movie?query=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto mb-8">
      <div className="relative">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder={placeholder}
          className="w-full px-4 py-2 pl-10 pr-4 text-gray-900 dark:text-white bg-white dark:bg-gray-800 
                   border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none 
                   focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="absolute inset-y-0 left-0 pl-3 flex items-center"
        >
          <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
        </button>
      </div>
    </form>
  );
}