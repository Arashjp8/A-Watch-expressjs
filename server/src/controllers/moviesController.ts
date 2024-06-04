import { Request, Response } from "express";
import { MovieModel } from "../models/MovieModel";
import { PersonModel } from "../models/PersonModel";

const handleDataBaseError = (res: Response, message: string, err: any) => {
  console.error(message, err);
  res.status(500).send(JSON.stringify({ message }));
};

export const getTrendingMovies = async (req: Request, res: Response) => {
  // await handleFetchRequest("/trending/movie/day", res);
};

export const getPopularMovies = async (req: Request, res: Response) => {
  try {
    const movies = await MovieModel.find({});

    res.status(200).send(movies);
  } catch (err) {
    handleDataBaseError(res, "Error fetching popular movies ", err);
  }
};

export const getMovieById = async (req: Request, res: Response) => {
  const movieID = req.params.id;
  console.log(movieID);
  try {
    const movie = await MovieModel.findOne({ _id: movieID });
    console.log(movie);

    if (!movie) {
      res.status(404).send(JSON.stringify({ message: "Movie not found" }));
      return;
    }
    console.log(movie);
    res.status(200).send(movie);
  } catch (err: any) {
    handleDataBaseError(res, "Error fetching movie: ", err.message);
  }
};

const getPersonDetails = (members: any, persons: any) => {
  return members
    .map((member: any) => {
      const person = persons.find((p: any) => p._id.toString() === member.id);
      return person ? { ...person.toObject(), role: member.role } : null;
    })
    .filter(Boolean);
};

export const getMovieCredits = async (req: Request, res: Response) => {
  const movieID = req.params.id;

  try {
    const movie = await MovieModel.findOne({ _id: movieID });
    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    const castIDs = movie.cast.map((member) => member.id);
    const crewIDs = movie.crew.map((member) => member.id);
    const personIDs = [...new Set([...castIDs, ...crewIDs])]; // Unique IDs

    const persons = await PersonModel.find({ _id: { $in: personIDs } });

    const cast = getPersonDetails(movie.cast, persons);
    const crew = getPersonDetails(movie.crew, persons);

    res.status(200).json({ cast, crew });
  } catch (err) {
    handleDataBaseError(res, "Error fetching movie credits: ", err);
  }
};
