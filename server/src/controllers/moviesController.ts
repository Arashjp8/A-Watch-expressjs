import { Request, Response } from "express";
import { MovieModel } from "../models/MovieModel";
import { PersonModel } from "../models/PersonModel";

export const getTrendingMovies = async (req: Request, res: Response) => {
  // await handleFetchRequest("/trending/movie/day", res);
};

export const getPopularMovies = async (req: Request, res: Response) => {
  // await handleFetchRequest("/movie/popular", res);
  try {
    const movies = await MovieModel.find({});

    res.status(200).send(movies);
  } catch (err) {
    console.error("Error fetching movies: ", err);
    res.status(500).send(JSON.stringify({ message: "Error fetching movies" }));
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
    console.error("Error fetching movie: ", err.message);
    res.status(500).send(JSON.stringify({ message: "Error fetching movie" }));
  }
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

    const cast = movie.cast
      .map((member) => {
        const person = persons.find((p) => p.id.toString() === member.id);
        return person ? { ...person.toObject(), role: member.role } : null;
      })
      .filter(Boolean);

    const crew = movie.crew
      .map((member) => {
        const person = persons.find((p) => p.id.toString() === member.id);
        return person ? { ...person.toObject(), role: member.role } : null;
      })
      .filter(Boolean);

    res.status(200).json({ cast, crew });
  } catch (err) {
    console.error("Error fetching movie credits: ", err);
    res.status(500).json({ message: "Error fetching movie credits" });
  }
};
