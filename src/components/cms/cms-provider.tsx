"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import type { CmsData } from "@/lib/cms/types";
import { cmsApi } from "./api";

type CmsContextValue = {
  data: CmsData | null;
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
};
const CmsContext = createContext<CmsContextValue | null>(null);

export function CmsProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<CmsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const sequence = useRef(0);
  const refresh = useCallback(async () => {
    const request = ++sequence.current;
    try {
      const next = await cmsApi<CmsData>("/api/cms/data");
      if (request === sequence.current) {
        setData(next);
        setError(null);
      }
    } catch (cause) {
      if (request === sequence.current)
        setError(
          cause instanceof Error
            ? cause.message
            : "Het beheerportaal kon niet worden geladen.",
        );
    } finally {
      if (request === sequence.current) setLoading(false);
    }
  }, []);
  useEffect(() => {
    let mounted = true;
    const request = ++sequence.current;
    const controller = new AbortController();
    cmsApi<CmsData>("/api/cms/data", { signal: controller.signal })
      .then((next) => {
        if (mounted && request === sequence.current) {
          setData(next);
          setError(null);
        }
      })
      .catch((cause) => {
        if (mounted && request === sequence.current)
          setError(
            cause instanceof Error
              ? cause.message
              : "Het beheerportaal kon niet worden geladen.",
          );
      })
      .finally(() => {
        if (mounted && request === sequence.current) setLoading(false);
      });
    return () => {
      mounted = false;
      controller.abort();
    };
  }, []);
  useEffect(() => {
    let lastRefresh = 0;
    const revalidate = () => {
      if (document.visibilityState !== "visible") return;
      const now = Date.now();
      if (now - lastRefresh < 1000) return;
      lastRefresh = now;
      void refresh();
    };
    window.addEventListener("focus", revalidate);
    document.addEventListener("visibilitychange", revalidate);
    const interval = window.setInterval(revalidate, 60_000);
    return () => {
      window.removeEventListener("focus", revalidate);
      document.removeEventListener("visibilitychange", revalidate);
      window.clearInterval(interval);
    };
  }, [refresh]);
  return (
    <CmsContext.Provider value={{ data, loading, error, refresh }}>
      {children}
    </CmsContext.Provider>
  );
}

export function useCms() {
  const context = useContext(CmsContext);
  if (!context) throw new Error("useCms must be used inside CmsProvider.");
  return context;
}
