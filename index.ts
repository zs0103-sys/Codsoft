export interface Movie {
  id: number;
  title: string;
  overview: string;
  posterPath: string;
  backdropPath: string;
  releaseDate: string;
  genres: string[];
  rating: number;
  popularity: number;
}

export interface UserRating {
  movieId: number;
  rating: number;
}

export interface UserPreferences {
  favoriteGenres: Record<string, number>;
  ratings: UserRating[];
}