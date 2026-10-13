import { SiteHeader } from "@/components/home-page/site-header";
import { Hero } from "@/components/home-page/hero";

export default function Home() {
  return (
    <div>
      <SiteHeader />
      <main className="bg-background">
        <Hero />
      </main>
    </div>
  );
}
