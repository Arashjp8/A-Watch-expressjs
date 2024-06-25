export async function apiClient(
  endpoint: string,
  method: string,
  body?: any,
  apiKey?: string,
) {
  const baseURL = `${import.meta.env.VITE_REACT_APP_LOCALBASEURL}/api`;
  const url = `${baseURL}${endpoint}`;

  console.log(JSON.stringify(body));

  try {
    const options: RequestInit = {
      method: method,
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey ? apiKey : "",
      },
      credentials: "include",
      body: body ? JSON.stringify(body) : undefined,
    };

    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  } catch (err) {
    console.error("Error while fetching data: ", err);
  }
}
