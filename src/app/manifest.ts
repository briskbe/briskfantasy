import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Brisk",
    short_name: "Brisk",
    description: "Websites, webshops, software en apps op maat.",
    start_url: "/",
    display: "standalone",
    theme_color: "#07080C",
    background_color: "#07080C",
    icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml" }],
  };
}
