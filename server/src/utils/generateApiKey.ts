import { v4 as uuidv4 } from "uuid";
import ApiKeyModel from "../models/ApiKeyModel";

export const generateApiKey = async (): Promise<string> => {
  const key = uuidv4();

  const apiKey = new ApiKeyModel({ key });
  await apiKey.save();

  return key;
};
