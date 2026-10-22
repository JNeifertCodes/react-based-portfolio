import { Check, Copy, Download, ExternalLink, Mail } from "lucide-react";

import { Button, buttonVariants } from "@/components/ui/button";
import { followUrl } from "@/lib/follow-url";

type ContactAction = "email" | "copy" | "download" | "open";

type ContactIconButtonProps = {
  action: ContactAction;
  label: string;
  value: string;
  href?: string;
  copied?: boolean;
  onCopy?: () => void;
};

const variant = "action";
const size = "icon-lg";

// Navigation actions (email, open) are real links styled as buttons, so screen
// readers announce them as links. Copy and download are buttons.
const linkClassName = buttonVariants({ variant, size });

function ContactIconButton({
  action,
  label,
  value,
  href,
  copied = false,
  onCopy,
}: ContactIconButtonProps) {
  if (action === "copy") {
    return (
      <Button
        type="button"
        variant={variant}
        size={size}
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

export { ContactIconButton };
export type { ContactIconButtonProps, ContactAction };
