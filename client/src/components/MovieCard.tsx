import { movies } from "../data/movies";

function MovieCard() {
  return (
    <>
      <div
        className={
          "p-8 grid grid-cols-5 grid-rows-4 gap-4 w-full h-full border border-lime-700 text-gray-600"
        }
      >
        {movies.map((movie) => (
          <div
            key={movie._id}
            className={
              "h-48 flex flex-row border bg-gray-100 rounded-md hover:scale-105 hover:cursor-pointer transition-all duration-300 ease-in-out hover:text-black"
            }
            onClick={() => console.log(movie.poster_path)}
          >
            <img
              src={movie.poster_path}
              loading={"lazy"}
              className={"w-32 h-48 rounded-l-md"}
            />
            <div
              className={"flex flex-col gap-4 p-4 items-start justify-start"}
            >
              <span className={"text-xl"}>
                {movie.title.length > 40
                  ? movie.title.slice(0, 40) + "..."
                  : movie.title}
              </span>
              <div className={"flex flex-row gap-6"}>
                <span>{movie.release_date}</span>
                <span
                  className={`${movie.vote_average < 50 ? "bg-red-200 text-red-700" : movie.vote_average < 70 ? "bg-yellow-200 text-yellow-700" : "bg-green-200 text-green-700"} py-1 px-2 rounded-md min-w-4`}
                >
                  {movie.vote_average}
                </span>
              </div>
              <button
                className={
                  "bg-teal-400 px-2 py-1 flex items-center justify-center rounded-md hover:bg-opacity-70 transition-all duration-300 ease-in-out"
                }
              >
                more
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
export default MovieCard;
