import { Movie, UserPreferences, UserRating } from '../types';
import { movies } from '../data/movies';

// Calculate similarity score between user preferences and a movie
export const calculateSimilarityScore = (
  userPreferences: UserPreferences,
  movie: Movie
): number => {
  // Skip movies the user has already rated
  const hasRated = userPreferences.ratings.some(
    (rating) => rating.movieId === movie.id
  );
  if (hasRated) return 0;

  // Calculate genre similarity
  let genreScore = 0;
  movie.genres.forEach((genre) => {
    genreScore += userPreferences.favoriteGenres[genre] || 0;
  });

  // Normalize by the number of genres
  genreScore = genreScore / (movie.genres.length || 1);

  return genreScore;
};

// Get user preferences based on their ratings
export const getUserPreferences = (ratings: UserRating[]): UserPreferences => {
  const favoriteGenres: Record<string, number> = {};
  
  // Calculate genre preferences based on ratings
  ratings.forEach((userRating) => {
    const movie = movies.find((m) => m.id === userRating.movieId);
    if (!movie) return;
    
    // Only consider movies with ratings >= 3 as "liked"
    const weight = userRating.rating >= 3 ? userRating.rating / 5 : 0;
    
    movie.genres.forEach((genre) => {
      favoriteGenres[genre] = (favoriteGenres[genre] || 0) + weight;
    });
  });
  
  return {
    favoriteGenres,
    ratings,
  };
};

// Get recommended movies based on user preferences
export const getRecommendedMovies = (
  userPreferences: UserPreferences,
  limit: number = 10
): Movie[] => {
  // Skip if no preferences yet
  if (userPreferences.ratings.length === 0) {
    return movies.sort((a, b) => b.popularity - a.popularity).slice(0, limit);
  }
  
  // Calculate similarity scores for all movies
  const scoredMovies = movies
    .map((movie) => ({
      movie,
      score: calculateSimilarityScore(userPreferences, movie),
    }))
    .filter((item) => item.score > 0) // Only recommend movies with positive scores
    .sort((a, b) => b.score - a.score) // Sort by score in descending order
    .slice(0, limit) // Limit the number of recommendations
    .map((item) => item.movie);
  
  // If we don't have enough recommendations, add popular movies
  if (scoredMovies.length < limit) {
    const ratedMovieIds = userPreferences.ratings.map((r) => r.movieId);
    const popularMovies = movies
      .filter((movie) => !ratedMovieIds.includes(movie.id))
      .sort((a, b) => b.popularity - a.popularity)
      .slice(0, limit - scoredMovies.length);
    
    return [...scoredMovies, ...popularMovies];
  }
  
  return scoredMovies;
};

// Get similar movies to a specific movie
export const getSimilarMovies = (movieId: number, limit: number = 6): Movie[] => {
  const targetMovie = movies.find((m) => m.id === movieId);
  if (!targetMovie) return [];
  
  // Calculate similarity based on shared genres
  return movies
    .filter((movie) => movie.id !== movieId) // Exclude the movie itself
    .map((movie) => {
      // Count shared genres
      const sharedGenres = movie.genres.filter((genre) =>
        targetMovie.genres.includes(genre)
      ).length;
      
      // Calculate similarity score
      const genreSimilarity = sharedGenres / Math.max(movie.genres.length, targetMovie.genres.length);
      
      return {
        movie,
        similarity: genreSimilarity,
      };
    })
    .sort((a, b) => b.similarity - a.similarity) // Sort by similarity
    .slice(0, limit) // Limit results
    .map((item) => item.movie);
};

// Search for movies by title
export const searchMovies = (query: string): Movie[] => {
  const normalizedQuery = query.toLowerCase().trim();
  if (!normalizedQuery) return [];
  
  return movies.filter((movie) =>
    movie.title.toLowerCase().includes(normalizedQuery)
  );
};

// Filter movies by genre
export const filterMoviesByGenre = (genre: string): Movie[] => {
  if (!genre || genre === 'All') return movies;
  return movies.filter((movie) => movie.genres.includes(genre));
};