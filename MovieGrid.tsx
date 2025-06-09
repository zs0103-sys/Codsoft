import React from 'react';
import { Movie } from '../types';
import MovieCard from './MovieCard';

interface MovieGridProps {
  movies: Movie[];
  userRatings: Record<number, number>;
  onRate: (movieId: number, rating: number) => void;
  onMovieSelect: (movie: Movie) => void;
  emptyMessage?: string;
}

const MovieGrid: React.FC<MovieGridProps> = ({
  movies,
  userRatings,
  onRate,
  onMovieSelect,
  emptyMessage = "No movies found",
}) => {
  if (movies.length === 0) {
    return (
      <div className="w-full py-12 flex flex-col items-center justify-center text-center">
        <p className="text-gray-500 dark:text-gray-400 text-lg">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          userRating={userRatings[movie.id] || 0}
          onRate={onRate}
          onClick={() => onMovieSelect(movie)}
        />
      ))}
    </div>
  );
};

export default MovieGrid;