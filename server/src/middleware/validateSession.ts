import { NextFunction, Request, Response } from "express";

const validateSession = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (!req.session.user_id) {
    return res.status(401).json({ message: "Unauthoriazed" });
  }

  next();
};

export default validateSession;
