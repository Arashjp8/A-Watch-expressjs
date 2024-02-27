export interface CastAndCrew {
  name: string;
  role: string;
}

export interface Movie {
  title: string;
  voteAverage: number;
  overview: string;
  posterPath?: string;
  backdropPath: string;
  releaseDate: string;
  originalLanguage: string;
  genres: string[];
  cast: CastAndCrew[];
  crew: CastAndCrew[];
}

export interface MovieResponse {
  movies: Movie[];
  totalPages: number;
  totalResults: number;
}
