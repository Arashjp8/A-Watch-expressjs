import mongoose from "mongoose";
import { Video } from "../scraper/interface";

const VideoSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  name: { type: String, required: true },
  key: { type: String, required: true },
  site: { type: String, required: true },
  published_at: { type: String, required: true },
  type: { type: String, required: true },
});

const VideoDocumentSchema = new mongoose.Schema({
  _id: String,
  videos: [VideoSchema],
});

export interface VideoDocument extends mongoose.Document {
  _id: string;
  videos: Video[];
}

export const VideoModel = mongoose.model<VideoDocument>(
  "Video",
  VideoDocumentSchema,
);
