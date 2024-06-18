import { NextFunction, Request, Response } from "express";
import { UserModel } from "../models/UserModel";

const validateUserSecret = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const userSecret = req.header("x-user-secret");

  if (!userSecret) {
    return res.status(401).json({ message: "User secret missing" });
  }

  const user = await UserModel.findOne({ userSecret });

  if (!user) {
    return res.status(401).json({ message: "Invalid user secret" });
  }

  //req.user = user;
  console.log("Valid user secret");

  next();
};

export default validateUserSecret;
