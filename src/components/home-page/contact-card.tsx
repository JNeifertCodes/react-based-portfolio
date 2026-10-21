"use client";

import { useId, useState, useEffect } from "react";

import {
  ActionIconButton,
  type ContactAction,
} from "@/components/home-page/action-icon-button";
import { Card, CardContent } from "@/components/ui/card";

type ContactCardProps = {
  label: string;
  value: string;
  href?: string;
  actions?: ContactAction[];
  className?: string;
};

function ContactCard({
  label,
  value,
  href,
  actions = [],
  className,
}: ContactCardProps) {
  const labelId = useId();
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;

    const timer = setTimeout(() => {
      setCopied(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [copied]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
    } catch (error) {
      console.error("Failed to copy text:", error);
    }
  };

  return (
    <Card
      role="group"
      aria-labelledby={labelId}
      size="lg"
      className={className}
    >
      <CardContent className="flex items-center justify-between gap-4">
        <div className="flex min-w-0 flex-col gap-2">
          <p id={labelId} className="text-sm">
            {label}
          </p>
          <p className="text-lg break-all">{value}</p>
        </div>

        {actions.length > 0 && (
          <div className="flex shrink-0 gap-2">
            {actions.map((action) => (
              <ActionIconButton
                key={action}
                action={action}
                label={label}
                value={value}
                href={href}
                copied={copied}
                onCopy={copy}
              />
            ))}
          </div>
        )}

        <span aria-live="polite" className="sr-only">
          {copied ? `${label} copied` : ""}
        </span>
      </CardContent>
    </Card>
  );
}

export { ContactCard };
export type { ContactAction, ContactCardProps };
