import { useRouter } from 'next/router';
import { useLanguage } from '@/hooks/useLanguage';
import { useSearch } from '@/hooks/useSearch';
import Layout from '@/components/layout/Layout';
import MovieGrid from '@/components/movie/MovieGrid';
import SearchBar from '@/components/ui/SearchBar';
import InfiniteScroll from 'react-infinite-scroll-component';

export default function SearchPage() {
  const router = useRouter();
  const { query } = router.query;
  const { isThaiLanguage } = useLanguage();

  const { 
    data,
    fetchNextPage,
    hasNextPage,
    isLoading
  } = useSearch({
    query: query as string,
    language: isThaiLanguage ? 'th-TH' : 'en-US'
  });

  const results = data?.pages.flatMap((page) => page.results) ?? [];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <SearchBar 
          placeholder={isThaiLanguage ? "ค้นหาภาพยนตร์..." : "Search movies..."}
          defaultValue={query as string}
        />

        <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
          {isThaiLanguage ? 'ผลการค้นหา' : 'Search Results'}: {query}
        </h1>

        {isLoading ? (
          <div className="flex justify-center items-center min-h-[200px]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500" />
          </div>
        ) : (
          <InfiniteScroll
            dataLength={results.length}
            next={fetchNextPage}
            hasMore={!!hasNextPage}
            loader={
              <div className="flex justify-center p-4">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500" />
              </div>
            }
          >
            <MovieGrid movies={results} />
          </InfiniteScroll>
        )}
      </div>
    </Layout>
  );
} 