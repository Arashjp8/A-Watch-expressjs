import mongoose from "mongoose";

const PersonSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  name: { type: String, required: true },
  movie_IDs: { type: [String], default: [] },
  tvshow_IDs: { type: [String], default: [] },
  biography: { type: String, default: "" },
  gender: { type: Number, min: 1, max: 2 },
  known_for_department: { type: String, default: "" },
  birthday: { type: String, default: "" },
  place_of_birth: { type: String, default: "" },
  profile_path: { type: String, default: "" },
});

type Person = mongoose.InferSchemaType<typeof PersonSchema>;

const PersonModel = mongoose.model<Person>("Person", PersonSchema);

export { PersonModel, PersonSchema, Person };
