import MovieCard from './MovieCard';
import { Movie } from '@/types/movie';

interface MovieGridProps {
  movies: Movie[];
  isThaiLanguage?: boolean;
}

export default function MovieGrid({ movies, isThaiLanguage }: MovieGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          isThaiLanguage={isThaiLanguage}
        />
      ))}
    </div>
  );
}