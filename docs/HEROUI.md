# HeroUI workspace tooling

The CMS uses HeroUI React v3 with React 19 and Tailwind CSS v4. It imports the
packaged default light and dark themes, including the standard blue accent
`oklch(0.6204 0.195 253.83)`. Keep its default component styling; do not add
portal-wide Card, Button, Input or theme-token overrides. The layout and print
styles in `src/app/cms/cms.css` remain separate from the marketing site.

The CMS and public proposals use Dutch (`nl-BE`). `CmsAppearance` provides
React Aria localization and routing, and remembers the light/dark preference
in local storage. Navigation follows the HeroUI CRM template: a collapsible desktop sidebar with
grouped links and an account menu at the bottom, plus a HeroUI Drawer on mobile.
The sidebar uses the packaged button variants, Avatar, Dropdown and Tooltip; the
Drawer handles focus trapping, Escape dismissal and scroll locking.

The official React MCP server is configured for Codex in `.codex/config.toml`
and for compatible agents in `.mcp.json`. Start a new agent session after changing
MCP configuration so its tool registry can load the server. The stdio server has
been verified with an initialize handshake, `tools/list` and `list_components`.

The official project-scoped agent skill is installed in
`.agents/skills/heroui-react/`. Read its `SKILL.md` before editing HeroUI components.
Its scripts retrieve current component documentation, styles and theme variables.

Official references:

- https://heroui.com/react/llms.txt
- https://heroui.com/react/llms-full.txt
- https://heroui.com/react/llms-components.txt
- https://heroui.com/react/llms-patterns.txt
- https://heroui.com/en/docs/react/getting-started/mcp-server
- https://heroui.com/en/docs/react/getting-started/agent-skills

This is HeroUI v3: use compound components and semantic variants. A
`HeroUIProvider` is not required. Fetch the relevant v3 docs before implementation.
