import { Request, Response } from "express";
import { UserModel } from "../models/UserModel";
import bcrypt from "bcrypt";

export const createUser = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  const existingUser = await UserModel.findOne({ email, username });
  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const userSecret = `secret-${Math.random().toString(36).substring(2, 15)}`;

  const user = new UserModel({
    username,
    email,
    password: hashedPassword,
    userSecret,
  });

  await user.save();
  res.status(201).json({ message: "User created", user });
};
