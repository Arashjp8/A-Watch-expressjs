import { useMovieContext } from "../context/MovieContext";
import useQuery from "../hooks/useQuery";
import { CreditsResponse, People } from "../interface/credits";
import { apiClient } from "../services/apiClient";

const headerStyle = "text-2xl font-semibold";
const spanStyle = "text-lg text-gray-600 dark:text-gray-400";

interface DetailSectionProps {
  header: string;
  Content: JSX.Element;
}

function DetailSection({ header, Content }: DetailSectionProps) {
  return (
    <section>
      <h2 className={headerStyle}>{header}:</h2>
      {Content}
    </section>
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

interface CreditsProps {
  movieID: string;
}

function Credits({ movieID }: CreditsProps) {
  const fetchCredits = async (): Promise<CreditsResponse> => {
    const creditsData = await apiClient(`/movie/${movieID}/credits`, "Get");
    return creditsData;
  };

  const {
    data: credits,
    error,
    isLoading,
  } = useQuery("movie-credits", fetchCredits);

  console.log("MOVIE CREDITS: ", credits);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>error: {error.message}</div>;
  }

  return (
    <>
      <DetailSection
        header={"Crew"}
        Content={
          credits ? (
            <div className={"flex flex-col"}>
              {credits.crew.map((person: People) => (
                <div key={person._id} className={"flex flex-row gap-2"}>
                  <span className={spanStyle}>{person.name}</span>
                  <span className={spanStyle}>{person.role}</span>
                </div>
              ))}
            </div>
          ) : (
            <div>No crew members found.</div>
          )
        }
      />
      <DetailSection
        header={"Cast"}
        Content={
          credits ? (
            <div className={"flex flex-col"}>
              {credits.cast.map((person: People) => (
                <div key={person._id} className={"flex flex-row gap-2"}>
                  <span className={spanStyle}>{person.name}</span>
                  <span className={spanStyle}>{person.role}</span>
                </div>
              ))}
            </div>
          ) : (
            <div>No cast members found.</div>
          )
        }
      />
    </>
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
      <div className={"grid grid-cols-1 md:grid-cols-2 gap-8"}>
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
        <Credits movieID={selectedMovie._id} />
      </div>
    </div>
  );
}
export default MoviePage;
