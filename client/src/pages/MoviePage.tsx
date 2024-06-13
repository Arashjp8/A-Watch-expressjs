import useMovieStore from "./MovieStore";

interface DetailSectionProps {
  header: string;
  text: string | string[] | number;
}
function DetailSection({ header, text }: DetailSectionProps) {
  return (
    <>
      <section>
        <h2>{header}:</h2>
        <span>{text}</span>
      </section>
    </>
  );
}

function MoviePage() {
  const selectedMovie = useMovieStore((state) => state.selectedMovie);

  return (
    <div className={"w-auto h-full flex flex-col"}>
      <h1>{selectedMovie.title}</h1>
      <DetailSection header={"Overview"} text={selectedMovie.overview} />
      <DetailSection header={"Rating"} text={selectedMovie.vote_average} />
      <DetailSection
        header={"Language"}
        text={selectedMovie.original_language}
      />
      <section>
        <h2>Genres:</h2>
        {selectedMovie.genres.map((genre) => (
          <span key={genre}>{genre}</span>
        ))}
      </section>
    </div>
  );
}
export default MoviePage;
