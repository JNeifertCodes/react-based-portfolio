import Link from "next/link";
import { StickyHeader } from "@/components/home-page/sticky-header";
import { MobileNav } from "@/components/home-page/mobile-nav";
import { Button } from "@/components/ui/button";
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

const focusRing =
  "outline-none focus-visible:ring-2 focus-visible:ring-primary-text focus-visible:ring-offset-2 focus-visible:ring-offset-panel-background focus-visible:underline";

export function SiteHeader() {
  return (
    <StickyHeader>
      <div className="mx-auto flex w-full max-w-5xl items-center justify-between gap-4 px-6 py-8 transition-[padding] duration-200 ease-out motion-reduce:transition-none group-data-[compact=true]:py-3 md:px-11">
        <div className="mx-auto flex w-full max-w-5xl items-center justify-between gap-4 px-6 py-8 md:px-11">
          <Link
            href="/"
            className={cn(
              "rounded-sm text-body-md font-normal text-primary-text",
              "underline-offset-4 hover:bg-transparent hover:text-primary-text hover:underline",
              "focus:bg-transparent focus:text-primary-text",
              "data-highlighted:bg-transparent",
              focusRing,
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
                        "rounded-sm bg-transparent p-1 text-body-md font-normal text-primary-text",
                        "underline-offset-4 hover:bg-transparent hover:text-primary-text hover:underline",
                        "focus:bg-transparent focus:text-primary-text",
                        "data-highlighted:bg-transparent",
                        focusRing,
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
      </div>
    </StickyHeader>
  );
}
