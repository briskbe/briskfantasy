import { Composition } from "remotion";
import {
  DEVICE_REEL_META,
  DeviceReel,
  METRICS_REEL_META,
  MetricsReel,
  PROCESS_REEL_META,
  ProcessReel,
  SHOWREEL_BROWSER_META,
  ShowreelBrowser,
  WORDMARK_REEL_META,
  WordmarkReel,
  deviceReelDuration,
  processReelDuration,
  showreelDuration,
  type DeviceReelProps,
  type ProcessReelProps,
  type ShowreelBrowserProps,
} from "@/components/remotion/compositions";

/**
 * Remotion Studio / CLI entry. The same compositions are embedded on the site
 * through <RemotionPlayer>; this file only exists so they can be previewed and
 * rendered to MP4 (`pnpm remotion:studio`, `pnpm remotion:render`).
 * Note: the CSS font variables do not resolve here, so Studio shows fallbacks.
 */
export function RemotionRoot() {
  return (
    <>
      <Composition
        id="ProcessReel"
        component={ProcessReel}
        {...PROCESS_REEL_META}
        defaultProps={{
          eyebrow: "Zo werken we",
          steps: [
            { index: "01", title: "Luisteren en scherpstellen", body: "We starten met een gesprek, geen offerte. Doelen, publiek en wat er vandaag niet werkt." },
            { index: "02", title: "Ontwerpen in de open", body: "Wireframes worden snel echte schermen. Je kijkt mee en beslist mee, elke week." },
            { index: "03", title: "Bouwen op maat", body: "Eigen code, geen thema's. Snel, toegankelijk en klaar om te groeien." },
            { index: "04", title: "Lanceren en verbeteren", body: "Live gaan is het begin. We meten, leren en sturen bij." },
          ],
        }}
        calculateMetadata={({ props }: { props: ProcessReelProps }) => ({ durationInFrames: processReelDuration(props.steps.length) })}
      />
      <Composition
        id="ShowreelBrowser"
        component={ShowreelBrowser}
        {...SHOWREEL_BROWSER_META}
        defaultProps={{
          shots: [
            { src: "/references/landelijkglas-be.webp", domain: "landelijkglas.be", name: "Landelijk Glas" },
            { src: "/references/city-housing-be.webp", domain: "city-housing.be", name: "City Housing Genk" },
            { src: "/references/legacycristal-com.webp", domain: "legacycristal.com", name: "LegacyCristal" },
            { src: "/references/priveglas-be.webp", domain: "priveglas.be", name: "PriveGlas" },
          ],
        }}
        calculateMetadata={({ props }: { props: ShowreelBrowserProps }) => ({ durationInFrames: showreelDuration(props.shots.length) })}
      />
      <Composition
        id="MetricsReel"
        component={MetricsReel}
        {...METRICS_REEL_META}
        defaultProps={{
          theme: "dark" as const,
          metrics: [
            { value: 17, label: "Live websites" },
            { value: 50, suffix: "+", label: "Product screens" },
            { value: 15, suffix: "min", label: "Levertijd tuningfiles" },
            { value: 2016, label: "Sinds" },
          ],
        }}
      />
      <Composition
        id="DeviceReel"
        component={DeviceReel}
        {...DEVICE_REEL_META}
        defaultProps={{
          fit: "cover" as const,
          screens: [
            { src: "/portfolio/012-w006.webp", zoom: 1.25, focus: { x: 0.5, y: 0.55 } },
            { src: "/portfolio/031-w025.webp", zoom: 1.15 },
            { src: "/portfolio/016-w010.webp" },
          ],
        }}
        calculateMetadata={({ props }: { props: DeviceReelProps }) => ({ durationInFrames: deviceReelDuration(props.screens.length) })}
      />
      <Composition id="WordmarkReel" component={WordmarkReel} {...WORDMARK_REEL_META} defaultProps={{ tagline: "Websites die bewegen" }} />
    </>
  );
}
