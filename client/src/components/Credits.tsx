import { useEffect } from "react";
import { useMovieContext } from "../context/MovieContext";
import useQuery from "../hooks/useQuery";
import { CreditsResponse, People } from "../interface/credits";
import { apiClient } from "../services/apiClient";
import { spanStyle } from "../pages/MoviePage";
import DetailSection from "./DetailSection";
import Spinner from "./Spinner";

interface PersonDetailProps {
  person: People;
}

function PersonDetail({ person }: PersonDetailProps) {
  return (
    <div className={"flex flex-col gap-2 m-2"}>
      <img
        src={person.profile_path}
        className={"w-[150px] h-[225px] object-cover rounded-md"}
      />
      <span className={`${spanStyle} max-w-[150px]`}>{person.name}</span>
      <span className={`${spanStyle} max-w-[150px]`}>Role: {person.role}</span>
    </div>
  );
}

function Credits() {
  const { selectedMovie } = useMovieContext();

  const fetchCredits = async (): Promise<CreditsResponse> => {
    const creditsData = await apiClient(
      `/movie/${selectedMovie?._id}/credits`,
      "Get",
    );
    return creditsData;
  };

  const {
    data: credits,
    error,
    isLoading,
    refetch,
  } = useQuery(`movie-${selectedMovie?._id}-credits`, fetchCredits);

  useEffect(() => {
    refetch();
  }, [selectedMovie]);

  if (isLoading) {
    return <Spinner />;
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
            <div className={"flex flex-col lg:flex-row flex-wrap gap-4"}>
              {credits.crew.map((person: People) => (
                <PersonDetail key={person._id} person={person} />
              ))}
            </div>
          ) : (
            <div>No crew members found.</div>
          )
        }
        cols={"lg:col-span-2 min-w-[1100px]"}
      />
      <DetailSection
        header={"Cast"}
        Content={
          credits ? (
            <div className={"flex flex-col lg:flex-row flex-wrap gap-4"}>
              {credits.cast.map((person: People) => (
                <PersonDetail key={person._id} person={person} />
              ))}
            </div>
          ) : (
            <div>No cast members found.</div>
          )
        }
        cols={"lg:col-span-2 min-w-[1100px]"}
      />
    </>
  );
}

export default Credits;
