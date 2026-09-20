export class CmsError extends Error {
  constructor(message: string, readonly status = 400, readonly fields?: Record<string, string>) {
    super(message);
    this.name = "CmsError";
  }
}

export class CmsUnavailableError extends CmsError {
  constructor(message = "The workspace is temporarily unavailable. Please try again shortly.") {
    super(message, 503);
    this.name = "CmsUnavailableError";
  }
}
