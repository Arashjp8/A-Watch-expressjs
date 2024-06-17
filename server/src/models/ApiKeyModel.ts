import mongoose, { model } from "mongoose";

interface IApiKey extends Document {
  key: string;
  createdAt: Date;
  active: boolean;
}

const apiKeySchema = new mongoose.Schema<IApiKey>({
  key: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now },
  active: { type: Boolean, default: true },
});

const ApiKeyModel = model<IApiKey>("ApiKey", apiKeySchema);

export default ApiKeyModel;
export { IApiKey };
