import Link from 'next/link';
import Image from 'next/image';
import { Movie } from '@/types/movie';
import { motion } from 'framer-motion';
import { StarIcon } from '@heroicons/react/24/solid';

interface MovieCardProps {
  movie: Movie;
  isThaiLanguage?: boolean;
  onClick?: () => void;
}

export default function MovieCard({ movie, isThaiLanguage, onClick }: MovieCardProps) {
  const posterUrl = movie.poster_path 
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : '/no-poster.png';

  return (
    <Link href={`/movies/${movie.id}`} className="group" onClick={onClick}>
      <motion.div
        whileHover={{ y: -8 }}
        transition={{ duration: 0.2 }}
        className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg 
                   hover:shadow-2xl transition-all cursor-pointer group"
      >
        <div className="relative h-[400px]">
          {movie.poster_path ? (
            <Image
              src={posterUrl}
              alt={movie.title}
              fill
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <span className="text-gray-400">
                {isThaiLanguage ? 'ไม่มีโปสเตอร์' : 'No poster available'}
              </span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent opacity-0 
                        group-hover:opacity-100 transition-opacity duration-300">
            <div className="absolute bottom-0 p-4 text-white">
              <h3 className="text-white font-semibold truncate">
                {movie.title}
              </h3>
            </div>
          </div>
        </div>
        <div className="p-4">
          <div className="flex items-center justify-between">
            <span className="text-gray-600 dark:text-gray-400">
              {movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A'}
            </span>
            <div className="flex items-center bg-yellow-100 dark:bg-yellow-900 
                          px-2 py-1 rounded-full">
              <StarIcon className="h-4 w-4 text-yellow-500 mr-1" />
              <span className="text-yellow-700 dark:text-yellow-300 font-medium">
                {movie.vote_average.toFixed(1)}
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}