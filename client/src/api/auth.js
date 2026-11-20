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

export async function getCurrentUser() {
  const response = await fetch(`${serverUrl}/api/auth/me`, {
    credentials: "include",
  });

  if (response.status === 401) {
    return null;
  }

  const result = await response.json();
  if (!response.ok) {
    throw new Error(result.error || "Unable to verify your session.");
  }

  const user = result.creator || result.fan;
  if (!user) {
    return null;
  }

  return {
    accountType: result.accountType || (result.creator ? "creator" : "fan"),
    user,
  };
}

export async function logout() {
  const response = await fetch(`${serverUrl}/api/auth/logout`, {
    method: "POST",
    credentials: "include",
  });

  if (!response.ok) {
    const result = await response.json();
    throw new Error(result.error || "Unable to log out. Please try again.");
  }
}
