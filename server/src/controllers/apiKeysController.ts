import { generateApiKey } from "../utils/generateApiKey";
import ApiKeyModel from "../models/ApiKeyModel";
import { Request, Response } from "express";

export async function getAllApiKeys(req: Request, res: Response) {
  const apiKeys = await ApiKeyModel.find();
  res.json(apiKeys);
}

export async function postNewApiKey(req: Request, res: Response) {
  const key = await generateApiKey();
  res.json({ apiKey: key });
}

export async function postDeactivatedApiKey(req: Request, res: Response) {
  const { key } = req.body;
  await ApiKeyModel.findOneAndUpdate({ key }, { active: false });
  res.json({ message: "API key deactivated" });
}
