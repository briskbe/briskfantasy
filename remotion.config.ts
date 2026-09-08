// Remotion CLI configuration (used by `pnpm remotion:studio` / `pnpm remotion:render`).
// `@remotion/cli` is installed on demand: `pnpm add -D @remotion/cli@4.0.522`.
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore -- resolves once @remotion/cli is installed
import { Config } from "@remotion/cli/config";

Config.setVideoImageFormat("jpeg");
Config.setOverwriteOutput(true);
