import { useState } from 'react';
import { MovieDetail as MovieDetailType } from '@/types/movie';
import { StarIcon, ClockIcon, PlayIcon } from '@heroicons/react/24/solid';
import MovieTrailer from './MovieTrailer';

interface MovieDetailProps {
  movie: MovieDetailType;
  onClose: () => void;
}

export default function MovieDetail({ movie, onClose }: MovieDetailProps) {
  const [showTrailer, setShowTrailer] = useState(false);
  
  console.log('Movie videos:', movie.videos);
  
  const trailer = movie.videos?.results?.find(
    (video) => video.type === 'Trailer' && video.site === 'YouTube'
  );
  

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              {movie.title}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              ✕
            </button>
          </div>

          {/* Trailer Button */}
          {trailer && (
            <div className="mb-6">
              <button
                className="w-full bg-red-600 text-white py-3 px-6 rounded-lg 
                         hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
              >
                <PlayIcon className="h-6 w-6" />
                <span className="text-lg">ดูตัวอย่างภาพยนตร์</span>
              </button>
            </div>
          )}

          {/* Trailer Modal */}
          {showTrailer && trailer && (
            <div className="fixed inset-0 bg-black z-[60] flex items-center justify-center p-4">
              <div className="relative w-full max-w-4xl">
                <MovieTrailer videoKey={trailer.key} />
                <button
                  onClick={() => {
                    console.log('Closing trailer');
                    setShowTrailer(false);
                  }}
                  className="absolute top-4 right-4 bg-white text-black p-2 
                           rounded-full hover:bg-gray-200"
                >
                  ✕
                </button>
              </div>
            </div>
          )}

          {/* Movie Details */}
          <div className="mt-4 space-y-4">
            <p className="text-gray-600 dark:text-gray-300">{movie.overview}</p>
            
            <div className="flex flex-wrap gap-2">
              {movie.genres?.map((genre) => (
                <span
                  key={genre.id}
                  className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 
                           dark:text-blue-100 rounded-full text-sm"
                >
                  {genre.name}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center">
                <StarIcon className="h-5 w-5 text-yellow-500 mr-1" />
                <span className="text-gray-700 dark:text-gray-300">
                  {movie.vote_average.toFixed(1)}
                </span>
              </div>
              {movie.runtime > 0 && (
                <div className="flex items-center">
                  <ClockIcon className="h-5 w-5 text-gray-500 mr-1" />
                  <span className="text-gray-700 dark:text-gray-300">
                    {movie.runtime} นาที
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}