import { ReactNode, createContext, useContext, useState } from "react";
import { Movie } from "../data/movies";

interface MovieContextType {
  selectedMovie: Movie | null;
  setSelectedMovie: (movie: Movie) => void;
}

interface MovieContextProviderProps {
  children: ReactNode;
}

const MovieContext = createContext<MovieContextType | undefined>(undefined);

export const useMovieContext = () => {
  const context = useContext(MovieContext);

  if (!context) {
    throw new Error(
      "useMovieContext must be used within a MovieContextProvider",
    );
  }
  return context;
};

export const MovieContextProvider = ({
  children,
}: MovieContextProviderProps) => {
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const value: MovieContextType = {
    selectedMovie,
    setSelectedMovie,
  };

  return (
    <MovieContext.Provider value={value}>{children}</MovieContext.Provider>
  );
};
