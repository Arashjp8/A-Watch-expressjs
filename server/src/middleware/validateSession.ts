import { NextFunction, Request, Response } from "express";
import { SessionModel } from "../models/SessionModel";

const validateSession = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const sessionID = req.headers["x-session-id"] as string;

  if (!sessionID) {
    return res.status(401).json({ message: "No session ID provided" });
  }

  const session = await SessionModel.findOne({ session_id: sessionID });

  if (!session) {
    return res.status(401).json({ message: "Invalid session" });
  }

  next();
};

export default validateSession;
