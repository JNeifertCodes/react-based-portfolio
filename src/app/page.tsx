import { SiteHeader } from "@/components/layout/site-header";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Contact } from "@/components/sections/contact";
import { Experience } from "@/components/sections/experience";
import { SiteFooter } from "@/components/layout/site-footer";

export default function Home() {
  return (
    <div>
      <a
        href="#main"
        className="sr-only rounded-sm bg-background p-2 text-base text-foreground focus-ring focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-60"
      >
        Skip to main content
      </a>
      <SiteHeader />
      <main id="main" className="bg-background">
        <Hero />
        <About />
        <Experience />
        <Contact />
      </main>
      <SiteFooter />
    </div>
  );
}
