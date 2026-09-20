export class CmsApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public fields?: Record<string, string>,
  ) {
    super(message);
    this.name = "CmsApiError";
  }
}

export async function cmsApi<T>(
  path: string,
  init: RequestInit = {},
): Promise<T> {
  const response = await fetch(path, {
    ...init,
    credentials: "same-origin",
    cache: "no-store",
    headers: {
      ...(init.body ? { "Content-Type": "application/json" } : {}),
      ...init.headers,
    },
  });
  const body = await response.json().catch(() => null);
  if (!response.ok) {
    // A full navigation clears private client state after the server session expires.
    if (response.status === 401 && typeof window !== "undefined") {
      // eslint-disable-next-line @next/next/no-location-assign-relative-destination
      window.location.assign("/cms/login");
    }
    throw new CmsApiError(
      body?.error || "Something went wrong. Please try again.",
      response.status,
      body?.fields,
    );
  }
  return body as T;
}
