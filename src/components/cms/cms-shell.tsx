"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";
import { Link as AriaLink } from "react-aria-components";
import { Avatar, Button, buttonVariants, Drawer, Dropdown, Label, Separator, Tooltip } from "@heroui/react";
import { ArrowUpRight, CalendarCheck2, ChevronsUpDown, FileText, FolderKanban, LayoutDashboard, LogOut, Menu, PanelLeftClose, PanelLeftOpen, Settings2, Users } from "lucide-react";
import { authClient } from "@/lib/cms/auth-client";
import { CmsProvider, useCms } from "./cms-provider";
import { ErrorNotice } from "./ui";
import { ThemeToggle } from "./appearance";

const navigation = [
  { href: "/cms", label: "Overzicht", icon: LayoutDashboard },
  { href: "/cms/follow-ups", label: "Opvolging", icon: CalendarCheck2 },
  { href: "/cms/clients", label: "Klanten", icon: Users },
  { href: "/cms/projects", label: "Projecten", icon: FolderKanban },
  { href: "/cms/quotes", label: "Offertes", icon: FileText },
  { href: "/cms/settings", label: "Instellingen", icon: Settings2 },
];
type NavigationItem = (typeof navigation)[number];

function SidebarLink({ item: { href, label, icon: Icon }, current, collapsed = false, onNavigate }: {
  item: NavigationItem; current: string; collapsed?: boolean; onNavigate?: () => void;
}) {
  return <Tooltip isDisabled={!collapsed} delay={150}>
    <AriaLink href={href} aria-label={collapsed ? label : undefined} aria-current={current === href ? "page" : undefined}
      onPress={onNavigate} className={buttonVariants({ variant: current === href ? "secondary" : "ghost", className: `cms-sidebar-link ${collapsed ? "cms-sidebar-link-compact" : ""}` })}>
      <Icon size={18} strokeWidth={1.7} aria-hidden="true" />
      {!collapsed && <span>{label}</span>}
    </AriaLink>
    <Tooltip.Content placement="right">{label}</Tooltip.Content>
  </Tooltip>;
}

function SidebarBrand({ collapsed = false, onNavigate }: { collapsed?: boolean; onNavigate?: () => void }) {
  return <Link href="/cms" aria-label="Brisk overzicht" onClick={onNavigate} className="cms-sidebar-brand">
    {collapsed ? <Image src="/logo-mark.svg" alt="Brisk" width={30} height={30} priority /> : <>
      <Image className="cms-light-logo" src="/logo.svg" alt="Brisk" width={116} height={30} priority />
      <Image className="cms-dark-logo" src="/logo-light.svg" alt="Brisk" width={116} height={30} priority />
    </>}
  </Link>;
}

function SidebarNavigation({ current, collapsed = false, onNavigate }: { current: string; collapsed?: boolean; onNavigate?: () => void }) {
  return <nav aria-label="Hoofdnavigatie" className="cms-sidebar-navigation">
    <div className="cms-sidebar-group">
      {navigation.slice(0, 2).map((item) => <SidebarLink key={item.href} item={item} current={current} collapsed={collapsed} onNavigate={onNavigate} />)}
    </div>
    <div className="cms-sidebar-group" role="group" aria-label="Werkruimte">
      {collapsed ? <Separator className="my-3" /> : <p className="cms-sidebar-group-label">Werkruimte</p>}
      {navigation.slice(2, 5).map((item) => <SidebarLink key={item.href} item={item} current={current} collapsed={collapsed} onNavigate={onNavigate} />)}
    </div>
  </nav>;
}

