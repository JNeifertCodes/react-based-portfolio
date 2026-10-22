import { useLayoutEffect, useRef, useState } from "react";

const MOBILE_QUERY = "(max-width: 760px)";
const VIEWPORT_GUTTER = 16;

export function usePopoverPlacement(open: boolean, sideOffset: number) {
  const triggerRef = useRef<HTMLButtonElement>(null);
  const [popup, setPopup] = useState<HTMLDivElement | null>(null);
  const [centered, setCentered] = useState(false);

  useLayoutEffect(() => {
    if (!open || !popup) return;

    const update = () => {
      const trigger = triggerRef.current;
      if (!trigger) return;

      if (!window.matchMedia(MOBILE_QUERY).matches) {
        setCentered(false);
        return;
      }

      const viewportHeight =
        window.visualViewport?.height ?? window.innerHeight;
      const spaceBelow =
        viewportHeight -
        trigger.getBoundingClientRect().bottom -
        sideOffset -
        VIEWPORT_GUTTER;

      setCentered(popup.scrollHeight > spaceBelow);
    };

    // ResizeObserver fires once on observe (after layout, before paint),
    // which covers the initial measurement.
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
  }, [open, popup, sideOffset]);

  return { triggerRef, popupRef: setPopup, centered };
}
