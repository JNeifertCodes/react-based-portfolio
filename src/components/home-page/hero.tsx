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

      <h3 className="text-heading-md leading-tight">Software Engineer</h3>

      <p className="max-w-3xl text-body-lg leading-relaxed">
        I build accessible, human-centered interfaces for education and finance,
        where people need to trust what's on the screen.
        <br></br>
        <br></br>6 years across education and finance at Lumen Learning,
        Eduplanet21, and Vanguard. Vue and TypeScript today, React next.
      </p>

      <div className="mt-1 flex flex-wrap items-center justify-between gap-4">
        <Button
          size="lg"
          nativeButton={false}
          render={<a href="" download />}
          className="border-input hover:underline"
        >
          Download resume (PDF)
        </Button>

        <Button
          variant="secondary"
          size="lg"
          nativeButton={false}
          render={<a href="#contact" />}
          className={`border-input hover:underline`}
        >
          Contact me
        </Button>
      </div>
    </section>
  );
}
