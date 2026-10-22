@AGENTS.md

# CLAUDE.md

Single-page portfolio for Jenna Neifert, live at [www.jneifertcodes.com](https://www.jneifertcodes.com). Hosted on Vercel; domain registered with Porkbun.

**Stack:** Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4, shadcn/ui on Base UI primitives, Storybook 10 with Vitest.

## Commands

| Command                        | Purpose                                |
| ------------------------------ | -------------------------------------- |
| `npm run dev`                  | Start the dev server at localhost:3000 |
| `npm run build`                | Production build                       |
| `npm run lint`                 | ESLint                                 |
| `npm run storybook`            | Storybook at localhost:6006            |
| `npx vitest run`               | Run story tests (Chromium, headless)   |
| `npx tsc --noEmit`             | Typecheck                              |
| `npx shadcn@latest add <name>` | Add a shadcn component                 |

## Architecture

```
src/
  app/
    layout.tsx             Root layout: Inter font, ThemeProvider, MotionProvider, Vercel Analytics, metadata
    page.tsx               Composes the page sections (below)
    globals.css            Design tokens and Tailwind theme
    work-experience.json   Data for the Experience section
    contact-list.json      Data for the Contact section
  components/
    layout/                Header, sticky header, mobile nav, display preferences, footer, site container
    sections/              Page sections, their cards and the shared `Section` / `SectionText`
    providers/             Context providers (motion)
    ui/                    shadcn-generated components (Base UI variant)
  hooks/                   Shared hooks: `useMounted`, `usePopoverPlacement` (`@/hooks` alias in components.json)
  stories/                 Storybook stories for site components and Button
  lib/utils.ts             `cn`, built with `createCn` from `cn/config` to register the heading type scale
public/                    Static assets, including Jenna_Neifert_Resume.pdf
.storybook/                Storybook config; preview wraps stories in ThemeProvider and MotionProvider
```

`@/*` maps to `src/*`.

### Page composition

`page.tsx` renders `SiteHeader` → `<main>` (`Hero`, `About`, `Experience`, `Contact`) → `SiteFooter`. The nav links to `#about`, `#experience` and `#contact`; the logo links to `#hero`.

Every section renders through `Section({ id, title, headingLevel, className, children })`: a `<section id>` labelled by its heading, whose id comes from `useId`. `headingLevel` is `"h1"` (`text-heading-lg`, Hero only) or `"h2"` (default, `text-heading-md`). It owns the shared layout (`max-w-5xl`, gutters, vertical padding); pass `className` only for one-off spacing (Experience uses `gap-6 pt-0`).

### Components (`src/components/`)

| File                                              | Type              | Responsibility                                                                                                                                                                                                                                                                 |
| ------------------------------------------------- | ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `layout/site-header.tsx`                          | Server            | Owns `navLinks`. Desktop `NavigationMenu` and `DisplayPreferences` at `md`+; `MobileNav` below `md`.                                                                                                                                                                           |
| `layout/sticky-header.tsx`                        | Client            | Sets `data-compact` on `<header>` when scrolling down. Uses rAF throttling, a minimum scroll delta and a lock window to prevent resize flicker (300ms, or 100ms with motion off). Transitions are gated on `motion-allowed:`. Children style via `group-data-[compact=true]:`. |
| `layout/mobile-nav.tsx`                           | Client            | Right-side `Sheet` with nav links and `DisplayPreferences`.                                                                                                                                                                                                                    |
| `layout/display-preferences.tsx`                  | Client            | Popover with a light/dark theme `ToggleGroup` and an animations `Switch`.                                                                                                                                                                                                      |
| `providers/motion-provider.tsx`                   | Client            | Owns the motion preference (see Display preferences); `useMotionPreference()` returns `[enabled, setEnabled]`.                                                                                                                                                                 |
| `sections/section.tsx`                            | Server            | `Section` wrapper used by every page section (see Page composition).                                                                                                                                                                                                           |
| `sections/hero.tsx`                               | Server            | Intro with "Download resume (PDF)" (`secondary`, `<a download>`) and "Contact me" (`default`, `mailto:`) links styled with `buttonVariants`.                                                                                                                                   |
| `sections/about.tsx`                              | Server            | Static bio.                                                                                                                                                                                                                                                                    |
| `sections/experience.tsx` / `experience-card.tsx` | Server            | Maps `work-experience.json` to cards. An `endDate` of `"Present"` (or none) is passed as `undefined` and shown as plain text, not a `<time>`. Job titles are `h3` in `text-heading-sm`; technologies are `Badge variant="tag"` rendered as `<li>`.                             |
| `sections/contact.tsx` / `contact-card.tsx`       | Server / Client   | Maps `contact-list.json` to cards; each card maps its `actions` to `ContactIconButton` and owns the copied state and `aria-live` region.                                                                                                                                       |
| `sections/contact-icon-button.tsx`                | Client (via card) | Icon-only contact action using the `action` button variant. Email, download and open are `<a>` links; copy is a `<Button type="button">`. Renders nothing for a link action without `href`.                                                                                  |
| `layout/site-footer.tsx`                          | Server            | Footer.                                                                                                                                                                                                                                                                        |

### Display preferences

- **Theme:** `@wrksz/themes` (provider from `/next`, `useTheme` from `/client`). Uses `attribute="class"`, defaults to `light`, and ignores the system setting. A `useMounted` guard prevents hydration mismatch.
- **Motion:** Defaults to the inverse of `prefers-reduced-motion`. A user override is stored in `localStorage["motion-preference"]` and applied as `<html data-motion="on|off">` plus inline `scroll-behavior` (`smooth` or `auto`). The inline style overrides the `prefers-reduced-motion` smooth-scroll rule in `globals.css`, which only applies before hydration.
- **Mobile placement:** Below 760px, `usePopoverPlacement(open, sideOffset)` centers the popup when there is no room below the trigger. This relies on the custom `positionerClassName` prop.

### Styling

Tokens are defined in `globals.css` in two layers: raw `--palette-*` colors, then semantic role tokens in `:root` and `.dark` that point at the palette, mapped through `@theme inline`. Components use only the semantic layer. `primary` is the strong indigo fill (main action, checked and pressed states); `secondary` is the quiet fill. Use semantic color utilities (`bg-background`, `text-foreground`, `bg-header`, etc.) rather than raw values or `--palette-*` variables.

Typography: headings use the custom scale, which sets size, weight and line-height together, so don't add `leading-*` or `font-*` to headings:

- `text-heading-lg`: fluid, `clamp(2.5rem, 6vw + 1rem, 4rem)`, weight 700 (the `h1`)
- `text-heading-md`: 1.625rem, weight 600 (section `h2`s)
- `text-heading-sm`: 1.25rem, weight 600 (card `h3`s, popover title)

Body text uses Tailwind's default sizes (`text-sm`, `text-base`, `text-lg`).

A base-layer rule in `globals.css` gives every enabled `button` and `[role="button"]` a pointer cursor, so don't add `cursor-pointer`.

### Customized primitives

These `ui/` components have project-specific variants. Prefer a variant over overriding classes at the call site.

- `Button`: `default` (indigo, main action) and `secondary` (quiet) include `border-input`; `action` is the icon-only contact button with an underline bar; `link` expects an inner `link-underline` span. Every variant includes `group/underline`. `buttonVariants` runs the `cva` output through `cn`, so variant classes (e.g. `border-input`) replace conflicting base classes (`border-transparent`) when styling a plain `<a>`; without the merge, CSS order lets the base class win.
- `Card`: edge is `border border-border` (stays visible in forced colors); `size="lg"` sets 24px padding and is used by both site cards.
- `NavigationMenuLink`: `variant="plain"` is a text link with no hover/focus/active fill and built-in `group/underline` (used by the header nav).
- `Badge`: `variant="tag"` is the technology chip.

## Next.js 16 notes

Check `node_modules/next/dist/docs/` before using any Next API. Already in use:

- `reactCompiler: true` in `next.config.ts`; manual `useMemo` / `useCallback` is usually unnecessary.
- The root layout uses the global `LayoutProps<"/">` type (not imported).
- `data-scroll-behavior="smooth"` on `<html>` tells Next to force instant scrolling during route transitions, then restore the inline `scroll-behavior`. It does nothing for hash-only navigation, so it never overrides the Animations switch.

## shadcn / Base UI conventions

- `components.json` uses the `base-nova` style, built on `@base-ui/react` (not Radix).
- Compose with `render={<Element />}`, not `asChild`.
- Use `Button` only for in-page actions (copy, toggle, open a popover or sheet). Anything that follows a URL, including file downloads and `mailto:`, is a link, so it appears in screen reader link lists, supports "Save link as" / "Copy link address" and works before hydration. A link that should look like a button is a plain `<a>` styled with `buttonVariants({ variant, size })`; don't render `<a>` through `Button` with `nativeButton={false}`, because Base UI adds `role="button"`.
- State is exposed via attributes: `data-open`, `data-highlighted`, `aria-pressed`, `aria-checked`.
- `PopoverContent` accepts a custom `positionerClassName` prop passed to the Positioner.
- Import `cn` from `"@/lib/utils"`, never from `"cn"` directly. `npx shadcn add` generates `from "cn"`, so change it after adding a component, and swap its focus classes for `focus-ring`. The local `cn` registers the custom type scale (`text-heading-*`) as font sizes, so they merge correctly.

## Accessibility

Accessibility is a core requirement. Follow existing patterns:

- Every interactive element gets the `focus-ring` utility (defined in `globals.css`): a 2px `--ring` outline, offset 2px, on `:focus-visible`. Don't add `focus-visible:ring-*` / `outline-*` classes, and don't style hover with an outline, since it would look the same as focus.
- Associate controls with labels via `aria-labelledby` / `aria-describedby`, using `useId` for ids.
- Decorative icons get `aria-hidden`; icon-only buttons get `aria-label`.
- Announce transient state changes with an `aria-live` region.
- Gate transitions with the `motion-allowed:` variant (defined in `globals.css`). It matches `html[data-motion="on"]`, or the OS `prefers-reduced-motion: no-preference` before `data-motion` is set, so it obeys the in-app toggle. `motion-reduce:` reads the OS setting only.
- Hover and focus underlines use the `link-underline` utility: a `currentColor` gradient that draws in on `hover` / `focus-visible` and appears instantly with motion off. Put it on the link itself, or on an inline child `<span>` when the trigger has its own `transition-*` or is not inline (buttons, `NavigationMenuLink`, flex links); the trigger then gets `group/underline`. `Button`, `buttonVariants` and `NavigationMenuLink variant="plain"` already include `group/underline`, so they only need the inner `<span className="link-underline">`. Don't use `hover:underline`.
- `scroll-padding-top: 7rem` on `html` keeps anchor targets clear of the sticky header.

## Working preferences

- Do only what is asked, and read only the files specified.
- Do not offer unrequested improvements or suggestions.
- Keep responses short: no preamble, no recap, implementation only.
