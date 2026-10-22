import { useId } from "react";

import { Section } from "@/components/sections/section";
import { SectionText } from "@/components/sections/section-text";
import { buttonVariants } from "@/components/ui/button";

const RESUME_HREF = "/Jenna_Neifert_Resume.pdf";
const RESUME_FILENAME = "Jenna_Neifert_Resume.pdf";
const EMAIL = "jennamwneifert@gmail.com";

export function Hero() {
  const contactDescriptionId = useId();

  return (
    <Section id="hero" title="Jenna Neifert" headingLevel="h1">

      <p className="text-heading-md">Software Engineer</p>

      <SectionText>
        I build accessible, human-centered interfaces for education and finance,
        where people need to trust what’s on the screen.
      </SectionText>
      <SectionText>
        6 years across education and finance at Lumen Learning, Eduplanet21, and
        Vanguard. Vue and TypeScript today, React next.
      </SectionText>

      <div className="mt-1 flex flex-wrap items-center justify-between gap-4">
        <a
          href={RESUME_HREF}
          download={RESUME_FILENAME}
          className={buttonVariants({ variant: "secondary", size: "lg" })}
        >
          <span className="link-underline">Download resume (PDF)</span>
        </a>

        <a
          href={`mailto:${EMAIL}`}
          className={buttonVariants({ size: "lg" })}
          aria-describedby={contactDescriptionId}
        >
          <span className="link-underline">Contact me</span>
        </a>
        <span id={contactDescriptionId} className="sr-only">
          Opens your email app to write to {EMAIL}
        </span>
      </div>
    </Section>
  );
}
