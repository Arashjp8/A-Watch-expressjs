export const apiUrlGenerator = (url: string) => {
  const apiKey = process.env.NODE_APP_API_KEY;
  const BaseUrl = "https://api.themoviedb.org/3";

  return `${BaseUrl}${url}?api_key=${apiKey}&language=en-US`;
};
