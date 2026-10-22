"use client";

import {
  createContext,
  use,
  useEffect,
  useSyncExternalStore,
  type ReactNode,
} from "react";

const MOTION_STORAGE_KEY = "motion-preference";
const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

function readStoredMotion(): boolean | null {
  try {
    const value = window.localStorage.getItem(MOTION_STORAGE_KEY);
    return value === null ? null : value === "on";
  } catch {
    return null;
  }
}

function applyMotion(enabled: boolean) {
  const root = document.documentElement;
  root.dataset.motion = enabled ? "on" : "off";
  root.style.scrollBehavior = enabled ? "smooth" : "auto";
}

// Fallback for when storage is unavailable: the override lasts this session only.
let sessionMotion: boolean | null = null;
const motionListeners = new Set<() => void>();

function subscribeMotion(callback: () => void) {
  const media = window.matchMedia(REDUCED_MOTION_QUERY);
  motionListeners.add(callback);
  media.addEventListener("change", callback);
  return () => {
    motionListeners.delete(callback);
    media.removeEventListener("change", callback);
  };
}

function getMotionSnapshot() {
  return (
    sessionMotion ??
    readStoredMotion() ??
    !window.matchMedia(REDUCED_MOTION_QUERY).matches
  );
}

function getServerMotionSnapshot() {
  return false;
}

function setMotion(next: boolean) {
  sessionMotion = next;
  try {
    window.localStorage.setItem(MOTION_STORAGE_KEY, next ? "on" : "off");
  } catch {
    /* storage unavailable: preference applies for this session only */
  }
  motionListeners.forEach((listener) => listener());
}

type MotionContextValue = readonly [
  enabled: boolean,
  setEnabled: (next: boolean) => void,
];

const MotionContext = createContext<MotionContextValue | null>(null);

// Owns the motion preference for the whole page: one subscription, and one
// place that writes `data-motion` to <html>, however many controls render.
export function MotionProvider({ children }: { children: ReactNode }) {
  const enabled = useSyncExternalStore(
    subscribeMotion,
    getMotionSnapshot,
    getServerMotionSnapshot,
  );

  useEffect(() => applyMotion(enabled), [enabled]);

  return <MotionContext value={[enabled, setMotion]}>{children}</MotionContext>;
}

export function useMotionPreference() {
  const value = use(MotionContext);
  if (!value) {
    throw new Error("useMotionPreference must be used inside <MotionProvider>");
  }
  return value;
}
