import mongoose from "mongoose";

const GenreSchema = new mongoose.Schema({
  genreID: String,
  genreName: String,
});

export type Genre = mongoose.InferSchemaType<typeof GenreSchema>;

const GenreModel = mongoose.model<Genre>("Genre", GenreSchema);

export { GenreModel, GenreSchema };
