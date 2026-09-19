import type { ReactNode } from "react";

/** Keep route content visible from its first server-rendered frame. */
export default function Template({ children }: { children: ReactNode }) {
  return <div>{children}</div>;
}
