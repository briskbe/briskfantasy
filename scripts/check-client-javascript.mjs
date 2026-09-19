// A successful Next build can still emit invalid code when a dependency hits
// a minifier bug. Parse every browser chunk without executing vendor code.
import { readdir, readFile } from "node:fs/promises";
import { createRequire } from "node:module";
import path from "node:path";

const require = createRequire(import.meta.url);
const { parse } = require("next/dist/compiled/acorn/acorn");
// Vercel enables Next's immutable assets, placing chunks in static/immutable/
// instead of static/chunks/. Validate the entire browser output in both layouts.
const root = path.resolve(".next/static");
const entries = await readdir(root, { recursive: true, withFileTypes: true });
let count = 0;
let chunkCount = 0;
for (const entry of entries) {
  if (!entry.isFile() || !entry.name.endsWith(".js")) continue;
  const file = path.join(entry.parentPath, entry.name);
  try {
    parse(await readFile(file, "utf8"), { ecmaVersion: "latest", sourceType: "module" });
    count++;
    if (path.relative(root, file).split(path.sep).slice(0, -1).includes("chunks")) chunkCount++;
  } catch (error) {
    throw new Error(`Invalid browser JavaScript in ${path.relative(process.cwd(), file)}: ${error.message}`, { cause: error });
  }
}
if (!chunkCount) throw new Error("No production browser JavaScript chunks found.");
console.log(`Validated syntax of ${count} production browser JavaScript files.`);
