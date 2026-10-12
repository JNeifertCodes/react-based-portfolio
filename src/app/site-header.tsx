import Link from "next/link";
import { Button } from "@/components/ui/button";

const navLinks = [
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#contact", label: "Contact" },
];

export function SiteHeader() {
  return (
    <header className="mx-auto flex w-full max-w-5xl items-center justify-between gap-6 px-6 py-8 md:px-11">
      <Link
        href="/"
        className="text-body-sm text-primary-text rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-text"
      >
        Jenna Neifert
      </Link>

      <nav aria-label="Main" className="flex items-center gap-4">
        <ul className="hidden items-center gap-4 sm:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-body-md font-normal text-primary-text rounded-sm hover:underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-text"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <Button size="lg" nativeButton={false}>
          Display Preferences
        </Button>
      </nav>
    </header>
  );
}
