import Link from "next/link";
import { StickyHeader } from "@/components/home-page/sticky-header";
import { MobileNav } from "@/components/home-page/mobile-nav";
import { DisplayPreferences } from "@/components/home-page/display-preferences";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#contact", label: "Contact" },
];

export function SiteHeader() {
  return (
    <StickyHeader>
      <div className="mx-auto flex w-full max-w-5xl items-center justify-between gap-4 px-6 py-8 transition-[padding] duration-200 ease-out motion-reduce:transition-none group-data-[compact=true]:py-3 md:px-11">
        <Link
          href="/"
          className={cn(
            "rounded-sm bg-transparent p-1 text-body-md font-normal text-foreground",
            "underline-offset-4 hover:bg-transparent hover:text-foreground hover:underline",
            "focus:bg-transparent focus:text-foreground focus-visible:ring-2 focus-visible:ring-ring",
            "data-highlighted:bg-transparent",
          )}
        >
          Jenna Neifert
        </Link>

        {/* Desktop: md and up */}
        <div className="hidden items-center gap-6 md:flex">
          <NavigationMenu aria-label="Main">
            <NavigationMenuList className="gap-3">
              {navLinks.map((link) => (
                <NavigationMenuItem key={link.href}>
                  <NavigationMenuLink
                    href={link.href}
                    className={cn(
                      "rounded-sm bg-transparent p-1 text-body-md font-normal text-foreground",
                      "underline-offset-4 hover:bg-transparent hover:text-foreground hover:underline",
                      "focus:bg-transparent focus:text-foreground",
                      "data-highlighted:bg-transparent",
                    )}
                  >
                    {link.label}
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>

          <DisplayPreferences />
        </div>

        {/* Mobile: below md */}
        <div className="md:hidden">
          <MobileNav links={navLinks} />
        </div>
      </div>
    </StickyHeader>
  );
}
