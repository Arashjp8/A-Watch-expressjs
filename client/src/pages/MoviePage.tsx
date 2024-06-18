import DetailSection from "../components/DetailSection";
import Credits from "../components/Credits";
import { useMovieContext } from "../context/MovieContext";

export const spanStyle = "text-lg text-gray-600 dark:text-gray-400";

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
  const { selectedMovie } = useMovieContext();

  if (!selectedMovie) return <div>No movie was selected!</div>;

  return (
    <div
      className={
        "w-full h-auto sm:h-full flex flex-col justify-start items-center gap-8 p-10 dark:bg-slate-950 dark:text-white"
      }
    >
      <Hero
        title={selectedMovie.title}
        posterPath={selectedMovie.poster_path}
      />
      <div className={"grid grid-cols-1 lg:grid-cols-2 gap-8"}>
        <DetailSection
          header={"Overview"}
          Content={<span className={spanStyle}>{selectedMovie.overview}</span>}
        />
        <DetailSection
          header={"Rating"}
          Content={
            <span className={spanStyle}>{selectedMovie.vote_average}</span>
          }
        />
        <DetailSection
          header={"Language"}
          Content={
            <span className={spanStyle}>{selectedMovie.original_language}</span>
          }
        />
        <DetailSection
          header={"Genres"}
          Content={
            <div className={"flex flex-col"}>
              {selectedMovie.genres.map((genre) => (
                <span className={spanStyle} key={genre}>
                  {genre}
                </span>
              ))}
            </div>
          }
        />
        <Credits />
      </div>
    </div>
  );
}
export default MoviePage;