function Shell({ children, user }: { children: ReactNode; user?: { name?: string; email?: string } }) {
  const { data } = useCms();
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [signingOut, setSigningOut] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const profile = data?.user || user;
  const current = navigation.find((item) => item.href === pathname || (item.href !== "/cms" && pathname.startsWith(`${item.href}/`))) || navigation[0];
  const CurrentIcon = current.icon;

  // Release the modal focus trap and scroll lock when switching to desktop.
  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1024px)");
    const closeOnDesktop = () => { if (desktop.matches) setMobileOpen(false); };
    desktop.addEventListener("change", closeOnDesktop);
    return () => desktop.removeEventListener("change", closeOnDesktop);
  }, []);

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
      setMobileOpen(false);
    }
  }

  function sidebarFooter(compact: boolean, onNavigate?: () => void) {
    return <div className="cms-sidebar-footer">
      <nav aria-label="Beheer en website" className="cms-sidebar-group">
        <SidebarLink item={navigation[5]} current={current.href} collapsed={compact} onNavigate={onNavigate} />
        <Tooltip isDisabled={!compact} delay={150}>
          <AriaLink href="/" target="_blank" rel="noopener noreferrer" aria-label={compact ? "Website bekijken" : undefined}
            className={buttonVariants({ variant: "ghost", className: `cms-sidebar-link ${compact ? "cms-sidebar-link-compact" : ""}` })}>
            <ArrowUpRight size={18} strokeWidth={1.7} aria-hidden="true" />{!compact && <span>Website bekijken</span>}
          </AriaLink>
          <Tooltip.Content placement="right">Website bekijken</Tooltip.Content>
        </Tooltip>
      </nav>
      <Separator className="my-3" />
      <Dropdown>
        <Button variant="ghost" aria-label="Accountmenu" isPending={signingOut} className={`cms-sidebar-account ${compact ? "cms-sidebar-account-compact" : ""}`}>
          <Avatar size="sm" className="shrink-0"><Avatar.Fallback>{(profile?.name || "Brisk").trim().slice(0, 1).toUpperCase()}</Avatar.Fallback></Avatar>
          {!compact && <><span className="min-w-0 flex-1 text-left"><span className="block truncate text-sm font-medium">{profile?.name || "Brisk"}</span><span className="block truncate text-xs font-normal text-muted">{profile?.email || "Mijn account"}</span></span><ChevronsUpDown size={15} className="shrink-0 text-muted" aria-hidden="true" /></>}
        </Button>
        <Dropdown.Popover placement={compact ? "right bottom" : "top start"}><Dropdown.Menu aria-label="Mijn account" onAction={(key) => { if (key === "sign-out") void signOut(); else onNavigate?.(); }}>
          <Dropdown.Item id="settings" href="/cms/settings" textValue="Instellingen"><Settings2 size={17} /><Label>Instellingen</Label></Dropdown.Item>
          <Separator />
          <Dropdown.Item id="sign-out" textValue="Uitloggen" isDisabled={signingOut}><LogOut size={17} /><Label>Uitloggen</Label></Dropdown.Item>
        </Dropdown.Menu></Dropdown.Popover>
      </Dropdown>
    </div>;
  }

  return <div className="cms-shell" data-sidebar-collapsed={collapsed}>
    <a href="#cms-main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-surface focus:p-4">Naar de inhoud</a>
    <aside id="cms-sidebar" className="cms-sidebar" aria-label="Brisk beheer">
      <div className="cms-sidebar-heading"><SidebarBrand collapsed={collapsed} /></div>
      <div className="cms-sidebar-scroll"><SidebarNavigation current={current.href} collapsed={collapsed} /></div>
      {sidebarFooter(collapsed)}
    </aside>
    <div className="cms-workspace">
      <header className="cms-header">
        <div className="cms-header-inner">
          <div className="flex min-w-0 items-center gap-3">
            <div className="hidden lg:block"><Tooltip delay={150}>
              <Button variant="ghost" isIconOnly aria-label={collapsed ? "Zijbalk uitklappen" : "Zijbalk inklappen"} aria-expanded={!collapsed} aria-controls="cms-sidebar" onPress={() => setCollapsed(!collapsed)}>
                {collapsed ? <PanelLeftOpen size={19} /> : <PanelLeftClose size={19} />}
              </Button>
              <Tooltip.Content>{collapsed ? "Zijbalk uitklappen" : "Zijbalk inklappen"}</Tooltip.Content>
            </Tooltip></div>
            <div className="lg:hidden"><Drawer isOpen={mobileOpen} onOpenChange={setMobileOpen}>
              <Button variant="ghost" isIconOnly aria-label="Navigatie openen"><Menu size={20} /></Button>
              <Drawer.Backdrop className="cms-navigation-backdrop">
                <Drawer.Content placement="left">
                  <Drawer.Dialog className="cms-navigation-drawer" aria-label="Navigatie">
                    <Drawer.CloseTrigger aria-label="Navigatie sluiten" />
                    <Drawer.Header className="cms-drawer-heading"><SidebarBrand onNavigate={() => setMobileOpen(false)} /></Drawer.Header>
                    <Drawer.Body><SidebarNavigation current={current.href} onNavigate={() => setMobileOpen(false)} /></Drawer.Body>
                    <Drawer.Footer className="cms-drawer-footer">{sidebarFooter(false, () => setMobileOpen(false))}</Drawer.Footer>
                  </Drawer.Dialog>
                </Drawer.Content>
              </Drawer.Backdrop>
            </Drawer></div>
            <Separator orientation="vertical" className="h-5" />
            <span className="flex min-w-0 items-center gap-2.5 text-sm font-medium"><CurrentIcon size={17} className="shrink-0 text-muted" aria-hidden="true" /><span className="truncate">{current.label}</span></span>
          </div>
          <ThemeToggle />
        </div>
      </header>
      <main id="cms-main" tabIndex={-1} className="cms-main"><ErrorNotice message={error} />{children}</main>
      <footer className="cms-workspace-footer"><span>Brisk</span><a href="mailto:info@brisk.be">info@brisk.be</a></footer>
    </div>
  </div>;
}

export function CmsShell(props: { children: ReactNode; user?: { name?: string; email?: string } }) {
  return <CmsProvider><Shell {...props} /></CmsProvider>;
}
