import mongoose from "mongoose";

interface Movie {
  id: string;
  adult: boolean;
  backdrop_path: string;
  title: string;
  original_language: string;
  overview: string;
  poster_path: string;
  media_type: string;
  genre_ids: number[];
  release_date: string;
  vote_average: number;
}

const MovieSchema = new mongoose.Schema<Movie>({
  id: String,
  adult: Boolean,
  backdrop_path: String,
  title: String,
  original_language: String,
  overview: String,
  poster_path: String,
  media_type: String,
  genre_ids: [Number],
  release_date: String,
  vote_average: Number,
});

const Movie = mongoose.model<Movie>("Movie", MovieSchema);
export default Movie;
