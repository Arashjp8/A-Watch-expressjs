import mongoose from "mongoose";

const MovieSchema = new mongoose.Schema({
  _id: String,
  title: String,
  vote_average: Number,
  backdrop_path: {
    type: String,
    default: "",
  },
  overview: String,
  poster_path: String,
  release_date: String,
  original_language: String,
  genres: [String],
  cast: [{}],
  crew: [{}],
});

export type Movie = mongoose.InferSchemaType<typeof MovieSchema>;

const MovieModel = mongoose.model<Movie>("Movie", MovieSchema);

export { MovieSchema, MovieModel };
