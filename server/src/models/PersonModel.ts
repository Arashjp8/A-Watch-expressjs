import mongoose from "mongoose";
import { MovieSchema } from "./MovieModel";
import { TvShowSchema } from "./TvShowModel";

const PersonSchema = new mongoose.Schema({
  id: String,
  name: String,
  movieIDs: [String],
  tvShowIDs: [String],
  biography: String,
  gender: Number,
  knownForDepartment: String,
  birthday: String,
  placeOfBirth: String,
  profilePath: String,
});

// PersonSchema.path("movies").schema.path("type").schema = MovieSchema;
// PersonSchema.path("tvShows").schema.path("type").schema = TvShowSchema;

type Person = mongoose.InferSchemaType<typeof PersonSchema>;

const PersonModel = mongoose.model<Person>("Person", PersonSchema);

export { PersonModel, PersonSchema, Person };
