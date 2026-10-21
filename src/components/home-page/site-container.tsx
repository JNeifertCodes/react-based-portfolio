import { type ReactNode } from "react";

import { cn } from "@/lib/utils";

type SiteContainerProps = {
  className?: string;
  children: ReactNode;
};

function SiteContainer({ className, children }: SiteContainerProps) {
  return (
    <section
      className={cn(
        "mx-auto flex max-w-5xl flex-col gap-4 px-6 pt-10 pb-16 text-foreground md:px-11",
        className,
      )}
    >
      {children}
    </section>
  );
}

export { SiteContainer };
export type { SiteContainerProps };
