import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://www.themoviedb.org",
  headers: {
    "Accept-Language": "en-US,en;q=0.9",
    Cookie: process.env.TMDB_COOKIE,
  },
  maxRedirects: Infinity,
});

axiosInstance.interceptors.request.use((config) => {
  console.log("Request URL:", config.url);
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => {
    console.log("Response URL:", response.config.url);
    console.log("Response Status:", response.status);
    return response;
  },
  (error) => {
    console.error("Error URL:", error.config.url);
    console.error("Error Status:", error.response.status);
    return Promise.reject(error);
  },
);
