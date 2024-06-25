export async function apiClient(endpoint: string, method: string, body?: any) {
  const baseURL = `${import.meta.env.VITE_REACT_APP_BASEURL}/api`;
  const url = `${baseURL}${endpoint}`;

  try {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const token = user.token;

    let options: RequestInit = {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: body ? JSON.stringify(body) : undefined,
    };

    if (token) {
      options.headers = {
        ...options.headers,
        Authorization: `Bearer ${token}`,
      };
    }
    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const json = await response.json();
    return json;
  } catch (err) {
    console.error("Error while fetching data:", err);
    throw err;
  }
}
