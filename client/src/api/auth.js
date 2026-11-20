const serverUrl = (
  import.meta.env.VITE_SERVER_URL || "http://localhost:3000"
).replace(/\/+$/, "");

export async function postAuth(endpoint, data) {
  const response = await fetch(`${serverUrl}/api/auth/${endpoint}`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.error || "Authentication failed. Please try again.");
  }

  return result;
}
