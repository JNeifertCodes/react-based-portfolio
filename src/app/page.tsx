import { SiteHeader } from "@/components/home-page/site-header";
import { Hero } from "@/components/home-page/hero";
import { About } from "@/components/home-page/about";
import { Contact } from "@/components/home-page/contact";
import { Experience } from "@/components/home-page/experience";
import { SiteFooter } from "@/components/home-page/site-footer";

export default function Home() {
  return (
    <div>
      <SiteHeader />
      <main className="bg-background">
        <Hero />
        <About />
        <Experience />
        <Contact />
      </main>
      <SiteFooter />
    </div>
  );
}
