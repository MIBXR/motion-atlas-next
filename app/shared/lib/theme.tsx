import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import type { ThemeMode } from "../site";

interface ThemeValue {
  mode: ThemeMode;
  resolved: "light" | "dark";
  setMode: (mode: ThemeMode) => void;
}

const ThemeContext = createContext<ThemeValue | null>(null);

function systemTheme(): "light" | "dark" {
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function readMode(storageKey: string, fallback: ThemeMode): ThemeMode {
  try {
    const saved = localStorage.getItem(storageKey);
    if (saved === "light" || saved === "dark" || saved === "system") return saved;
  } catch {
    // Storage can be unavailable in private or embedded contexts.
  }
  return fallback;
}

function resolveTheme(mode: ThemeMode): "light" | "dark" {
  return mode === "system" ? systemTheme() : mode;
}

export function ThemeProvider({
  storageKey,
  defaultMode,
  children
}: {
  storageKey: string;
  defaultMode: ThemeMode;
  children: ReactNode;
}) {
  const [mode, setModeState] = useState<ThemeMode>(() => readMode(storageKey, defaultMode));
  const [resolved, setResolved] = useState<"light" | "dark">(() => resolveTheme(mode));

  useEffect(() => {
    const next = resolveTheme(mode);
    setResolved(next);
    const root = document.documentElement;
    root.dataset.theme = next;
    root.style.colorScheme = next;
    try {
      localStorage.setItem(storageKey, mode);
    } catch {
      // Ignore unavailable local storage.
    }
    if (mode !== "system") return;
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => {
      const systemValue = systemTheme();
      setResolved(systemValue);
      root.dataset.theme = systemValue;
      root.style.colorScheme = systemValue;
    };
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, [mode, storageKey]);

  const setMode = useCallback((next: ThemeMode) => setModeState(next), []);
  const value = useMemo(() => ({ mode, resolved, setMode }), [mode, resolved, setMode]);
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const value = useContext(ThemeContext);
  if (!value) throw new Error("ThemeProvider is missing");
  return value;
}