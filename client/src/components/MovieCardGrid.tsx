import { useNavigate } from "react-router-dom";
import { IMovieResponse, Movie } from "../interface/movie";
import { useMovieContext } from "../context/MovieContext";
import useQuery from "../hooks/useQuery";
import { apiClient } from "../services/apiClient";
import Spinner from "./Spinner";

function MovieCardGrid() {
  const navigate = useNavigate();
  // routes:
  // baseURL/api/movie/popular
  // baseURL/api/movie/:id/videos
  // baseURL/api/movie/:id/credits
  const fetchPopularMovies = async (): Promise<IMovieResponse> => {
    const movieData = await apiClient("/movie/popular", "Get");
    return movieData;
  };

  const {
    data: movies,
    error,
    isLoading,
    isFetching,
  } = useQuery("movies", fetchPopularMovies);

  console.log(movies);
  console.log(error);
  console.log(isLoading);
  console.log(isFetching);

  if (isLoading)
    return (
      <div className={"relative h-screen w-full"}>
        <div className="absolute top-1/2 left-1/2">
          <Spinner />
        </div>
      </div>
    );
  if (error) return <div>Error: {error.message}</div>;

  const { setSelectedMovie } = useMovieContext();

  return (
    <>
      <div
        className={
          "p-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 grid-rows-4 gap-4 w-full h-full dark:text-slate-300 text-gray-600"
        }
      >
        {movies?.results.map((movie: Movie) => (
          <div
            key={movie._id}
            className={
              "md:h- md:w- lg:h-48 flex flex-row sm:flex-col lg:flex-row dark:bg-slate-600 bg-gray-100 rounded-md hover:scale-105 hover:cursor-pointer transition-all duration-300 ease-in-out hover:text-black hover:dark:text-white"
            }
            onClick={() => {
              navigate(`/movies/${movie._id}`);
              setSelectedMovie(movie);
            }}
          >
            <img
              src={movie.poster_path}
              loading={"lazy"}
              className={
                "w-[full] h-[200px] sm:h-[420px] md:w-full md:h-[432px] lg:w-32 lg:h-48 rounded-md lg:rounded-l-md"
              }
            />
            <div
              className={
                "w-full flex flex-col gap-4 p-4 items-start justify-between sm:justify-start"
              }
            >
              <span className={"text-xl"}>
                {movie.title.length > 40
                  ? movie.title.slice(0, 40) + "..."
                  : movie.title}
              </span>
              <span className={"text-lg"}>{movie.release_date}</span>
              <div
                className={
                  "flex flex-row md:gap-8 justify-between w-full lg:w-[]"
                }
              >
                <span
                  className={`${movie.vote_average < 50 ? "bg-red-200 text-red-700" : movie.vote_average < 70 ? "bg-yellow-200 text-yellow-700" : "bg-green-200 text-green-700"} py-1 px-2 rounded-md text-center min-w-9`}
                >
                  {movie.vote_average}
                </span>
                <button
                  className={
                    "bg-teal-200 dark:text-black text-md px-2 pb-1 flex flex-row items-center justify-center text-center rounded-lg hover:bg-opacity-70 transition-all duration-300 ease-in-out"
                  }
                >
                  more
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
export default MovieCardGrid;
