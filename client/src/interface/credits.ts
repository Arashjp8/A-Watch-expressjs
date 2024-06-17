import { Movie } from "../interface/movie";

export interface People {
  __v: number;
  _id: string;
  name: string;
  biography: string;
  birthday: string;
  gender: number;
  known_for_department: string;
  movie_IDs: Movie[];
  tvshow_IDs: any[];
  place_of_birth: string;
  profile_path: string;
  role: string;
}

export interface CreditsResponse {
  crew: People[];
  cast: People[];
}
