import { type HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

type SectionTextProps = HTMLAttributes<HTMLParagraphElement>;

// Body paragraph used in page sections.
function SectionText({ className, ...props }: SectionTextProps) {
  return (
    <p
      className={cn("max-w-3xl text-lg leading-relaxed", className)}
      {...props}
    />
  );
}

export { SectionText };
export type { SectionTextProps };
