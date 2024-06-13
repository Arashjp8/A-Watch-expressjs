import useMovieStore from "./MovieStore";

const headerStyle = "text-2xl font-semibold";
const spanStyle = "text-lg text-gray-600 dark:text-gray-400";

interface DetailSectionProps {
  header: string;
  text: string | string[] | number;
}

function DetailSection({ header, text }: DetailSectionProps) {
  return (
    <>
      <section>
        <h2 className={headerStyle}>{header}:</h2>
        <span className={spanStyle}>{text}</span>
      </section>
    </>
  );
}

interface HeroProps {
  title: string;
  posterPath: string;
}

function Hero({ title, posterPath }: HeroProps) {
  return (
    <section className={"w-full grid grid-cols-1 md:grid-cols-2 gap-8"}>
      <h1 className={"text-3xl font-bold"}>{title}</h1>
      <img src={posterPath} className={"w-48 h-72 rounded-md"} />
    </section>
  );
}

function MoviePage() {
  const selectedMovie = useMovieStore((state) => state.selectedMovie);

  return (
    <div
      className={
        "w-auto h-full flex flex-col justify-start items-center gap-8 p-10 dark:bg-slate-950 dark:text-white"
      }
    >
      <Hero
        title={selectedMovie.title}
        posterPath={selectedMovie.poster_path}
      />
      <div className={"grid grid-cols-1 md:grid-cols-2 gap-8"}>
        <DetailSection header={"Overview"} text={selectedMovie.overview} />
        <DetailSection header={"Rating"} text={selectedMovie.vote_average} />
        <DetailSection
          header={"Language"}
          text={selectedMovie.original_language}
        />
        <section>
          <h2 className={headerStyle}>Genres:</h2>
          <div className={"flex flex-col"}>
            {selectedMovie.genres.map((genre) => (
              <span className={spanStyle} key={genre}>
                {genre}
              </span>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
export default MoviePage;
