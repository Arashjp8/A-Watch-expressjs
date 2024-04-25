import mongoose from "mongoose";
// import { PersonSchema } from "./PersonModel";

const MovieSchema = new mongoose.Schema({
  id: String,
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

// MovieSchema.path("cast").schema.path("type").schema = PersonSchema;
// MovieSchema.path("crew").schema.path("type").schema = PersonSchema;

export type Movie = mongoose.InferSchemaType<typeof MovieSchema>;

const MovieModel = mongoose.model<Movie>("Movie", MovieSchema);

export { MovieSchema, MovieModel };
