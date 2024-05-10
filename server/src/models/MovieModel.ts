import mongoose from "mongoose";

const MovieSchema = new mongoose.Schema({
  _id: String,
  title: String,
  voteAverage: Number,
  backdropPath: {
    type: String,
    default: "",
  },
  overview: String,
  posterPath: String,
  releaseDate: String,
  originalLanguage: String,
  genres: [String],
  cast: [{}],
  crew: [{}],
});

export type Movie = mongoose.InferSchemaType<typeof MovieSchema>;

const MovieModel = mongoose.model<Movie>("Movie", MovieSchema);

export { MovieSchema, MovieModel };
