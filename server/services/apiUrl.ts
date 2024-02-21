import axios from "axios";

export const apiUrlGenerator = (url: string) => {
  const apiKey = process.env.NODE_APP_API_KEY;
  const BaseUrl = "https://api.themoviedb.org/3";

  return `${BaseUrl}${url}?api_key=${apiKey}&language=en-US`;
};

export const fetchFromTMDB = async (url: string) => {
  try {
    const response = await axios.get(apiUrlGenerator(url));
    return response.data.results;
  } catch (error) {
    console.log("Error while fetching movies", error);
  }
};
