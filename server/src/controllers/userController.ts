import { Request, Response } from "express";
import { UserDocument, UserModel } from "../models/UserModel";
import jwt from "jsonwebtoken";

const createToken = (_id: string) => {
  return jwt.sign({ _id }, process.env.SECRET!, { expiresIn: "1w" });
};

const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user: UserDocument = await UserModel.login(email, password);
    const token = createToken(user._id);

    res.status(200).json({ email, token });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

const signupUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.signup(email, password);
    const token = createToken(user._id);

    res.status(200).json({ email, token });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export { loginUser, signupUser };
