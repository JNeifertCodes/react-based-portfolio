import { type HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

type SiteContainerProps = HTMLAttributes<HTMLDivElement>;

// Shared page width and gutters for the header and footer.
function SiteContainer({ className, ...props }: SiteContainerProps) {
  return (
    <div
      className={cn("mx-auto max-w-5xl px-6 md:px-11", className)}
      {...props}
    />
  );
}

export { SiteContainer };
export type { SiteContainerProps };
