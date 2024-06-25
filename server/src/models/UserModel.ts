import mongoose, { Document, Model } from "mongoose";
import bcrypt from "bcrypt";
import validator from "validator";
import { v4 as uuidv4 } from "uuid";

interface UserModel extends Model<UserDocument> {
  signup(email: string, password: string): Promise<UserDocument>;
  login(email: string, password: string): Promise<UserDocument>;
}

const UserSchema = new mongoose.Schema({
  _id: { type: String, required: true, default: uuidv4 },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

UserSchema.statics.signup = async function(email: string, password: string) {
  if (!email || !password) {
    throw Error("All fields must be filled");
  }
  if (!validator.isEmail(email)) {
    throw Error("Email not valid");
  }
  if (!validator.isStrongPassword(password)) {
    throw Error("Password not strong enough");
  }

  const exists = await this.findOne({ email });

  if (exists) {
    throw Error("Email already in use");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await this.create({ email, password: hashedPassword });

  return user;
};

UserSchema.statics.login = async function(email: string, password: string) {
  if (!email || !password) {
    throw Error("All fields must be filled");
  }

  const user = await this.findOne({ email });
  if (!user) {
    throw Error("Incorrect email");
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw Error("Incorrect password");
  }

  return user;
};

interface UserBaseDocument extends Document {
  _id: string;
  email: string;
  password: string;
}

export interface UserDocument extends UserBaseDocument { }

const UserModel = mongoose.model<UserDocument, UserModel>("User", UserSchema);

export { UserSchema, UserModel };
