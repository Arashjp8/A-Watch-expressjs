import mongoose from "mongoose";

const VideoSchema = new mongoose.Schema(
  {
    _id: String,
    videos: [
      {
        id: String,
        name: String,
        key: String,
        site: String,
        publishedAt: String,
        type: String,
      },
    ],
  },
  { _id: false },
);

export type Video = mongoose.InferSchemaType<typeof VideoSchema>;

export const VideoModel = mongoose.model<Video>("Video", VideoSchema);
