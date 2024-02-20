import mongoose from "mongoose";

interface TvShow {
  backdrop_path: string;
  first_air_date: string;
  genre_ids: number[];
  id: number;
  name: string;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  vote_average: number;
  vote_count: number;
}

const tvShowSchema = new mongoose.Schema({
  backdrop_path: String,
  first_air_date: String,
  genre_ids: [Number],
  id: Number,
  name: String,
  origin_country: [String],
  original_language: String,
  original_name: String,
  overview: String,
  popularity: Number,
  poster_path: String,
  vote_average: Number,
  vote_count: Number,
});

const TvShow = mongoose.model<TvShow>("TvShow", tvShowSchema);
export default TvShow;
