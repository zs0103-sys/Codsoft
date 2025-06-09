import React from 'react';
import { Star } from 'lucide-react';

interface RatingStarsProps {
  rating: number;
  maxRating?: number;
  size?: number;
  onRate?: (rating: number) => void;
  interactive?: boolean;
}

const RatingStars: React.FC<RatingStarsProps> = ({
  rating,
  maxRating = 5,
  size = 20,
  onRate,
  interactive = false,
}) => {
  const handleClick = (newRating: number) => {
    if (interactive && onRate) {
      onRate(newRating);
    }
  };

  return (
    <div className="flex items-center space-x-1">
      {[...Array(maxRating)].map((_, index) => {
        const starValue = index + 1;
        const filled = starValue <= rating;
        
        return (
          <button
            key={index}
            onClick={() => handleClick(starValue)}
            className={`transition-all duration-200 ${
              interactive ? 'hover:scale-110 focus:outline-none' : ''
            } ${filled ? 'text-amber-400' : 'text-gray-300'}`}
            disabled={!interactive}
            aria-label={`Rate ${starValue} out of ${maxRating}`}
            type="button"
          >
            <Star
              size={size}
              fill={filled ? 'currentColor' : 'none'}
              className={interactive ? 'cursor-pointer' : ''}
            />
          </button>
        );
      })}
    </div>
  );
};

export default RatingStars;