<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## HeroUI CMS

The private `/cms` portal uses HeroUI v3. Before changing its UI, read
`.agents/skills/heroui-react/SKILL.md` and fetch the relevant component documentation.
The `heroui-react` MCP server is configured in `.codex/config.toml` and `.mcp.json`.
Documentation index: https://heroui.com/react/llms.txt
Full React reference: https://heroui.com/react/llms-full.txt
Use v3 compound components and keep portal styles isolated from the public website.

The CMS and public quote interface are Dutch (`nl-BE`). Use HeroUI's packaged
default light/dark themes and blue accent; retain default component styling.
The workspace uses a collapsible sidebar on desktop and a HeroUI Drawer on mobile.
