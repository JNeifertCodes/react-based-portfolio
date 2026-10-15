import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section
      id="hero"
      aria-labelledby="hero-title"
      className="mx-auto flex max-w-5xl flex-col gap-4 px-6 pt-10 pb-16 text-foreground md:px-11"
    >
      <h1 id="hero-title" className="text-heading-lg leading-tight">
        Jenna Neifert
      </h1>

      <p className="text-heading-md leading-tight">Software Engineer</p>

      <p className="max-w-3xl text-body-lg leading-relaxed">
        I build accessible, human-centered interfaces for education and finance,
        where people need to trust what’s on the screen.
      </p>
      <p className="max-w-3xl text-body-lg leading-relaxed">
        6 years across education and finance at Lumen Learning, Eduplanet21, and
        Vanguard. Vue and TypeScript today, React next.
      </p>

      <div className="mt-1 flex flex-wrap items-center justify-between gap-4">
        <Button
          size="lg"
          nativeButton={false}
          render={
            <a
              href="/Jenna_Neifert_Resume.pdf"
              download="Jenna_Neifert_Resume.pdf"
              type="application/pdf"
            />
          }
          className="group/underline border-input"
        >
          <span className="link-underline">Download resume (PDF)</span>
        </Button>

        <Button
          variant="secondary"
          size="lg"
          nativeButton={false}
          render={<a href="#contact" />}
          className="group/underline border-input"
        >
          <span className="link-underline">Contact me</span>
        </Button>
      </div>
    </section>
  );
}
