"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, type ReactNode } from "react";
import { Button, Dropdown, Label, Separator, Tabs } from "@heroui/react";
import { ArrowUpRight, CalendarCheck2, ChevronDown, CircleUserRound, FileText, FolderKanban, LayoutDashboard, LogOut, Menu, Settings2, Users } from "lucide-react";
import { authClient } from "@/lib/cms/auth-client";
import { CmsProvider, useCms } from "./cms-provider";
import { ErrorNotice } from "./ui";
import { ThemeToggle } from "./appearance";

const navigation = [
  { href: "/cms", label: "Overzicht", icon: LayoutDashboard },
  { href: "/cms/clients", label: "Klanten", icon: Users },
  { href: "/cms/projects", label: "Projecten", icon: FolderKanban },
  { href: "/cms/follow-ups", label: "Opvolging", icon: CalendarCheck2 },
  { href: "/cms/quotes", label: "Offertes", icon: FileText },
  { href: "/cms/settings", label: "Instellingen", icon: Settings2 },
];

function Shell({ children, user }: { children: ReactNode; user?: { name?: string; email?: string } }) {
  const { data } = useCms();
  const pathname = usePathname();
  const [signingOut, setSigningOut] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const profile = data?.user || user;
  const current = [...navigation].reverse().find((item) => pathname.startsWith(item.href))?.href || "/cms";
  async function signOut() {
    setSigningOut(true); setError(null);
    try {
      const result = await authClient.signOut();
      if (result.error) throw new Error("Uitloggen is niet gelukt. Probeer het opnieuw.");
      // Clear private data and the router cache after the session is revoked.
      // eslint-disable-next-line @next/next/no-location-assign-relative-destination
      window.location.assign("/cms/login");
    } catch (cause) {
      setError(cause instanceof Error && !(cause instanceof TypeError) && !(cause instanceof SyntaxError) ? cause.message : "Uitloggen is niet gelukt.");
      setSigningOut(false);
    }
  }
  return <div className="cms-shell">
    <a href="#cms-main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-surface focus:p-4">Naar de inhoud</a>
    <header className="cms-header">
      <div className="cms-header-inner">
        <div className="flex min-w-0 items-center gap-5">
          <Link href="/cms" aria-label="Brisk overzicht" className="shrink-0">
            <Image className="cms-light-logo" src="/logo.svg" alt="Brisk" width={104} height={32} priority />
            <Image className="cms-dark-logo" src="/logo-light.svg" alt="Brisk" width={104} height={32} priority />
          </Link>
          <span className="hidden border-l border-separator pl-5 text-sm text-muted sm:block">Beheer</span>
        </div>
        <div className="flex items-center gap-1 sm:gap-2">
          <div className="sm:hidden"><Dropdown>
            <Button variant="ghost" isIconOnly aria-label="Navigatie openen"><Menu size={20} /></Button>
            <Dropdown.Popover><Dropdown.Menu aria-label="Hoofdnavigatie">
              {navigation.map(({ href, label, icon: Icon }) => <Dropdown.Item key={href} id={href} href={href} textValue={label} aria-current={current === href ? "page" : undefined}><Icon size={17} /><Label>{label}</Label></Dropdown.Item>)}
            </Dropdown.Menu></Dropdown.Popover>
          </Dropdown></div>
          <ThemeToggle />
          <Dropdown>
            <Button variant="tertiary" aria-label="Accountmenu" isPending={signingOut}><CircleUserRound size={19} /><span className="hidden text-sm sm:inline">{profile?.email || "Mijn account"}</span><ChevronDown size={14} /></Button>
            <Dropdown.Popover><Dropdown.Menu aria-label="Mijn account" onAction={(key) => { if (key === "sign-out") void signOut(); }}>
              <Dropdown.Item id="settings" href="/cms/settings" textValue="Instellingen"><Settings2 size={17} /><Label>Instellingen</Label></Dropdown.Item>
              <Dropdown.Item id="website" href="/" target="_blank" rel="noopener noreferrer" textValue="Website bekijken"><ArrowUpRight size={17} /><Label>Website bekijken</Label></Dropdown.Item>
              <Separator />
              <Dropdown.Item id="sign-out" textValue="Uitloggen" isDisabled={signingOut}><LogOut size={17} /><Label>Uitloggen</Label></Dropdown.Item>
            </Dropdown.Menu></Dropdown.Popover>
          </Dropdown>
        </div>
      </div>
      <nav aria-label="Hoofdnavigatie" className="cms-desktop-navigation hidden sm:block">
        <Tabs selectedKey={current} variant="secondary">
          <div className="tabs__list-container overflow-x-auto"><Tabs.List aria-label="Beheeronderdelen">
            {navigation.map(({ href, label, icon: Icon }) => <Tabs.Tab key={href} id={href} href={href} className="gap-2"><Icon size={16} />{label}<Tabs.Indicator /></Tabs.Tab>)}
          </Tabs.List></div>
        </Tabs>
      </nav>
    </header>
    <main id="cms-main" className="cms-main"><ErrorNotice message={error} />{children}</main>
    <footer className="cms-workspace-footer"><span>Brisk</span><a href="mailto:info@brisk.be">info@brisk.be</a></footer>
  </div>;
}

export function CmsShell(props: { children: ReactNode; user?: { name?: string; email?: string } }) {
  return <CmsProvider><Shell {...props} /></CmsProvider>;
}
