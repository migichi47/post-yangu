import { serverUrl } from "./auth";

async function request(path, options = {}) {
  const response = await fetch(`${serverUrl}/api/creators${path}`, {
    credentials: "include",
    ...options,
  });
  const result =
    response.status === 204 ? null : await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(result?.error || "Unable to load creator information.");
  }

  return result;
}

export async function getCreators(filters = {}) {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(filters)) {
    if (value !== undefined && value !== null && value !== "") {
      params.set(key, String(value));
    }
  }

  const query = params.toString();
  return request(query ? `?${query}` : "");
}

export async function getCreator(username) {
  return request(`/${encodeURIComponent(username)}`);
}

export async function getFollowing() {
  return request("/following");
}

export async function followCreator(username) {
  return request(`/${encodeURIComponent(username)}/follow`, {
    method: "PUT",
  });
}

export async function unfollowCreator(username) {
  return request(`/${encodeURIComponent(username)}/follow`, {
    method: "DELETE",
  });
}
