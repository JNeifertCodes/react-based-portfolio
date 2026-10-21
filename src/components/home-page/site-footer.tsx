import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="bg-header text-foreground">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-4 px-6 py-8 md:px-11">
        <Link
          href="#hero"
          className="rounded-sm p-1 text-base link-underline focus-ring"
        >
          Jenna Neifert
        </Link>

        <p className="text-base">Thank you for visiting!</p>
      </div>
    </footer>
  );
}
