import { Movie } from "../models/MovieModel";

export interface People {
  name: string;
  role: string;
}

export interface MovieResponse {
  movies: Movie[];
  totalPages: number;
  totalResults: number;
}
