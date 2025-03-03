import { useState } from 'react';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import { getMovieDetails } from '@/services/tmdb';
import Layout from '@/components/layout/Layout';
import Image from 'next/image';
import { 
  StarIcon, 
  ClockIcon, 
  CalendarIcon,
  PlayIcon
} from '@heroicons/react/24/solid';
import { useLanguage } from '@/hooks/useLanguage';
import { translations } from '@/utils/translations';
import MovieTrailer from '@/components/movie/MovieTrailer';

export default function MovieDetailPage() {
  const router = useRouter();
  const { id } = router.query;
  const { isThaiLanguage } = useLanguage();
  const t = translations[isThaiLanguage ? 'th' : 'en'];
  const [showTrailer, setShowTrailer] = useState(false);
  
  // ตรวจสอบว่า id เป็นตัวเลขที่ถูกต้อง
  const movieId = typeof id === 'string' ? parseInt(id) : null;
  const isValidId = !isNaN(Number(movieId));

  const { data: movie, isLoading, isError } = useQuery(
    ['movie', movieId, isThaiLanguage],
    () => getMovieDetails(movieId!, isThaiLanguage ? 'th-TH' : 'en-US'),
    {
      enabled: isValidId, // จะทำ query เมื่อ id ถูกต้องเท่านั้น
      retry: false, // ไม่ต้อง retry ถ้าเกิด error
    }
  );

  // ถ้า id ไม่ถูกต้อง ให้ redirect กลับไปหน้าแรก
  if (!isValidId && !isLoading) {
    router.replace('/');
    return null;
  }

  if (isError) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-red-600">
            {isThaiLanguage 
              ? 'ไม่พบข้อมูลภาพยนตร์ กรุณาลองใหม่อีกครั้ง' 
              : 'Movie not found. Please try again.'}
          </div>
        </div>
      </Layout>
    );
  }

  if (isLoading || !movie) {
    return (
      <Layout>
        <div className="flex justify-center items-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500" />
        </div>
      </Layout>
    );
  }

  const trailer = movie.videos.results.find(
    (video) => video.type === 'Trailer' && video.site === 'YouTube'
  );

  return (
    <Layout>
      {/* Hero Section with Backdrop */}
      <div className="relative h-[70vh] w-full">
        <Image
          src={`${process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL}/original${movie.backdrop_path}`}
          alt={movie.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/70" />
        
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="container mx-auto">
            <div className="flex flex-col md:flex-row items-end gap-8">
              {/* Poster */}
              <div className="relative w-48 h-72 rounded-lg overflow-hidden shadow-2xl">
                <Image
                  src={`${process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL}/w500${movie.poster_path}`}
                  alt={movie.title}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Info */}
              <div className="flex-1 text-white">
                <h1 className="text-4xl font-bold mb-4">{movie.title}</h1>
                
                <div className="flex flex-wrap items-center gap-6 mb-4">
                  <div className="flex items-center">
                    <StarIcon className="h-5 w-5 text-yellow-500 mr-1" />
                    <span>{movie.vote_average.toFixed(1)}</span>
                  </div>
                  <div className="flex items-center">
                    <ClockIcon className="h-5 w-5 text-gray-400 mr-1" />
                    <span>{movie.runtime} {t.minutes}</span>
                  </div>
                  <div className="flex items-center">
                    <CalendarIcon className="h-5 w-5 text-gray-400 mr-1" />
                    <span>{new Date(movie.release_date).getFullYear()}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-6">
                  {movie.genres.map((genre) => (
                    <span
                      key={genre.id}
                      className="px-3 py-1 rounded-full text-sm bg-white/20 backdrop-blur-sm"
                    >
                      {genre.name}
                    </span>
                  ))}
                </div>

                {trailer && (
                  <div className="mb-8">
                    {showTrailer ? (
                      <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                        <div className="relative w-full max-w-3xl aspect-video">
                          <MovieTrailer videoKey={trailer.key} />
                          <button
                            onClick={() => setShowTrailer(false)}
                            className="absolute -top-10 right-0 text-white hover:text-gray-300 
                                     transition-colors"
                            aria-label="Close trailer"
                          >
                            <span className="text-2xl">✕</span>
                          </button>
                        </div>
                      </div>
                    ) : (
                      <button
                        onClick={() => setShowTrailer(true)}
                        className="inline-flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg 
                                 hover:bg-red-700 transition-colors text-sm font-medium"
                      >
                        <PlayIcon className="h-4 w-4" />
                        <span>Trailer</span>
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl">
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
            {t.overview}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
            {movie.overview}
          </p>
        </div>
      </div>
    </Layout>
  );
}