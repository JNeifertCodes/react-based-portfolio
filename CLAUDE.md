@AGENTS.md

# CLAUDE.md

Single-page portfolio for Jenna Neifert, live at [www.jneifertcodes.com](https://www.jneifertcodes.com). Hosted on Vercel; domain registered with Porkbun.

**Stack:** Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4, shadcn/ui on Base UI primitives, Storybook 10 with Vitest.

## Commands

| Command                        | Purpose                                                        |
| ------------------------------ | -------------------------------------------------------------- |
| `npm run dev`                  | Start the dev server at localhost:3000                         |
| `npm run build`                | Production build                                               |
| `npm run lint`                 | ESLint                                                         |
| `npm run storybook`            | Storybook at localhost:6006                                    |
| `npx vitest`                   | Run story interaction tests (headless Chromium via Playwright) |
| `npx shadcn@latest add <name>` | Add a shadcn component                                         |

## Architecture

```
src/
  app/
    layout.tsx             Root layout: Inter font, ThemeProvider, metadata
    page.tsx               Composes the page sections (below)
    globals.css            Design tokens and Tailwind theme
    work-experience.json   Data for the Experience section
    contact-list.json      Data for the Contact section
  components/
    home-page/             Site-specific components
    ui/                    shadcn-generated components (Base UI variant)
  stories/                 Storybook stories for home-page components
  lib/utils.ts             Re-exports `cn`
public/                    Static assets, including Jenna_Neifert_Resume.pdf
.storybook/                Storybook config; preview wraps stories in ThemeProvider
```

`@/*` maps to `src/*`.

### Page composition

`page.tsx` renders `SiteHeader` → `<main>` (`Hero`, `About`, `Experience`, `Contact`) → `SiteFooter`. Each section is a `<section id>` labelled by its heading, and the nav links to `#about`, `#experience` and `#contact`.

### Components (`src/components/home-page/`)

| File                                     | Type            | Responsibility                                                                                                                                                                                   |
| ---------------------------------------- | --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `site-header.tsx`                        | Server          | Owns `navLinks`. Desktop `NavigationMenu` and `DisplayPreferences` at `md`+; `MobileNav` below `md`.                                                                                             |
| `sticky-header.tsx`                      | Client          | Sets `data-compact` on `<header>` when scrolling down. Uses rAF throttling, a minimum scroll delta and a lock window to prevent resize flicker. Children style via `group-data-[compact=true]:`. |
| `mobile-nav.tsx`                         | Client          | Right-side `Sheet` with nav links and `DisplayPreferences`.                                                                                                                                      |
| `display-preferences.tsx`                | Client          | Popover with a light/dark theme `ToggleGroup` and an animations `Switch`.                                                                                                                        |
| `hero.tsx`                               | Server          | Intro with resume download and contact links.                                                                                                                                                    |
| `about.tsx`                              | Server          | Static bio.                                                                                                                                                                                      |
| `experience.tsx` / `experience-card.tsx` | Server          | Maps `work-experience.json` to cards.                                                                                                                                                            |
| `contact.tsx` / `contact-card.tsx`       | Server / Client | Maps `contact-list.json` to cards with email, copy, download and open actions.                                                                                                                   |
| `site-footer.tsx`                        | Server          | Footer.                                                                                                                                                                                          |

### Display preferences

- **Theme:** `@wrksz/themes` (provider from `/next`, `useTheme` from `/client`). Uses `attribute="class"`, defaults to `light`, and ignores the system setting. A `mounted` guard prevents hydration mismatch.
- **Motion:** Defaults to the inverse of `prefers-reduced-motion`. A user override is stored in `localStorage["motion-preference"]` and applied as `<html data-motion="on|off">` plus inline `scroll-behavior`.
- **Mobile placement:** Below 760px, `usePopoverPlacement` centers the popup when there is no room below the trigger. This relies on the custom `positionerClassName` prop.

### Styling

Tokens are defined in `globals.css`: colors in `:root` and `.dark`, then mapped through `@theme inline`. Use the custom type scale (`text-heading-lg`, `text-heading-md`, `text-body-lg`, `text-body-md`, `text-body-sm`) and semantic color utilities (`bg-background`, `text-foreground`, `bg-navbar-header-bg`, etc.) rather than raw values.

## Next.js 16 notes

Check `node_modules/next/dist/docs/` before using any Next API. Already in use:

- `reactCompiler: true` in `next.config.ts`; manual `useMemo` / `useCallback` is usually unnecessary.
- The root layout uses the global `LayoutProps<"/">` type (not imported).
- `data-scroll-behavior="smooth"` on `<html>` opts into smooth scrolling.

## shadcn / Base UI conventions

- `components.json` uses the `base-nova` style, built on `@base-ui/react` (not Radix).
- Compose with `render={<Element />}`, not `asChild`.
- Set `nativeButton={false}` when a `Button` renders a non-button element.
- State is exposed via attributes: `data-open`, `data-highlighted`, `aria-pressed`, `aria-checked`.
- `PopoverContent` accepts a custom `positionerClassName` prop passed to the Positioner.
- `cn` is imported from either `"cn"` or `"@/lib/utils"`; both resolve to the same function.

## Accessibility

Accessibility is a core requirement. Follow existing patterns:

- Every interactive element has a visible `focus-visible` ring.
- Associate controls with labels via `aria-labelledby` / `aria-describedby`, using `useId` for ids.
- Decorative icons get `aria-hidden`; icon-only buttons get `aria-label`.
- Announce transient state changes with an `aria-live` region.
- Gate transitions with the `motion-allowed:` variant (defined in `globals.css`). It matches `html[data-motion="on"]`, or the OS `prefers-reduced-motion: no-preference` before `data-motion` is set, so it obeys the in-app toggle. `motion-reduce:` reads the OS setting only.
- Hover and focus underlines use the `link-underline` utility: a `currentColor` gradient that draws in on `hover` / `focus-visible` and appears instantly with motion off. Put it on the link itself, or on an inline child `<span>` when the trigger has its own `transition-*` or is not inline (buttons, `NavigationMenuLink`, flex links); the trigger then gets `group/underline`. Don't use `hover:underline`.
- `scroll-padding-top: 7rem` on `html` keeps anchor targets clear of the sticky header.

## Working preferences

- Do only what is asked, and read only the files specified.
- Do not offer unrequested improvements or suggestions.
- Keep responses short: no preamble, no recap, implementation only.
