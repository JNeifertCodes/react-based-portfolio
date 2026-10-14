"use client";

import * as React from "react";
import { useTheme } from "@wrksz/themes/client";
import { Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

const MOTION_STORAGE_KEY = "motion-preference";
const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";
const MOBILE_QUERY = "(max-width: 760px)";
const VIEWPORT_GUTTER = 16;
const SIDE_OFFSET = 8;

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

function useAnimationsPreference() {
  const [enabled, setEnabled] = React.useState(false);
  const [overridden, setOverridden] = React.useState(false);

  React.useEffect(() => {
    const media = window.matchMedia(REDUCED_MOTION_QUERY);
    const stored = readStoredMotion();

    if (stored !== null) {
      setOverridden(true);
      setEnabled(stored);
      applyMotion(stored);
      return;
    }

    const sync = () => {
      const next = !media.matches;
      setEnabled(next);
      applyMotion(next);
    };
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, [overridden]);

  const update = React.useCallback((next: boolean) => {
    setOverridden(true);
    setEnabled(next);
    applyMotion(next);
    try {
      window.localStorage.setItem(MOTION_STORAGE_KEY, next ? "on" : "off");
    } catch {
      /* storage unavailable: preference applies for this session only */
    }
  }, []);

  return [enabled, update] as const;
}

function usePopoverPlacement(open: boolean) {
  const triggerRef = React.useRef<HTMLButtonElement>(null);
  const [popup, setPopup] = React.useState<HTMLDivElement | null>(null);
  const [centered, setCentered] = React.useState(false);

  const update = React.useCallback(() => {
    const trigger = triggerRef.current;
    if (!trigger || !popup) return;

    if (!window.matchMedia(MOBILE_QUERY).matches) {
      setCentered(false);
      return;
    }

    const viewportHeight = window.visualViewport?.height ?? window.innerHeight;
    const spaceBelow =
      viewportHeight -
      trigger.getBoundingClientRect().bottom -
      SIDE_OFFSET -
      VIEWPORT_GUTTER;

    setCentered(popup.scrollHeight > spaceBelow);
  }, [popup]);

  React.useLayoutEffect(() => {
    if (!open || !popup) return;

    update();
    const observer = new ResizeObserver(update);
    observer.observe(popup);
    window.addEventListener("resize", update);
    window.addEventListener("scroll", update, { passive: true });
    window.visualViewport?.addEventListener("resize", update);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", update);
      window.removeEventListener("scroll", update);
      window.visualViewport?.removeEventListener("resize", update);
    };
  }, [open, popup, update]);

  return { triggerRef, popupRef: setPopup, centered };
}

const themeOptions = [
  { value: "light", label: "Light" },
  { value: "dark", label: "Dark" },
] as const;

export function DisplayPreferences() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  const [animations, setAnimations] = useAnimationsPreference();
  const [open, setOpen] = React.useState(false);
  const { triggerRef, popupRef, centered } = usePopoverPlacement(open);

  const themeLabelId = React.useId();
  const animationsLabelId = React.useId();
  const animationsDescriptionId = React.useId();

  React.useEffect(() => setMounted(true), []);

  const currentTheme = mounted ? (theme ?? "light") : undefined;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        ref={triggerRef}
        render={<Button className={`border-input hover:underline`} />}
      >
        Display preferences
      </PopoverTrigger>

      <PopoverContent
        ref={popupRef}
        side="bottom"
        align="end"
        sideOffset={SIDE_OFFSET}
        positionerClassName={
          centered
            ? "pointer-events-none fixed! inset-0! flex! items-center! justify-center! transform-none! translate-none! p-4"
            : undefined
        }
        className="pointer-events-auto max-h-[calc(100dvh-2rem)] w-[min(22rem,calc(100vw-2rem))] gap-0 overflow-y-auto rounded-2xl border border-border p-6"
      >
        <PopoverHeader className="mb-6">
          <PopoverTitle className="text-heading-md">
            Display preferences
          </PopoverTitle>
        </PopoverHeader>

        {/* Theme */}
        <div className="flex flex-col gap-3">
          <span id={themeLabelId} className="text-body-lg">
            Theme
          </span>

          <ToggleGroup
            aria-labelledby={themeLabelId}
            value={currentTheme ? [currentTheme] : []}
            onValueChange={(value: string[]) => {
              // Keep one option selected at all times.
              const next = value[0];
              if (next === "light" || next === "dark") setTheme(next);
            }}
            className="grid w-full grid-cols-2 gap-1 rounded-xl border bg-muted p-1"
          >
            {themeOptions.map((option) => (
              <ToggleGroupItem
                key={option.value}
                value={option.value}
                className={`h-10 rounded-lg text-body-lg text-muted-foreground  hover:not-aria-pressed:text-secondary-foreground dark:hover:not-aria-pressed:text-background aria-pressed:bg-secondary aria-pressed:text-secondary-foreground hover:underline`}
              >
                {currentTheme === option.value && (
                  <Check aria-hidden="true" className="size-5" />
                )}
                {option.label}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </div>

        <Separator className="my-6" />

        {/* Animations */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between gap-4">
            <span id={animationsLabelId} className="text-body-lg">
              Animations
            </span>

            <div className="flex items-center gap-3">
              {/* Visible state text; the switch itself announces checked state. */}
              <span aria-hidden="true" className="text-body-lg">
                {animations ? "On" : "Off"}
              </span>
              <Switch
                checked={animations}
                onCheckedChange={setAnimations}
                aria-labelledby={animationsLabelId}
                aria-describedby={animationsDescriptionId}
                className={`h-7 w-12 border data-unchecked:bg-muted data-checked:bg-secondary **:data-[slot=switch-thumb]:size-5 **:data-[slot=switch-thumb]:border [&_[data-slot=switch-thumb]]:border- **:data-[slot=switch-thumb]:bg-card`}
              />
            </div>
          </div>

          <PopoverDescription
            id={animationsDescriptionId}
            className="text-body-sm"
          >
            Motion initially follows your device&rsquo;s reduced-motion
            preference. You can override it here.
          </PopoverDescription>
        </div>
      </PopoverContent>
    </Popover>
  );
}
