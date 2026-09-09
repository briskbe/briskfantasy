/**
 * Renders one JSON-LD document. Next.js keeps this in the server HTML, so the
 * structured data is present for crawlers that do not execute JavaScript.
 *
 * Only ever describe things that are actually on the page. Marking up an FAQ
 * that a visitor cannot see, or a rating we award ourselves, is what earns a
 * manual action rather than a rich result.
 */
export function JsonLd({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      // The payload is built from our own data, never from user input.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
