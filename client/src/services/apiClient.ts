export async function apiClient(endpoint: string, method: string, body?: any) {
  const baseURL = `${import.meta.env.VITE_REACT_APP_LOCALBASEURL}/api`;
  const url = `${baseURL}${endpoint}`;

  const user = JSON.parse(localStorage.getItem("user") || "null");
  const token = user.token;

  try {
    const options: RequestInit = {
      method: method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
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
