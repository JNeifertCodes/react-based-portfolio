import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="bg-navbar-header-bg text-foreground">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-4 px-6 py-8 md:px-11">
        <Link
          href="#hero"
          className="rounded-sm p-1 text-body-md font-normal underline-offset-4 outline-none hover:underline focus-visible:ring-2 focus-visible:ring-ring"
        >
          Jenna Neifert
        </Link>

        <p className="text-body-md font-normal">Thank you for visiting!</p>
      </div>
    </footer>
  );
}
