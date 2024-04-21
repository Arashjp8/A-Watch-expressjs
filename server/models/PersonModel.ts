import mongoose from "mongoose";
import { MovieSchema } from "./MovieModel";
import { TvShowSchema } from "./TvShowModel";

const PersonSchema = new mongoose.Schema({
  id: String,
  name: String,
  movies: [{}],
  tvShows: [{}],
  biography: String,
  birthday: String,
  gender: Number,
  homepage: String,
  imdbID: String,
  knownForDepartment: String,
  popularity: Number,
  placeOfBirth: String,
  profilePath: String,
});

PersonSchema.path("movies").schema.path("type").schema = MovieSchema;
PersonSchema.path("tvShows").schema.path("type").schema = TvShowSchema;

export type Person = mongoose.InferSchemaType<typeof PersonSchema>;

const PersonModel = mongoose.model<Person>("Person", PersonSchema);

export { PersonModel, PersonSchema };
