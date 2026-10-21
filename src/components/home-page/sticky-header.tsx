"use client";

import { useEffect, useRef, useState } from "react";
import { useMotionPreference } from "@/components/home-page/motion-provider";

const TOP_ZONE = 16; // px from top where the header is always full size
const MIN_DELTA = 8; // px of scroll needed before reacting
const LOCK_MS = 300; // ignore scroll changes caused by the resize itself
const LOCK_MS_NO_MOTION = 100; // motion off: no transition, only the layout shift

export function StickyHeader({ children }: { children: React.ReactNode }) {
  const [compact, setCompact] = useState(false);
  const compactRef = useRef(false);
  const lastY = useRef(0);
  const lockUntil = useRef(0);
  const ticking = useRef(false);
  const [motionEnabled] = useMotionPreference();
  const lockMs = useRef(LOCK_MS);

  useEffect(() => {
    lockMs.current = motionEnabled ? LOCK_MS : LOCK_MS_NO_MOTION;
  }, [motionEnabled]);

  useEffect(() => {
    const setState = (next: boolean) => {
      if (compactRef.current === next) return;
      compactRef.current = next;
      lockUntil.current = performance.now() + lockMs.current;
      setCompact(next);
    };

    const update = () => {
      ticking.current = false;
      const y = window.scrollY;

      if (performance.now() < lockUntil.current) {
        lastY.current = y;
        return;
      }

      if (y < TOP_ZONE) {
        setState(false);
        lastY.current = y;
        return;
      }

      const delta = y - lastY.current;
      if (Math.abs(delta) >= MIN_DELTA) {
        setState(delta > 0);
        lastY.current = y;
      }
    };

    const onScroll = () => {
      if (!ticking.current) {
        ticking.current = true;
        requestAnimationFrame(update);
      }
    };

    lastY.current = window.scrollY;
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      data-compact={compact}
      className="group sticky top-0 z-50 mb-0 border-b border-transparent bg-header motion-allowed:transition-[margin,border-color,box-shadow] motion-allowed:duration-200 motion-allowed:ease-out data-[compact=true]:mb-10 data-[compact=true]:border-border data-[compact=true]:shadow-sm"
    >
      {children}
    </header>
  );
}
