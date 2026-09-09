import { portfolio } from "@/data/portfolio";

/**
 * One deliberate crop of a portfolio mockup.
 *
 * The mockups are 16:12 landscape plates with a phone somewhere inside them.
 * Dropping such a plate into a 9:19.5 display with `object-cover` produced the
 * phone-inside-a-phone, the clipped screen title and the island sitting on top
 * of the content. So instead of guessing an object-position we name the exact
 * rectangle of the phone's *own screen*: `u0`/`v0` is its top-left corner and
 * `du` its width, both normalised to the source image. The height follows from
 * the display's aspect ratio (see `screenRect`), which guarantees that every
 * screen lands at the same device scale, with its status bar, never squeezed
 * and never showing a bezel.
 */
export type ScreenCrop = { id: string; u0: number; du: number; v0: number };

/** Aspect ratio of the phone display these crops are cut for (9:19.5). */
export const DISPLAY_ASPECT = 9 / 19.5;

/** Six screens, all cut to the same device scale. Order matches `screens.items.*`. */
export const SCREEN_CROPS: ScreenCrop[] = [
  { id: "026-w020", u0: 0.045, du: 0.29, v0: 0.052 },
  { id: "044-w038", u0: 0.145, du: 0.265, v0: 0.235 },
  { id: "031-w025", u0: 0.345, du: 0.29, v0: 0.08 },
  { id: "029-w023", u0: 0.33, du: 0.29, v0: 0.1 },
  { id: "045-w039", u0: 0.155, du: 0.265, v0: 0.23 },
  { id: "026-w020", u0: 0.655, du: 0.29, v0: 0.052 },
];

/** The hero's rotating screens, indexes into SCREEN_CROPS so they cannot drift. */
export const HERO_FRONT_INDEXES = [3, 2, 0] as const;
/** The screen on the phone standing behind the hero device. */
export const HERO_BACK_INDEX = 1;

export type ScreenRect = {
  src: string;
  /** Box that holds the whole source image, in percent of the display. */
  left: number;
  top: number;
  width: number;
  height: number;
};

/**
 * Turns a crop into the box that holds the full source image, sized and offset
 * so the named rectangle exactly fills the display. The box keeps the image's
 * own aspect ratio, so nothing is stretched and nothing is cropped by accident.
 */
export function screenRect(crop: ScreenCrop): ScreenRect {
  const item = portfolio.find((p) => p.id === crop.id);
  if (!item) throw new Error(`Unknown portfolio item: ${crop.id}`);
  const dv = (crop.du * (item.width / item.height)) / DISPLAY_ASPECT;
  return {
    src: item.src,
    width: 100 / crop.du,
    height: 100 / dv,
    left: (-crop.u0 / crop.du) * 100,
    top: (-crop.v0 / dv) * 100,
  };
}
