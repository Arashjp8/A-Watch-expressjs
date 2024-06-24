import mongoose, { model } from "mongoose";

const apiKeySchema = new mongoose.Schema({
  user_id: { type: String, required: true },
  key: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now },
  active: { type: Boolean, default: true },
});

export type ApiKey = mongoose.InferSchemaType<typeof apiKeySchema>;

const ApiKeyModel = model<ApiKey>("ApiKey", apiKeySchema);

export default ApiKeyModel;
