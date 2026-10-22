import Link from "next/link";
import { SiteContainer } from "@/components/layout/site-container";

export function SiteFooter() {
  return (
    <footer className="bg-header text-foreground">
      <SiteContainer className="flex flex-wrap items-center justify-between gap-4 py-8">
        <Link
          href="#hero"
          className="rounded-sm p-1 text-base link-underline focus-ring"
        >
          Jenna Neifert
        </Link>

        <p className="text-base">Thank you for visiting!</p>
      </SiteContainer>
    </footer>
  );
}
