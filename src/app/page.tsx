import { SiteHeader } from "@/app/site-header";
import { Hero } from "@/app/hero";

export default function Home() {
  return (
    <div>
      <SiteHeader />
      <main>
        <Hero />
      </main>
    </div>
  );
}
