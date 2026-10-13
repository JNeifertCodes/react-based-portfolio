import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section
      aria-labelledby="hero-title"
      className="mx-auto w-full max-w-5xl px-6 pt-10 pb-16 md:px-11"
    >
      <h1
        id="hero-title"
        className="text-heading-lg text-foreground leading-tight"
      >
        Jenna Neifert
      </h1>

      <p className="mt-4 text-body-md text-foreground">Software Engineer</p>

      <p className="mt-4 max-w-3xl text-body-lg text-foreground leading-relaxed">
        I build accessible, human-centered interfaces for education and finance,
        where people need to trust what&apos;s on the screen.
      </p>

      <p className="mt-4 text-body-sm text-foreground">
        6 years across education and finance at Lumen Learning, Eduplanet21, and
        Vanguard. Vue and TypeScript today, React next.
      </p>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
        <Button
          size="lg"
          nativeButton={false}
          render={<a href="/resume.pdf" download />}
        >
          Download resume (PDF)
        </Button>

        <Button
          variant="secondary"
          size="lg"
          nativeButton={false}
          render={<a href="#contact" />}
        >
          Contact me
        </Button>
      </div>
      <p className="mt-4 text-body-md text-foreground">
        More content to follow...
      </p>
    </section>
  );
}
