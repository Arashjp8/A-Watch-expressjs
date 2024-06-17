import MovieCard from "../components/MovieCard";
import { Movie } from "../data/movies";
import useQuery from "../hooks/useQuery";
import { apiClient } from "../services/apiClient";

function Home() {
  // routes:
  // baseURL/api/movie/popular
  // baseURL/api/movie/:id/videos
  // baseURL/api/movie/:id/credits
  const fetchDummy = async (): Promise<Movie> => {
    return await apiClient("/api/movie/popular", "Get");
  };

  const { data, error, isLoading, isFetching } = useQuery("movies", fetchDummy);

  console.log(data);
  console.log(error);
  console.log(isLoading);
  console.log(isFetching);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className={"w-full dark:bg-slate-950"}>
      <MovieCard />
    </div>
  );
}
export default Home;
