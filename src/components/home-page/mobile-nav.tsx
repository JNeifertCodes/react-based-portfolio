"use client";

import { useState } from "react";
import { MenuIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

type NavLink = { href: string; label: string };

export function MobileNav({ links }: { links: NavLink[] }) {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        render={
          <Button
            size="icon"
            className="size-11 rounded-lg"
            aria-label="Open menu"
          />
        }
      >
        <MenuIcon className="size-5" aria-hidden="true" />
      </SheetTrigger>

      <SheetContent
        side="right"
        className="w-72 border-l border-component-card-border bg-header-background p-6 text-primary-text"
      >
        <SheetHeader className="p-0">
          <SheetTitle className="text-body-md font-normal text-primary-text">
            Menu
          </SheetTitle>
        </SheetHeader>

        <nav aria-label="Mobile">
          <ul className="flex flex-col">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block border-b border-component-card-border py-4 text-body-lg text-primary-text underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-text"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <Button size="lg" type="button" className="mt-6 w-full justify-center">
          Display preferences
        </Button>
      </SheetContent>
    </Sheet>
  );
}
