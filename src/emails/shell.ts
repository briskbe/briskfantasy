/**
 * The shared chrome for every email Brisk sends.
 *
 * Email HTML is not web HTML. Everything here is deliberate:
 * - Tables for layout. Flexbox and grid do not exist in Outlook's Word engine.
 * - Inline styles on every element. Gmail strips <style> in some contexts and
 *   nothing may depend on it, so the <style> block only carries the media query
 *   for narrow screens, which is a bonus rather than a requirement.
 * - No external images. Most clients block them by default, and the site is not
 *   on a public URL yet, so a hosted logo would be a broken box in every inbox.
 *   The wordmark is type, which always renders.
 * - No CSS custom properties, no web fonts, no rem: none of the three are safe.
 */

/** Palette lifted from the site, written out because email cannot read tokens. */
export const c = {
  page: "#070f11",
  card: "#0c1619",
  card2: "#142328",
  card3: "#1b2f36",
  line: "#1e343b",
  fg: "#f2f4ee",
  fg2: "#cdd6cd",
  muted: "#8b9a97",
  lime: "#d3f882",
  limeDeep: "#a9d84f",
  ink: "#0c1619",
} as const;

export const font =
  "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Helvetica, Arial, sans-serif";
export const mono = "ui-monospace, SFMono-Regular, 'SF Mono', Menlo, Consolas, 'Liberation Mono', monospace";
/** Stands in for the site's Instrument Serif italic, which no client would load. */
export const serif = "Georgia, 'Times New Roman', Times, serif";

/** Every value that reaches the markup goes through this. */
export function esc(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** Escapes, then keeps the visitor's paragraph breaks. */
export function escMultiline(value: string): string {
  return esc(value).replace(/\r\n|\r|\n/g, "<br />");
}

/** The lime dot + letterspaced caps that opens every section on the site. */
export function eyebrow(text: string): string {
  return `<table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr>
    <td width="6" style="padding:0 8px 0 0;line-height:0;">
      <div style="width:6px;height:6px;border-radius:6px;background-color:${c.lime};font-size:0;line-height:0;">&nbsp;</div>
    </td>
    <td style="font-family:${mono};font-size:11px;letter-spacing:2px;text-transform:uppercase;color:${c.muted};">${esc(text)}</td>
  </tr></table>`;
}

/**
 * A bulletproof button: the background lives on the <td>, so it still paints in
 * clients that drop the anchor's own background.
 */
export function button(label: string, href: string): string {
  return `<table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr>
    <td align="center" bgcolor="${c.lime}" style="border-radius:999px;background-color:${c.lime};">
      <a href="${esc(href)}" style="display:inline-block;padding:14px 28px;font-family:${font};font-size:15px;font-weight:600;line-height:1;color:${c.ink};text-decoration:none;border-radius:999px;">${esc(label)}</a>
    </td>
  </tr></table>`;
}

/** One label/value row of the summary panel. */
export function row(label: string, value: string, opts: { href?: string } = {}): string {
  const inner = opts.href
    ? `<a href="${esc(opts.href)}" style="color:${c.lime};text-decoration:none;">${value}</a>`
    : value;
  return `<tr>
    <td style="padding:0 0 4px 0;font-family:${mono};font-size:10px;letter-spacing:1.6px;text-transform:uppercase;color:${c.muted};">${esc(label)}</td>
  </tr>
  <tr>
    <td style="padding:0 0 18px 0;font-family:${font};font-size:15px;line-height:1.5;color:${c.fg};">${inner}</td>
  </tr>`;
}

/** A bordered panel, used for the request summary and the message body. */
export function panel(inner: string): string {
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="${c.card2}" style="background-color:${c.card2};border:1px solid ${c.line};border-radius:14px;">
    <tr><td style="padding:24px;">${inner}</td></tr>
  </table>`;
}

export function divider(): string {
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
    <td height="1" style="height:1px;line-height:1px;font-size:0;background-color:${c.line};">&nbsp;</td>
  </tr></table>`;
}

/**
 * Wraps a body in the full document: preheader, header, card, footer.
 *
 * `preheader` is the grey line the inbox shows next to the subject. Left out,
 * clients scrape the first words of the body instead, which is rarely the
 * sentence you would have chosen.
 */
export function renderEmail({
  title,
  preheader,
  body,
  footer,
}: {
  title: string;
  preheader: string;
  body: string;
  footer: string;
}): string {
  return `<!doctype html>
<html lang="nl" dir="ltr">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<meta name="x-apple-disable-message-reformatting" />
<meta name="color-scheme" content="dark light" />
<meta name="supported-color-schemes" content="dark light" />
<title>${esc(title)}</title>
<style>
  @media only screen and (max-width:620px) {
    .sm-p { padding-left:22px !important; padding-right:22px !important; }
    .sm-h1 { font-size:30px !important; line-height:1.15 !important; }
    .sm-stack { display:block !important; width:100% !important; }
  }
</style>
</head>
<body style="margin:0;padding:0;width:100%;background-color:${c.page};-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;">
  <div style="display:none;font-size:1px;color:${c.page};line-height:1px;max-height:0;max-width:0;opacity:0;overflow:hidden;">${esc(preheader)}</div>
  <!-- Some clients strip the preheader's trailing space and pull body text in after it. -->
  <div style="display:none;font-size:1px;color:${c.page};line-height:1px;max-height:0;max-width:0;opacity:0;overflow:hidden;">&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;</div>

  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="${c.page}" style="background-color:${c.page};">
    <tr>
      <td align="center" style="padding:32px 12px;">

        <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="width:600px;max-width:600px;">

          <!-- header -->
          <tr>
            <td class="sm-p" style="padding:0 8px 20px 8px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
                <td align="left" style="font-family:${font};font-size:22px;font-weight:700;letter-spacing:-0.5px;color:${c.fg};">
                  <span style="color:${c.lime};">&#10022;</span>&nbsp;Brisk
                </td>
                <td align="right" style="font-family:${mono};font-size:10px;letter-spacing:1.6px;text-transform:uppercase;color:${c.muted};">
                  Digitaal bureau &middot; België
                </td>
              </tr></table>
            </td>
          </tr>

          <!-- card -->
          <tr>
            <td bgcolor="${c.card}" style="background-color:${c.card};border:1px solid ${c.line};border-radius:20px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr><td class="sm-p" style="padding:40px;">${body}</td></tr>
              </table>
            </td>
          </tr>

          <!-- footer -->
          <tr>
            <td class="sm-p" style="padding:26px 8px 0 8px;font-family:${font};font-size:12px;line-height:1.7;color:${c.muted};">
              ${footer}
            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>
</body>
</html>`;
}
