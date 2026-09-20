"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, type ReactNode } from "react";
import { Button, Modal } from "@heroui/react";
import {
  ArrowUpRight,
  CalendarCheck2,
  ChevronRight,
  FileText,
  FolderKanban,
  LayoutDashboard,
  LogOut,
  Menu,
  Settings2,
  Users,
} from "lucide-react";
import { authClient } from "@/lib/cms/auth-client";
import { CmsProvider, useCms } from "./cms-provider";
import { ErrorNotice, initials } from "./ui";

const navigation = [
  { href: "/cms", label: "Overview", icon: LayoutDashboard },
  { href: "/cms/clients", label: "Clients", icon: Users },
  { href: "/cms/projects", label: "Projects", icon: FolderKanban },
  { href: "/cms/follow-ups", label: "Follow-ups", icon: CalendarCheck2 },
  { href: "/cms/quotes", label: "Quotes", icon: FileText },
];

function Navigation({ close }: { close?: () => void }) {
  const pathname = usePathname();
  const { data } = useCms();
  const openFollowUps =
    data?.followUps.filter((item) => item.status === "open").length || 0;
  return (
    <nav aria-label="Workspace navigation" className="cms-navigation">
      <p className="cms-nav-label">Workspace</p>
      {navigation.map(({ href, label, icon: Icon }) => {
        const active =
          href === "/cms" ? pathname === href : pathname.startsWith(href);
        return (
          <Link
            key={href}
            href={href}
            onClick={close}
            className={`cms-nav-link ${active ? "is-active" : ""}`}
            aria-current={active ? "page" : undefined}
          >
            <Icon size={18} strokeWidth={1.6} />
            <span>{label}</span>
            {href === "/cms/follow-ups" && openFollowUps > 0 && (
              <span className="cms-nav-count">{openFollowUps}</span>
            )}
          </Link>
        );
      })}
    </nav>
  );
}

function Shell({
  children,
  user,
}: {
  children: ReactNode;
  user?: { name?: string; email?: string };
}) {
  const { data } = useCms();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [signingOut, setSigningOut] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const profile = data?.user || user;
  const pageName = pathname.startsWith("/cms/settings")
    ? "Settings"
    : [...navigation].reverse().find((entry) => pathname.startsWith(entry.href))
        ?.label || "Workspace";
  async function signOut() {
    setSigningOut(true);
    setError(null);
    try {
      const result = await authClient.signOut();
      if (result.error)
        throw new Error("Could not sign out. Please try again.");
      // Clear the authenticated React tree and router cache after signing out.
      // eslint-disable-next-line @next/next/no-location-assign-relative-destination
      window.location.assign("/cms/login");
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Could not sign out.");
      setSigningOut(false);
    }
  }
  const sidebarContent = (
    <>
      <Link
        href="/cms"
        className="cms-wordmark"
        onClick={() => setMenuOpen(false)}
        aria-label="Brisk workspace"
      >
        brisk<span>.</span>
      </Link>
      <div className="cms-workspace-label">
        <span className="cms-workspace-symbol">b.</span>
        <div>
          <strong>Brisk studio</strong>
          <span>Business workspace</span>
        </div>
      </div>
      <Navigation close={() => setMenuOpen(false)} />
      <div className="cms-sidebar-bottom">
        <Link
          href="/cms/settings"
          className={`cms-nav-link ${pathname.startsWith("/cms/settings") ? "is-active" : ""}`}
          onClick={() => setMenuOpen(false)}
        >
          <Settings2 size={18} strokeWidth={1.6} />
          Settings
        </Link>
        <a
          href="/"
          className="cms-nav-link"
          target="_blank"
          rel="noopener noreferrer"
        >
          <ArrowUpRight size={18} strokeWidth={1.6} />
          Visit website
        </a>
        <div className="cms-profile">
          <span className="cms-profile-avatar">
            {initials(profile?.name || "Brisk")}
          </span>
          <div>
            <strong>{profile?.name || "Brisk"}</strong>
            <span>{profile?.email || "Owner"}</span>
          </div>
          <Button
            aria-label="Sign out"
            isIconOnly
            size="sm"
            variant="ghost"
            className="cms-signout"
            onPress={() => void signOut()}
            isPending={signingOut}
          >
            <LogOut size={17} />
          </Button>
        </div>
      </div>
    </>
  );
  return (
    <div className="cms-shell">
      <a
        href="#cms-main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-xl focus:bg-surface focus:p-4"
      >
        Skip to content
      </a>
      <aside className="cms-sidebar">{sidebarContent}</aside>
      <div className="cms-workspace">
        <header className="cms-topbar">
          <div className="flex min-w-0 items-center gap-3">
            <Button
              aria-label="Open workspace menu"
              className="cms-mobile-menu"
              variant="ghost"
              isIconOnly
              onPress={() => setMenuOpen(true)}
            >
              <Menu size={20} />
            </Button>
            <span className="text-sm text-muted">Workspace</span>
            <ChevronRight size={14} className="text-muted" />
            <span className="text-sm font-medium">{pageName}</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="cms-owner-label text-xs text-muted">
              Owner workspace
            </span>
            <span className="cms-topbar-avatar">
              {initials(profile?.name || "Brisk")}
            </span>
          </div>
        </header>
        <main id="cms-main" className="cms-main">
          <ErrorNotice message={error} />
          {children}
        </main>
        <footer className="cms-workspace-footer">
          <span>Brisk studio</span>
          <span>A little clarity. A lot of progress.</span>
        </footer>
      </div>
      <Modal.Backdrop isOpen={menuOpen} onOpenChange={setMenuOpen}>
        <Modal.Container placement="top" size="sm">
          <Modal.Dialog className="cms-mobile-sidebar">
            <Modal.CloseTrigger aria-label="Close workspace menu" />
            <Modal.Heading className="sr-only">Workspace menu</Modal.Heading>
            {sidebarContent}
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </div>
  );
}

export function CmsShell(props: {
  children: ReactNode;
  user?: { name?: string; email?: string };
}) {
  return (
    <CmsProvider>
      <Shell {...props} />
    </CmsProvider>
  );
}
