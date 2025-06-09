import { useState, useEffect } from 'react';
import { Movie, UserRating, UserPreferences } from '../types';
import { 
  getUserPreferences, 
  getRecommendedMovies,
  getSimilarMovies,
  searchMovies,
  filterMoviesByGenre
} from '../utils/recommendationEngine';
import { movies } from '../data/movies';

export const useRecommendations = () => {
  const [userRatings, setUserRatings] = useState<UserRating[]>(() => {
    // Load ratings from localStorage if available
    const savedRatings = localStorage.getItem('userRatings');
    return savedRatings ? JSON.parse(savedRatings) : [];
  });
  
  const [userPreferences, setUserPreferences] = useState<UserPreferences>({
    favoriteGenres: {},
    ratings: userRatings,
  });
  
  const [recommendations, setRecommendations] = useState<Movie[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<string>('All');
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>(movies);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchResults, setSearchResults] = useState<Movie[]>([]);
  
  // Update preferences when ratings change
  useEffect(() => {
    const newPreferences = getUserPreferences(userRatings);
    setUserPreferences(newPreferences);
    
    // Save ratings to localStorage
    localStorage.setItem('userRatings', JSON.stringify(userRatings));
  }, [userRatings]);
  
  // Update recommendations when preferences change
  useEffect(() => {
    const newRecommendations = getRecommendedMovies(userPreferences);
    setRecommendations(newRecommendations);
  }, [userPreferences]);
  
  // Update filtered movies when genre changes
  useEffect(() => {
    setFilteredMovies(filterMoviesByGenre(selectedGenre));
  }, [selectedGenre]);
  
  // Update search results when query changes
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setSearchResults([]);
    } else {
      setSearchResults(searchMovies(searchQuery));
    }
  }, [searchQuery]);
  
  // Rate a movie
  const rateMovie = (movieId: number, rating: number) => {
    setUserRatings((prevRatings) => {
      const existingRatingIndex = prevRatings.findIndex(
        (r) => r.movieId === movieId
      );
      
      if (existingRatingIndex >= 0) {
        // Update existing rating
        const newRatings = [...prevRatings];
        newRatings[existingRatingIndex] = { movieId, rating };
        return newRatings;
      } else {
        // Add new rating
        return [...prevRatings, { movieId, rating }];
      }
    });
  };
  
  // Get rating for a specific movie
  const getMovieRating = (movieId: number): number => {
    const rating = userRatings.find((r) => r.movieId === movieId);
    return rating ? rating.rating : 0;
  };
  
  // Get similar movies to a specific movie
  const getSimilar = (movieId: number, limit: number = 6): Movie[] => {
    return getSimilarMovies(movieId, limit);
  };
  
  return {
    userRatings,
    userPreferences,
    recommendations,
    filteredMovies,
    searchResults,
    selectedGenre,
    setSelectedGenre,
    searchQuery,
    setSearchQuery,
    rateMovie,
    getMovieRating,
    getSimilar,
  };
};