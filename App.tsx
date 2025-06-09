import React, { useState, useEffect } from 'react';
import { useRecommendations } from './hooks/useRecommendations';
import { Movie } from './types';
import Header from './components/Header';
import Footer from './components/Footer';
import MovieGrid from './components/MovieGrid';
import MovieDetail from './components/MovieDetail';
import GenreFilter from './components/GenreFilter';
import { Sparkles, TrendingUp, History } from 'lucide-react';

function App() {
  const {
    userRatings,
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
  } = useRecommendations();

  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [similarMovies, setSimilarMovies] = useState<Movie[]>([]);
  const [activeTab, setActiveTab] = useState<'discover' | 'recommended' | 'rated'>('discover');

  // Get user ratings as a record for easier lookup
  const userRatingsMap = userRatings.reduce((acc, curr) => {
    acc[curr.movieId] = curr.rating;
    return acc;
  }, {} as Record<number, number>);

  // Get similar movies when a movie is selected
  useEffect(() => {
    if (selectedMovie) {
      const similar = getSimilar(selectedMovie.id);
      setSimilarMovies(similar);
    }
  }, [selectedMovie, getSimilar]);

  // Get movies that the user has rated
  const ratedMovies = filteredMovies.filter(movie => 
    userRatings.some(rating => rating.movieId === movie.id)
  );

  // Determine which movies to display based on search and active tab
  const displayedMovies = searchQuery.trim() !== '' 
    ? searchResults 
    : activeTab === 'discover' 
      ? filteredMovies 
      : activeTab === 'recommended' 
        ? recommendations 
        : ratedMovies;

  // Handle movie rating
  const handleRateMovie = (movieId: number, rating: number) => {
    rateMovie(movieId, rating);
  };

  // Handle movie selection
  const handleMovieSelect = (movie: Movie) => {
    setSelectedMovie(movie);
  };

  // Handle movie detail close
  const handleCloseDetail = () => {
    setSelectedMovie(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      <Header 
        searchQuery={searchQuery} 
        onSearchChange={setSearchQuery} 
      />
      
      <main className="flex-grow container mx-auto px-4 py-6">
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
            {searchQuery.trim() !== '' 
              ? 'Search Results' 
              : activeTab === 'discover' 
                ? 'Discover Movies' 
                : activeTab === 'recommended' 
                  ? 'Recommended For You' 
                  : "Movies You've Rated"}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {searchQuery.trim() !== '' 
              ? `Showing results for "${searchQuery}"` 
              : activeTab === 'discover' 
                ? 'Browse and rate movies to get personalized recommendations' 
                : activeTab === 'recommended' 
                  ? 'Based on your ratings and preferences' 
                  : 'Movies you have previously rated'}
          </p>
        </div>
        
        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          <button
            onClick={() => setActiveTab('discover')}
            className={`flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'discover'
                ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100'
                : 'bg-white text-gray-700 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            <Sparkles size={16} className="mr-2" />
            Discover
          </button>
          
          <button
            onClick={() => setActiveTab('recommended')}
            className={`flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'recommended'
                ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100'
                : 'bg-white text-gray-700 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            <TrendingUp size={16} className="mr-2" />
            Recommended
          </button>
          
          <button
            onClick={() => setActiveTab('rated')}
            className={`flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'rated'
                ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100'
                : 'bg-white text-gray-700 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            <History size={16} className="mr-2" />
            Rated
            {userRatings.length > 0 && (
              <span className="ml-2 bg-gray-200 dark:bg-gray-700 px-2 py-0.5 rounded-full text-xs">
                {userRatings.length}
              </span>
            )}
          </button>
        </div>
        
        {/* Genre Filter (only show on discover tab) */}
        {activeTab === 'discover' && searchQuery.trim() === '' && (
          <GenreFilter 
            selectedGenre={selectedGenre} 
            onGenreSelect={setSelectedGenre} 
          />
        )}
        
        {/* Movies Grid */}
        <MovieGrid 
          movies={displayedMovies}
          userRatings={userRatingsMap}
          onRate={handleRateMovie}
          onMovieSelect={handleMovieSelect}
          emptyMessage={
            searchQuery.trim() !== '' 
              ? 'No movies found matching your search' 
              : activeTab === 'rated' 
                ? "You haven't rated any movies yet. Start rating to see them here!" 
                : activeTab === 'recommended'
                  ? 'Rate some movies to get personalized recommendations!'
                  : 'No movies found in this category'
          }
        />
        
        {/* Movie Detail Modal */}
        {selectedMovie && (
          <MovieDetail 
            movie={selectedMovie}
            userRating={getMovieRating(selectedMovie.id)}
            onRate={handleRateMovie}
            similarMovies={similarMovies}
            onClose={handleCloseDetail}
            onMovieSelect={handleMovieSelect}
          />
        )}
      </main>
      
      <Footer />
    </div>
  );
}

export default App;