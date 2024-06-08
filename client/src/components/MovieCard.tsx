import { movies } from "../data/movies";

function MovieCard() {
  return (
    <>
      <div
        className={
          "p-8 grid grid-cols-5 grid-rows-4 gap-4 w-full h-full border border-lime-700"
        }
      >
        {movies.map((movie) => (
          <div
            key={movie._id}
            className={
              "flex flex-row border border-teal-400 bg-gray-100 rounded-md"
            }
          >
            <img src={movie.poster_path} className={"w-32 h-48 rounded-l-md"} />
            <div className={"flex flex-col gap-8"}>
              <span className={"text-xl"}>{movie.title}</span>
              <span>{movie.vote_average}</span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
export default MovieCard;
