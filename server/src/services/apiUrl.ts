import axios from "axios";
import { Response } from "express";

export const apiUrlGenerator = (url: string) => {
  const apiKey = process.env.NODE_APP_API_KEY;
  const BaseUrl = "https://api.themoviedb.org/3";

  return `${BaseUrl}${url}?api_key=${apiKey}&language=en-US`;
};

export const fetchFromTMDB = async (url: string) => {
  try {
    const response = await axios.get(apiUrlGenerator(url));
    return response.data.results;
  } catch (error) {
    console.log("Error while fetching movies", error);
  }
};

export const handleFetchRequest = async (url: string, res: Response) => {
  try {
    const fetchedMovies = await fetchFromTMDB(url);
    res.status(200).send(fetchedMovies);
  } catch (error) {
    console.log("Error while fetching movies", error);
    res.status(500).send(error);
  }
};
