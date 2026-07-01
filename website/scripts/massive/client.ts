import { requireEnv } from "./env";

type MassiveListResponse<T> = {
  results?: T[];
  next_url?: string;
  status?: string;
  request_id?: string;
};

export function getMassiveBaseUrl() {
  return process.env.MASSIVE_BASE_URL || "https://api.massive.com";
}

export async function fetchMassiveJson<T>(pathOrUrl: string) {
  const apiKey = requireEnv("MASSIVE_API_KEY");
  const url = pathOrUrl.startsWith("http")
    ? new URL(pathOrUrl)
    : new URL(pathOrUrl, getMassiveBaseUrl());

  url.searchParams.set("apiKey", apiKey);

  const response = await fetch(url);

  if (!response.ok) {
    const body = await response.text();
    throw new Error(
      `Massive request failed: ${response.status} ${response.statusText} ${body}`,
    );
  }

  return (await response.json()) as T;
}

export async function fetchMassivePages<T>(path: string) {
  const results: T[] = [];
  let nextUrl: string | undefined = path;

  while (nextUrl) {
    const payload: MassiveListResponse<T> =
      await fetchMassiveJson<MassiveListResponse<T>>(nextUrl);
    results.push(...(payload.results || []));
    nextUrl = payload.next_url;
  }

  return results;
}
