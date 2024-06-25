import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { User, UserModel } from "../models/UserModel";
import { v4 as uuidv4 } from "uuid";
import ApiKeyModel from "../models/ApiKeyModel";

const register = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new UserModel({ username, email, password: hashedPassword });

  const apiKey = uuidv4();
  const newApiKey = new ApiKeyModel({ user_id: newUser._id, key: apiKey });

  if (req.session) {
    req.session.user_id = newUser.id;
    await newUser.save();
    await newApiKey.save();
    res.status(201).json({ apiKey });
  } else {
    res.status(500).json({ message: "Session not available" });
  }
};

const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user: User | null = await UserModel.findOne({ email });

  if (!user) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  req.session.user_id = user._id;
  res.status(200).json({ message: "Logged in successfully" });
};

const logout = async (req: Request, res: Response) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: "Could not log out" });
    }
    return res.status(200).json({ message: "Logged out successfully" });
  });
};

const checkSession = (req: Request, res: Response) => {
  if (req.session.user_id) {
    res.status(200).json({ user: req.session.user_id });
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
};

export { register, login, logout, checkSession };
