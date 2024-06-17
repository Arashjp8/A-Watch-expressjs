import { Request, Response, NextFunction } from "express";
import ApiKeyModel from "../models/ApiKeyModel";

const validateApiKey = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const apiKey = req.header("x-api-key");

  if (!apiKey) {
    return res.status(401).json({ message: "API key missing" });
  }

  const validKey = await ApiKeyModel.findOne({ key: apiKey, active: true });

  if (!validKey) {
    return res.status(401).json({ message: "Invalid API key" });
  }
  console.log("valid API key");

  next();
};

export default validateApiKey;
