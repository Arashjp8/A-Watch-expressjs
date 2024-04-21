import { Movie } from "../models/MovieModel";

export interface CastAndCrew {
  name: string;
  role: string;
}

export interface MovieResponse {
  movies: Movie[];
  totalPages: number;
  totalResults: number;
}
