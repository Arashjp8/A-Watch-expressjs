import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { UserModel } from "../models/UserModel";

const requireAuth = async (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: "Authorization token required" });
  }

  const token = authorization.split(" ")[1];

  try {
    const { _id } = jwt.verify(token, process.env.SECRET!) as JwtPayload;

    req.user = await UserModel.findOne({ _id }).select("_id");
    next();
  } catch (error: any) {
    console.log(error);
    res.status(401).json({ error: "Request is not authorized" });
  }
};

export default requireAuth;
