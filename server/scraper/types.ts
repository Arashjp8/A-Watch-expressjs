import { Movie } from "../models/MovieModel";

export interface People {
  id: string;
  role: string;
}

export interface MovieResponse {
  movies: Movie[];
  totalPages: number;
  totalResults: number;
}
