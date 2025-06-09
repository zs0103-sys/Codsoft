import React, { useState } from 'react';
import { Movie } from '../types';
import RatingStars from './RatingStars';
import { Film, Calendar, Award } from 'lucide-react';

interface MovieCardProps {
  movie: Movie;
  userRating: number;
  onRate: (movieId: number, rating: number) => void;
  onClick?: () => void;
}

const MovieCard: React.FC<MovieCardProps> = ({
  movie,
  userRating,
  onRate,
  onClick,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const { title, overview, posterPath, releaseDate, genres, rating } = movie;

  // Truncate overview text
  const truncatedOverview = overview.length > 100
    ? `${overview.substring(0, 100)}...`
    : overview;

  // Format release date
  const formattedDate = new Date(releaseDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
  });

  return (
    <div 
      className="relative h-full rounded-lg overflow-hidden shadow-lg transition-all duration-300 bg-white dark:bg-gray-800 hover:shadow-xl transform hover:-translate-y-1"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      <div className="relative aspect-[2/3] overflow-hidden">
        <img 
          src={posterPath} 
          alt={`${title} poster`}
          className="w-full h-full object-cover transition-transform duration-500 ease-in-out"
          style={{
            transform: isHovered ? 'scale(1.05)' : 'scale(1)',
          }}
        />
        <div 
          className={`absolute inset-0 bg-gradient-to-t from-black/80 to-transparent transition-opacity duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-70'
          }`}
        />
        <div className="absolute bottom-0 left-0 p-4 w-full">
          <div className="flex items-center mb-2">
            <Award size={16} className="text-amber-400 mr-1" />
            <span className="text-white text-sm font-medium">{rating.toFixed(1)}</span>
          </div>
          <h3 className="text-white font-bold text-lg mb-1 line-clamp-2">{title}</h3>
          <div className="flex items-center text-gray-200 text-xs mb-2">
            <Calendar size={14} className="mr-1" />
            <span>{formattedDate}</span>
          </div>
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex flex-wrap gap-2 mb-3">
          {genres.slice(0, 3).map((genre) => (
            <span 
              key={genre} 
              className="px-2 py-1 text-xs font-medium rounded-full bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100"
            >
              {genre}
            </span>
          ))}
          {genres.length > 3 && (
            <span className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300">
              +{genres.length - 3}
            </span>
          )}
        </div>
        
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
          {truncatedOverview}
        </p>
        
        <div className="mt-auto">
          <div className="mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
            {userRating > 0 ? 'Your rating:' : 'Rate this movie:'}
          </div>
          <RatingStars 
            rating={userRating} 
            onRate={(rating) => onRate(movie.id, rating)}
            interactive={true}
          />
        </div>
      </div>
    </div>
  );
};

export default MovieCard;