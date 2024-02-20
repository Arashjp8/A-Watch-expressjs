import mongoose from "mongoose";

interface Movie {
  adult: Boolean;
  backdrop_path: String;
  id: Number;
  title: String;
  original_language: String;
  original_title: String;
  overview: String;
  poster_path: String;
  media_type: String;
  genre_ids: Number[];
  popularity: Number;
  release_date: String;
  video: Boolean;
  vote_average: Number;
  vote_count: Number;
}

const MovieSchema = new mongoose.Schema<Movie>({
  adult: Boolean,
  backdrop_path: String,
  id: Number,
  title: String,
  original_language: String,
  original_title: String,
  overview: String,
  poster_path: String,
  media_type: String,
  genre_ids: [Number],
  popularity: Number,
  release_date: String,
  video: Boolean,
  vote_average: Number,
  vote_count: Number,
});

const Movie = mongoose.model<Movie>("Movie", MovieSchema);
export default Movie;
