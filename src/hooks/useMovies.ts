import { useInfiniteQuery } from 'react-query';
import { getMovies, getTVShows, MovieCategory, TVCategory } from '@/services/tmdb';
import { useLanguage } from '@/hooks/useLanguage';

interface UseMediaParams {
  mediaType: 'movie' | 'tv';
  category: MovieCategory | TVCategory;
  searchQuery?: string;
}

export function useMedia({ mediaType, category, searchQuery }: UseMediaParams) {
  const { isThaiLanguage } = useLanguage();
  const language = isThaiLanguage ? 'th-TH' : 'en-US';

  return useInfiniteQuery(
    ['media', mediaType, category, searchQuery, language],
    ({ pageParam = 1 }) => {
      if (searchQuery) {
        return getMovies(pageParam, 'popular', language);
      }
      
      if (mediaType === 'movie') {
        return getMovies(pageParam, category as MovieCategory, language);
      } else {
        return getTVShows(pageParam, category as TVCategory, language);
      }
    },
    {
      getNextPageParam: (lastPage) => {
        if (lastPage.page < lastPage.total_pages) {
          return lastPage.page + 1;
        }
        return undefined;
      },
    }
  );
}