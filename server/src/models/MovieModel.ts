import mongoose from "mongoose";

const MovieSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  title: { type: String, required: true },
  vote_average: { type: Number, min: 0, max: 100 },
  backdrop_path: { type: String, default: "" },
  overview: { type: String, default: "" },
  poster_path: { type: String, default: "" },
  release_date: { type: String, default: "" },
  original_language: { type: String, default: "" },
  genres: [{ type: String }],
  cast: [{}],
  crew: [{}],
});

export type Movie = mongoose.InferSchemaType<typeof MovieSchema>;

const MovieModel = mongoose.model<Movie>("Movie", MovieSchema);

export { MovieSchema, MovieModel };
