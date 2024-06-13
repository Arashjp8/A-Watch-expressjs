import useMovieStore from "./MovieStore";

function MoviePage() {
  const selectedMovie = useMovieStore((state) => state.selectedMovie);

  return (
    <>
      <h1>{selectedMovie.title}</h1>
    </>
  );
}
export default MoviePage;
