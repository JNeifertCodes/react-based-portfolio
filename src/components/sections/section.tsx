import { useId, type ReactNode } from "react";

import { cn } from "@/lib/utils";

type SectionProps = {
  id: string;
  title: ReactNode;
  headingLevel?: "h1" | "h2";
  className?: string;
  children: ReactNode;
};

const headingClassName = {
  h1: "text-heading-lg",
  h2: "text-heading-md",
};

// A page section labelled by its own heading. The id is the anchor the nav
// links to; the heading id comes from useId so it never collides.
function Section({
  id,
  title,
  headingLevel: Heading = "h2",
  className,
  children,
}: SectionProps) {
  const headingId = useId();

  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className={cn(
        "mx-auto flex max-w-5xl flex-col gap-4 px-6 pt-10 pb-16 text-foreground md:px-11",
        className,
      )}
    >
      <Heading id={headingId} className={headingClassName[Heading]}>
        {title}
      </Heading>
      {children}
    </section>
  );
}

export { Section };
export type { SectionProps };
