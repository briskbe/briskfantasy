import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";

const geist = Geist({ variable: "--font-geist", subsets: ["latin"], display: "swap" });
// Small labels can use the monospace fallback on slow connections without
// delaying the headline fonts or swapping their layout later.
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"], display: "optional", preload: false });
const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif", subsets: ["latin"], weight: "400", style: "italic", display: "swap",
});

export const fontVariables = `${geist.variable} ${geistMono.variable} ${instrumentSerif.variable}`;
