import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const UserSchema = new mongoose.Schema({
  _id: { type: String, required: true, default: uuidv4 },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  userSecret: { type: String, required: true, unique: true },
});

type User = mongoose.InferSchemaType<typeof UserSchema>;

const UserModel = mongoose.model<User>("User", UserSchema);

export { UserSchema, UserModel, User };
