import mongoose from "mongoose";

const PersonSchema = new mongoose.Schema({
  _id: String,
  name: String,
  movie_IDs: [String],
  tvshow_IDs: [String],
  biography: String,
  gender: Number,
  known_for_department: String,
  birthday: String,
  place_of_birth: String,
  profile_path: String,
});

type Person = mongoose.InferSchemaType<typeof PersonSchema>;

const PersonModel = mongoose.model<Person>("Person", PersonSchema);

export { PersonModel, PersonSchema, Person };
