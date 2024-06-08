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
              "flex flex-row border bg-gray-100 rounded-md hover:scale-105 hover:cursor-pointer transition-all duration-300 ease-in-out hover:text-black"
            }
          >
            <img
              src={movie.poster_path}
              loading={"lazy"}
              className={"w-32 h-48 rounded-l-md"}
            />
            <div
              className={"flex flex-col gap-8 p-4 items-start justify-start"}
            >
              <span className={"text-xl"}>{movie.title}</span>
              <span>{movie.vote_average}</span>
              <span>{movie.release_date}</span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
export default MovieCard;
