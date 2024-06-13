import { Movie } from "../data/movies";

function MoviePage(movie: Movie) {
  return (
    <>
      <h1>{movie.title}</h1>
    </>
  );
}
export default MoviePage;
