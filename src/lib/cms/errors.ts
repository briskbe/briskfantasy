export class CmsError extends Error {
  constructor(message: string, readonly status = 400, readonly fields?: Record<string, string>) {
    super(message);
    this.name = "CmsError";
  }
}

export class CmsUnavailableError extends CmsError {
  constructor(message = "Het beheerportaal is tijdelijk niet beschikbaar. Probeer het straks opnieuw.") {
    super(message, 503);
    this.name = "CmsUnavailableError";
  }
}
