import mongoose from "mongoose";

const VideoSchema = new mongoose.Schema({
  movieID: String,
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
});

export type Video = mongoose.InferSchemaType<typeof VideoSchema>;

export const VideoModel = mongoose.model<Video>("Video", VideoSchema);
