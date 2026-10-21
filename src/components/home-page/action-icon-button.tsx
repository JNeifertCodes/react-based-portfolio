import { Check, Copy, Download, ExternalLink, Mail } from "lucide-react";

import { Button, buttonVariants } from "@/components/ui/button";
import { followUrl } from "@/lib/follow-url";
import { cn } from "@/lib/utils";

type ContactAction = "email" | "copy" | "download" | "open";

type ActionIconButtonProps = {
  action: ContactAction;
  label: string;
  value: string;
  href?: string;
  copied?: boolean;
  onCopy?: () => void;
};

const variant = "outline";
const size = "icon-lg";
const actionClassName =
  "relative bg-muted after:absolute after:bottom-1.5 after:left-1/2 after:h-0.5 after:w-4 after:-translate-x-1/2 after:origin-left after:scale-x-0 after:bg-current hover:after:scale-x-100 focus-visible:after:scale-x-100 motion-allowed:after:transition-transform motion-allowed:after:duration-250 motion-allowed:after:ease-out";

// Navigation actions (email, open) are real links styled as buttons, so screen
// readers announce them as links. Copy and download are buttons.
const linkClassName = cn(buttonVariants({ variant, size }), actionClassName);

function ActionIconButton({
  action,
  label,
  value,
  href,
  copied = false,
  onCopy,
}: ActionIconButtonProps) {
  if (action === "copy") {
    return (
      <Button
        type="button"
        variant={variant}
        size={size}
        className={actionClassName}
        onClick={onCopy}
        aria-label={`Copy ${label}`}
      >
        {copied ? <Check aria-hidden="true" /> : <Copy aria-hidden="true" />}
      </Button>
    );
  }

  // Email, download and open all need somewhere to go.
  if (!href) return null;

  if (action === "download") {
    return (
      <Button
        type="button"
        variant={variant}
        size={size}
        className={actionClassName}
        onClick={() => followUrl(href, href.split("/").pop())}
        aria-label={`Download ${label}`}
      >
        <Download aria-hidden="true" />
      </Button>
    );
  }

  switch (action) {
    case "email":
      return (
        <a
          href={href}
          className={linkClassName}
          aria-label={`Send email to ${value}`}
        >
          <Mail aria-hidden="true" />
        </a>
      );
    case "open":
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={linkClassName}
          aria-label={`Open ${label} in a new tab`}
        >
          <ExternalLink aria-hidden="true" />
        </a>
      );
  }
}

export { ActionIconButton };
export type { ActionIconButtonProps, ContactAction };
