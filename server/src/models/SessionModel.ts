import mongoose, { Schema } from "mongoose";

const SessionSchema: Schema = new Schema({
  user_id: { type: String, required: true },
  session_id: { type: String, required: true },
});

type ISession = mongoose.InferSchemaType<typeof SessionSchema>;

const SessionModel = mongoose.model<ISession>("Session", SessionSchema);

export { SessionModel, ISession };
