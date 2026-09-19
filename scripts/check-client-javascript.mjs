// A successful Next build can still emit invalid code when a dependency hits
// a minifier bug. Parse every browser chunk without executing vendor code.
import { readdir, readFile } from "node:fs/promises";
import { createRequire } from "node:module";
import path from "node:path";

const require = createRequire(import.meta.url);
const { parse } = require("next/dist/compiled/acorn/acorn");
const root = path.resolve(".next/static/chunks");
const entries = await readdir(root, { recursive: true, withFileTypes: true });
let count = 0;
for (const entry of entries) {
  if (!entry.isFile() || !entry.name.endsWith(".js")) continue;
  const file = path.join(entry.parentPath, entry.name);
  try {
    parse(await readFile(file, "utf8"), { ecmaVersion: "latest", sourceType: "module" });
    count++;
  } catch (error) {
    throw new Error(`Invalid browser JavaScript in ${path.relative(process.cwd(), file)}: ${error.message}`, { cause: error });
  }
}
if (!count) throw new Error("No production browser JavaScript found.");
console.log(`Validated syntax of ${count} production browser chunks.`);
