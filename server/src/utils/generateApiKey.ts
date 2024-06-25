import { v4 as uuidv4 } from "uuid";

export const generateApiKey = async (): Promise<string> => {
  const key = uuidv4();

  await apiKey.save();

  return key;
};
