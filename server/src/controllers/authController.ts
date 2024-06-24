import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { UserModel } from "../models/UserModel";
import { v4 as uuidv4 } from "uuid";
import ApiKeyModel from "../models/ApiKeyModel";
import { SessionModel } from "../models/SessionModel";

const register = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new UserModel({ username, email, password: hashedPassword });
  await newUser.save();

  const apiKey = uuidv4();
  const newApiKey = new ApiKeyModel({ user_id: newUser._id, key: apiKey });
  newApiKey.save();

  const sessionID = uuidv4();
  const newSession = new SessionModel({
    user_id: newUser._id,
    session_id: sessionID,
  });
  newSession.save();

  res.status(201).json({ apiKey, sessionID });
};

const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await UserModel.findOne({ email });

  if (!user) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  const sessionID = uuidv4();
  const newSession = new SessionModel({
    user_id: user._id,
    session_id: sessionID,
  });
  newSession.save();

  res.status(200).json({ sessionID });
};

const logout = async (req: Request, res: Response) => {
  const { session_id } = req.body;

  await SessionModel.deleteOne({ session_id });

  res.status(200).json({ message: "Logged out successfully" });
};

export { register, login, logout };
