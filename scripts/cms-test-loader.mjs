// Unit harness only: Next normally strips this package's client-import guard.
// Keep normal React exports because next/navigation loads client context helpers.
import { registerHooks } from "node:module";
registerHooks({
  resolve(specifier, context, nextResolve) {
    if (specifier === "server-only") return { url: new URL("./cms-test-loader.mjs?empty", import.meta.url).href, shortCircuit: true };
    return nextResolve(specifier, context);
  },
  load(url, context, nextLoad) {
    if (url.endsWith("cms-test-loader.mjs?empty")) return { format: "module", source: "export {};", shortCircuit: true };
    return nextLoad(url, context);
  },
});
