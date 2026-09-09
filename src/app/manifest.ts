import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Brisk",
    short_name: "Brisk",
    description: "Websites, webshops, software en apps op maat.",
    start_url: "/",
    display: "standalone",
    theme_color: "#0C1619",
    background_color: "#0C1619",
    icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml" }],
  };
}
