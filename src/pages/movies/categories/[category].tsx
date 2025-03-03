import { useRouter } from 'next/router';
import { useLanguage } from '@/hooks/useLanguage';
import { useMedia } from '@/hooks/useMovies';
import { MovieCategory } from '@/services/tmdb';
import Layout from '@/components/layout/Layout';
import MovieGrid from '@/components/movie/MovieGrid';
import InfiniteScroll from 'react-infinite-scroll-component';

const categoryTitles: Record<MovieCategory, { en: string; th: string }> = {
  popular: {
    en: 'Popular Movies',
    th: 'หนังยอดนิยม'
  },
  now_playing: {
    en: 'Now Playing',
    th: 'หนังกำลังฉาย'
  },
  upcoming: {
    en: 'Upcoming Movies',
    th: 'หนังเข้าใหม่'
  },
  top_rated: {
    en: 'Top Rated Movies',
    th: 'หนังคะแนนสูงสุด'
  }
};

export default function MovieCategoryPage() {
  const router = useRouter();
  const { category } = router.query;
  const { isThaiLanguage } = useLanguage();

  const { 
    data,
    fetchNextPage,
    hasNextPage,
    isLoading
  } = useMedia({ 
    mediaType: 'movie',
    category: category as MovieCategory
  });

  const movies = data?.pages.flatMap((page) => page.results) ?? [];
  const title = category && categoryTitles[category as MovieCategory]
    ? (isThaiLanguage 
        ? categoryTitles[category as MovieCategory].th 
        : categoryTitles[category as MovieCategory].en)
    : '';

  if (!category) return null;

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
          {title}
        </h1>

        {isLoading ? (
          <div className="flex justify-center items-center min-h-[200px]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500" />
          </div>
        ) : (
          <InfiniteScroll
            dataLength={movies.length}
            next={fetchNextPage}
            hasMore={!!hasNextPage}
            loader={
              <div className="flex justify-center p-4">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500" />
              </div>
            }
          >
            <MovieGrid movies={movies} />
          </InfiniteScroll>
        )}
      </div>
    </Layout>
  );
}