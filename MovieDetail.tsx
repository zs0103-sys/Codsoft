import React from 'react';
import { Movie } from '../types';
import RatingStars from './RatingStars';
import MovieGrid from './MovieGrid';
import { X, Calendar, Clock, Star, Award } from 'lucide-react';

interface MovieDetailProps {
  movie: Movie;
  userRating: number;
  onRate: (movieId: number, rating: number) => void;
  similarMovies: Movie[];
  onClose: () => void;
  onMovieSelect: (movie: Movie) => void;
}

const MovieDetail: React.FC<MovieDetailProps> = ({
  movie,
  userRating,
  onRate,
  similarMovies,
  onClose,
  onMovieSelect,
}) => {
  // Format release date
  const formattedDate = new Date(movie.releaseDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 overflow-y-auto">
      <div 
        className="relative max-w-4xl w-full bg-white dark:bg-gray-900 rounded-xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
          aria-label="Close details"
        >
          <X size={24} />
        </button>
        
        {/* Movie backdrop */}
        <div className="relative h-64 sm:h-80 md:h-96 overflow-hidden">
          <img
            src={movie.backdropPath}
            alt={`${movie.title} backdrop`}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
          
          {/* Movie title and basic info overlay */}
          <div className="absolute bottom-0 left-0 p-6 w-full">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2">{movie.title}</h2>
            <div className="flex flex-wrap items-center gap-4 text-white">
              <div className="flex items-center">
                <Calendar size={16} className="mr-1" />
                <span>{formattedDate}</span>
              </div>
              <div className="flex items-center">
                <Award size={16} className="text-amber-400 mr-1" />
                <span>{movie.rating.toFixed(1)}</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Movie details */}
        <div className="p-6 overflow-y-auto">
          {/* Genres */}
          <div className="flex flex-wrap gap-2 mb-4">
            {movie.genres.map((genre) => (
              <span 
                key={genre} 
                className="px-3 py-1 text-sm font-medium rounded-full bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100"
              >
                {genre}
              </span>
            ))}
          </div>
          
          {/* Overview */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Overview</h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{movie.overview}</p>
          </div>
          
          {/* User rating */}
          <div className="mb-8 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">
              {userRating > 0 ? 'Your Rating' : 'Rate This Movie'}
            </h3>
            <div className="flex items-center">
              <RatingStars 
                rating={userRating} 
                onRate={(rating) => onRate(movie.id, rating)}
                interactive={true}
                size={28}
              />
              {userRating > 0 && (
                <span className="ml-3 text-lg font-bold text-amber-500">
                  {userRating.toFixed(1)}
                </span>
              )}
            </div>
          </div>
          
          {/* Similar movies */}
          {similarMovies.length > 0 && (
            <div className="mt-6">
              <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Similar Movies You Might Enjoy</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-4">
                {similarMovies.map((similarMovie) => (
                  <div 
                    key={similarMovie.id} 
                    className="cursor-pointer group"
                    onClick={() => onMovieSelect(similarMovie)}
                  >
                    <div className="rounded-lg overflow-hidden relative aspect-[2/3]">
                      <img 
                        src={similarMovie.posterPath} 
                        alt={similarMovie.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="text-white font-medium">View Details</span>
                      </div>
                    </div>
                    <h4 className="mt-2 text-sm font-medium text-gray-800 dark:text-gray-200 truncate">{similarMovie.title}</h4>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;