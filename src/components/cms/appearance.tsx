"use client";

import { useEffect, useSyncExternalStore, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { I18nProvider, RouterProvider } from "react-aria-components";
import { Button } from "@heroui/react";
import { Moon, Sun } from "lucide-react";

const preferenceKey = "brisk-cms-theme";
const preferenceEvent = "brisk-cms-theme-change";
let currentTheme: "light" | "dark" | undefined;

function readTheme(): "light" | "dark" {
  if (currentTheme) return currentTheme;
  try { return localStorage.getItem(preferenceKey) === "dark" ? "dark" : "light"; }
  catch { return "light"; }
}
function subscribe(callback: () => void) {
  const onStorage = (event: StorageEvent) => {
    if (event.key === preferenceKey || event.key === null) { currentTheme = undefined; callback(); }
  };
  window.addEventListener(preferenceEvent, callback);
  window.addEventListener("storage", onStorage);
  return () => {
    window.removeEventListener(preferenceEvent, callback);
    window.removeEventListener("storage", onStorage);
  };
}
const serverTheme = () => "light" as const;
function useTheme() { return useSyncExternalStore(subscribe, readTheme, serverTheme); }

export function CmsAppearance({ children }: { children: ReactNode }) {
  const theme = useTheme();
  const router = useRouter();
  useEffect(() => { document.documentElement.dataset.theme = readTheme(); }, [theme]);
  return <I18nProvider locale="nl-BE"><RouterProvider navigate={router.push}>{children}</RouterProvider></I18nProvider>;
}

export function ThemeToggle() {
  const theme = useTheme();
  const label = theme === "dark" ? "Lichte weergave" : "Donkere weergave";
  return <Button variant="ghost" isIconOnly aria-label={label} onPress={() => {
    currentTheme = readTheme() === "dark" ? "light" : "dark";
    try { localStorage.setItem(preferenceKey, currentTheme); } catch { /* Theme still works without persistent storage. */ }
    document.documentElement.dataset.theme = currentTheme;
    window.dispatchEvent(new Event(preferenceEvent));
  }}>{theme === "dark" ? <Sun size={19} /> : <Moon size={19} />}</Button>;
}
