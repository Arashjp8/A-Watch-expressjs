import mongoose from "mongoose";

const TvShowSchema = new mongoose.Schema({
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

export type TvShow = mongoose.InferSchemaType<typeof TvShowSchema>;

const TvShowModel = mongoose.model<TvShow>("TvShow", TvShowSchema);
export { TvShowSchema, TvShowModel };
