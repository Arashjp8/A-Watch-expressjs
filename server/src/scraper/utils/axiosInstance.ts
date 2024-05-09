import axios from "axios";
import UserAgent from "user-agents";
import { RateLimiterMemory } from "rate-limiter-flexible";
import axiosRetry from "axios-retry";

const rateLimiter = new RateLimiterMemory({
  points: 5, // 5 requests per second
  duration: 1, // per second
});

const userAgent = new UserAgent();

export const axiosInstance = axios.create({
  baseURL: "https://www.themoviedb.org",
  headers: {
    "Accept-Language": "en-US,en;q=0.9",
    Cookie: process.env.TMDB_COOKIE,
  },
  timeout: 10000,
});

axiosRetry(axiosInstance, {
  retries: 3,
  retryCondition(error) {
    if (error.response) {
      switch (error.response.status) {
        case 404:
        case 429:
          return true;
        default:
          return false;
      }
    }
    return false;
  },
});

axiosInstance.interceptors.request.use(async (config) => {
  try {
    await rateLimiter.consume("axios-request", 1); // consume 1 point
  } catch (error) {
    throw new Error("Rate limit exceeded");
  }
  console.log("Request URL:", config.url);
  config.headers["User-Agent"] = userAgent.random().toString(); // rotate user agent
  console.log("User-Agent:", config.headers["User-Agent"]);
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => {
    console.log("Response URL:", response.config.url);
    console.log("Response Status: \n", response.status);
    return response;
  },
  (error) => {
    console.error("Error URL:", error.config.url);
    console.error("Error Status:", error.response.status);
    return Promise.reject(error);
  },
);
