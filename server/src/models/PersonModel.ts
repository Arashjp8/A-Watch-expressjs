import mongoose from "mongoose";
import { MovieSchema } from "./MovieModel";
import { TvShowSchema } from "./TvShowModel";

const PersonSchema = new mongoose.Schema({
  _id: String,
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

type Person = mongoose.InferSchemaType<typeof PersonSchema>;

const PersonModel = mongoose.model<Person>("Person", PersonSchema);

export { PersonModel, PersonSchema, Person };
