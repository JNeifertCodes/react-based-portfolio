"use client";

import { Check, Copy, Download, ExternalLink, Mail } from "lucide-react";
import { useId, useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type ContactAction = "email" | "copy" | "download" | "open";

type ContactCardProps = {
  label: string;
  value: string;
  href?: string;
  actions?: ContactAction[];
  className?: string;
};

const actionButton = {
  variant: "outline",
  size: "icon-lg",
  className:
    "relative bg-muted hover:outline-2 hover:outline-offset-2 hover:outline-ring after:absolute after:bottom-1.5 after:left-1/2 after:h-0.5 after:w-4 after:-translate-x-1/2 after:bg-current after:opacity-0 hover:after:opacity-100",
} as const;

function ContactCard({
  label,
  value,
  href,
  actions = [],
  className,
}: ContactCardProps) {
  const labelId = useId();
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card
      role="group"
      aria-labelledby={labelId}
      className={cn("ring-border [--card-spacing:--spacing(6)]", className)}
    >
      <CardContent className="flex items-center justify-between gap-4">
        <div className="flex min-w-0 flex-col gap-2">
          <p id={labelId} className="text-body-sm">
            {label}
          </p>
          <p className="text-body-lg break-all">{value}</p>
        </div>

        {actions.length > 0 && (
          <div className="flex shrink-0 gap-2">
            {actions.map((action) => {
              switch (action) {
                case "email":
                  return (
                    <Button
                      key={action}
                      {...actionButton}
                      nativeButton={false}
                      render={<a href={href} />}
                      aria-label={`Send email to ${value}`}
                    >
                      <Mail aria-hidden="true" />
                    </Button>
                  );
                case "copy":
                  return (
                    <Button
                      key={action}
                      {...actionButton}
                      onClick={copy}
                      aria-label={`Copy ${label}`}
                    >
                      {copied ? (
                        <Check aria-hidden="true" />
                      ) : (
                        <Copy aria-hidden="true" />
                      )}
                    </Button>
                  );
                case "download":
                  return (
                    <Button
                      key={action}
                      {...actionButton}
                      nativeButton={false}
                      render={<a href={href} download />}
                      aria-label={`Download ${label}`}
                    >
                      <Download aria-hidden="true" />
                    </Button>
                  );
                case "open":
                  return (
                    <Button
                      key={action}
                      {...actionButton}
                      nativeButton={false}
                      render={
                        <a
                          href={href}
                          target="_blank"
                          rel="noopener noreferrer"
                        />
                      }
                      aria-label={`Open ${label} in a new tab`}
                    >
                      <ExternalLink aria-hidden="true" />
                    </Button>
                  );
              }
            })}
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
