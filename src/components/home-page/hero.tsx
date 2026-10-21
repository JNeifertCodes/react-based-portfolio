"use client";

import { useId } from "react";

import { Section } from "@/components/home-page/section";
import { Button } from "@/components/ui/button";
import { followUrl } from "@/lib/follow-url";

const RESUME_HREF = "/Jenna_Neifert_Resume.pdf";
const RESUME_FILENAME = "Jenna_Neifert_Resume.pdf";
const EMAIL = "jennamwneifert@gmail.com";

export function Hero() {
  const contactDescriptionId = useId();

  return (
    <Section id="hero" title="Jenna Neifert" headingLevel="h1">

      <p className="text-heading-md">Software Engineer</p>

      <p className="max-w-3xl text-lg leading-relaxed">
        I build accessible, human-centered interfaces for education and finance,
        where people need to trust what’s on the screen.
      </p>
      <p className="max-w-3xl text-lg leading-relaxed">
        6 years across education and finance at Lumen Learning, Eduplanet21, and
        Vanguard. Vue and TypeScript today, React next.
      </p>

      <div className="mt-1 flex flex-wrap items-center justify-between gap-4">
        <Button
          type="button"
          variant="secondary"
          size="lg"
          onClick={() => followUrl(RESUME_HREF, RESUME_FILENAME)}
        >
          <span className="link-underline">Download resume (PDF)</span>
        </Button>

        <Button
          type="button"
          size="lg"
          onClick={() => followUrl(`mailto:${EMAIL}`)}
          aria-describedby={contactDescriptionId}
        >
          <span className="link-underline">Contact me</span>
        </Button>
        <span id={contactDescriptionId} className="sr-only">
          Opens your email app to write to {EMAIL}
        </span>
      </div>
    </Section>
  );
}
