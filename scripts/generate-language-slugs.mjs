import assert from "node:assert/strict";
import { readFile, writeFile } from "node:fs/promises";
import ts from "typescript";

const root = new URL("../", import.meta.url);
const outputFile = new URL("src/i18n/translated-slugs.generated.ts", root);

// These data modules have no runtime dependencies. Loading only in this build
// utility keeps the full editorial copy out of the language switcher's bundle.
async function loadData(path) {
  const source = await readFile(new URL(path, root), "utf8");
  const { outputText } = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 },
  });
  return import(`data:text/javascript;base64,${Buffer.from(outputText).toString("base64")}`);
}

const [{ clusters }, { guides }] = await Promise.all([
  loadData("src/data/seo/clusters.ts"),
  loadData("src/data/seo/guides.ts"),
]);

const pairs = {
  "/diensten/[slug]": clusters.map((cluster) => [cluster.slug, cluster.slugEn ?? cluster.slug]),
  "/kennisbank/[slug]": guides.map((guide) => [guide.slug.nl, guide.slug.en]),
};

for (const [pathname, translations] of Object.entries(pairs)) {
  for (const localeIndex of [0, 1]) {
    const slugs = translations.map((pair) => pair[localeIndex]);
    assert.equal(new Set(slugs).size, slugs.length, `Duplicate locale slugs in ${pathname}`);
    assert.ok(slugs.every((slug) => typeof slug === "string" && slug.length > 0), `Missing slug in ${pathname}`);
  }
  for (const pair of translations) {
    for (const slug of pair) {
      assert.equal(
        translations.find(([nl, en]) => nl === slug || en === slug),
        pair,
        `Ambiguous cross-language slug ${slug} in ${pathname}`,
      );
    }
  }
}

const output = [
  "// Generated from clusters.ts and guides.ts; do not edit by hand.",
  "// Regenerate: node scripts/generate-language-slugs.mjs --write",
  "// Validate: node scripts/generate-language-slugs.mjs --check",
  "// Each pair contains [Dutch slug, English slug]. No page content is bundled.",
  `export const translatedSlugPairs = ${JSON.stringify(pairs, null, 2)} as const;`,
  "",
].join("\n");

if (process.argv.includes("--write")) {
  await writeFile(outputFile, output);
  console.log(`Generated ${Object.values(pairs).flat().length} translated slug pairs.`);
} else {
  const actual = await readFile(outputFile, "utf8");
  assert.equal(actual, output, "Language slug registry is stale. Run node scripts/generate-language-slugs.mjs --write");
  console.log(`Verified ${Object.values(pairs).flat().length} translated slug pairs against their source data.`);
}
