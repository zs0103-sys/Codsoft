import React from 'react';
import { getAllGenres } from '../data/movies';

interface GenreFilterProps {
  selectedGenre: string;
  onGenreSelect: (genre: string) => void;
}

const GenreFilter: React.FC<GenreFilterProps> = ({ selectedGenre, onGenreSelect }) => {
  const genres = ['All', ...getAllGenres()];

  return (
    <div className="mb-6 overflow-x-auto py-2">
      <div className="flex space-x-2 min-w-max">
        {genres.map((genre) => (
          <button
            key={genre}
            onClick={() => onGenreSelect(genre)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap ${
              selectedGenre === genre
                ? 'bg-purple-600 text-white shadow-md'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            {genre}
          </button>
        ))}
      </div>
    </div>
  );
};

export default GenreFilter;