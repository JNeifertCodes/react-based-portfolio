import { SiteHeader } from "@/components/home-page/site-header";
import { Hero } from "@/components/home-page/hero";
import { About } from "@/components/home-page/about";
import { Contact } from "@/components/home-page/contact";
import { Experience } from "@/components/home-page/experience";
import { SiteFooter } from "@/components/home-page/site-footer";

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
