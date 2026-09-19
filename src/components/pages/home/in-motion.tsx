"use client";

import { LazyShowreel, type ShowreelShot } from "@/components/remotion/lazy-showreel";

/** The ShowreelBrowser Remotion composition, framed like the work cards. */
export function InMotion({ shots }: { shots: ShowreelShot[] }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-ink-2 shadow-[0_60px_120px_-40px_rgba(0,0,0,0.7)]">
      <LazyShowreel shots={shots} />
    </div>
  );
}
