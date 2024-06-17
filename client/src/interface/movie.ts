export interface Movie {
  _id: string;
  title: string;
  vote_average: number;
  backdrop_path: string;
  overview: string;
  poster_path: string;
  release_date: string;
  original_language: string;
  genres: string[];
  cast: { id: string; role: string }[];
  crew: { id: string; role: string }[];
  __v: number;
}

export interface IMovieResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}
