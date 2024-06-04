import mongoose from "mongoose";
import { Video } from "../scraper/interface";

const VideoSchema = new mongoose.Schema({
  _id: String,
  name: String,
  key: String,
  site: String,
  published_at: String,
  type: String,
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
