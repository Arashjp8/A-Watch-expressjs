import { create } from "zustand";
import { Movie, movies } from "../data/movies";

interface MovieStore {
  selectedMovie: Movie;
  setSelectedMovie: (movie: Movie) => void;
}

const useMovieStore = create<MovieStore>((set) => ({
  selectedMovie: movies[0],
  setSelectedMovie: (movie) => set((state) => ({ selectedMovie: movie })),
}));

export default useMovieStore;
