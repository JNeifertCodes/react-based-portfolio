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

const navLinks = [
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#contact", label: "Contact" },
];

export function SiteHeader() {
  return (
    <StickyHeader>
      <div className="mx-auto flex w-full max-w-5xl items-center justify-between gap-4 px-6 py-8 motion-allowed:transition-[padding] motion-allowed:duration-200 motion-allowed:ease-out group-data-[compact=true]:py-3 md:px-11">
        <Link
          href="#hero"
          className="rounded-sm p-1 text-base text-foreground link-underline focus-ring"
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
                    variant="plain"
                  >
                    <span className="link-underline">{link.label}</span>
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
