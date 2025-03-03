import { useInfiniteQuery } from 'react-query';
import { searchMovies } from '@/services/tmdb';
import { MovieResponse } from '@/types/movie';

interface UseSearchOptions {
  query: string;
  language?: string;
}

interface SearchPageParam {
  pageParam?: number;
}

export function useSearch({ query, language = 'en-US' }: UseSearchOptions) {
  return useInfiniteQuery<MovieResponse, Error, MovieResponse, [string, string, string]>(
    ['search', query, language],
    ({ pageParam = 1 }: SearchPageParam) => searchMovies(query, pageParam, language),
    {
      enabled: !!query,
      getNextPageParam: (lastPage: MovieResponse) => {
        if (lastPage.page < lastPage.total_pages) {
          return lastPage.page + 1;
        }
        return undefined;
      },
    }
  );
} 