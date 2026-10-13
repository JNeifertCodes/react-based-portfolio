@AGENTS.md

# CLAUDE.md

Personal portfolio site for Jenna Neifert. It's a single page built with Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4, and shadcn/ui on **Base UI** primitives. It's hosted on Vercel.

## Commands

```bash
npm run dev     # dev server at http://localhost:3000 (also re-writes the block in AGENTS.md)
npm run build   # production build; this is also the type check (no separate tsc script)
npm run lint    # ESLint flat config: next core-web-vitals + typescript
```

## Next.js version

Next 16 differs from older versions. Before using any Next API, check `node_modules/next/dist/docs/` (`01-app/` covers the App Router). Things already in use here:

- `reactCompiler: true` in [next.config.ts](next.config.ts) (via `babel-plugin-react-compiler`), so manual `useMemo`/`useCallback` is usually unnecessary.
- The root layout types its props with the global `LayoutProps<"/">` helper; it isn't imported.
- `data-scroll-behavior="smooth"` on `<html>` is Next's opt-in for smooth scrolling.

## Layout

```
src/app/layout.tsx        Root layout: Inter font (--font-inter), ThemeProvider, metadata
src/app/page.tsx          Home page: <SiteHeader /> + <main><Hero /></main>
src/app/globals.css       All design tokens (see Styling)
src/components/home-page/ Site-specific components
src/components/ui/        shadcn-generated components (Base UI variant)
src/lib/utils.ts          Re-exports `cn` from the `cn` npm package
```

`@/*` maps to `src/*`.

### Home-page components

- `site-header.tsx`: server component. It holds `navLinks` (anchor links `#about`, `#experience`, `#contact`; those sections don't exist yet). It shows a desktop `NavigationMenu` plus `DisplayPreferences` at `md` and up, and `MobileNav` below `md`.
- `sticky-header.tsx`: client component. It sets `data-compact` on the `<header>` when the user scrolls down, using rAF throttling, a minimum scroll delta, and a lock period so the header's own resize doesn't cause flicker. Children style themselves with `group-data-[compact=true]:`.
- `mobile-nav.tsx`: client component. A right-side `Sheet` containing the nav links and `DisplayPreferences`.
- `display-preferences.tsx`: client component. A popover with a theme `ToggleGroup` (light/dark) and an animations `Switch`.
  - Theme comes from `@wrksz/themes` (`useTheme` from `@wrksz/themes/client`; the provider is from `@wrksz/themes/next`). It uses `attribute="class"`, defaults to `light`, and doesn't follow the system setting. A `mounted` guard avoids a hydration mismatch.
  - Animations default to the inverse of `prefers-reduced-motion`. A user override is saved in `localStorage["motion-preference"]` and applied as `<html data-motion="on|off">` plus an inline `scroll-behavior`.
  - On mobile (under 640px), `usePopoverPlacement` centers the popup in the viewport when there isn't enough room below the trigger. This relies on the custom `positionerClassName` prop (see below).
- `hero.tsx`: static intro. It uses Base UI's `render` prop to render `Button`s as `<a>` elements, which requires `nativeButton={false}`. It links to `/resume.pdf`, which isn't in `public/` yet.

## shadcn / Base UI conventions

- [components.json](components.json) uses the `base-nova` style. Components are built on `@base-ui/react`, not Radix, so:
  - Use `render={<Element />}` for composition, not `asChild`.
  - Set `nativeButton={false}` when a Button renders a non-button element.
  - State is exposed through attributes such as `data-open`, `data-highlighted`, `aria-pressed`, and `aria-checked`.
- Add components with `npx shadcn@latest add <name>`. Generated files in `src/components/ui/` **have been edited locally**, so don't overwrite them blindly:
  - `button.tsx`: the `secondary` variant uses the site's tokens.
  - `popover.tsx`: `PopoverContent` accepts an extra `positionerClassName` prop that is passed to the Positioner.
- Some generated files import `cn` from `"cn"` and others from `"@/lib/utils"`. Both resolve to the same function.

## Styling

- Tailwind v4 is configured in CSS only: there's no `tailwind.config`, PostCSS uses `@tailwindcss/postcss`, and `globals.css` imports `tw-animate-css` and `shadcn/tailwind.css`.
- Dark mode is the custom variant `dark` → `.dark` class on an ancestor.
- **Design tokens** are defined in `:root` and `.dark` in [globals.css](src/app/globals.css), then exposed through `@theme inline` as Tailwind colors. Use these names rather than raw colors: `panel-background`, `header-background`, `primary-text`, `primary-button-*`, `secondary-button-*`, `technology-chip-*`, `component-card-*`, `contact-button-*`. Write them as utilities, e.g. `bg-component-card-fill` or `text-primary-text`. When you add a token, add it in three places: `:root`, `.dark`, and `@theme inline`.
- Type scale utilities set both size and weight: `text-heading-lg`, `text-heading-md`, `text-body-lg`, `text-body-md`, `text-body-sm`.
- **Gotcha:** the standard shadcn tokens (`--background`, `--primary`, `--popover`, `--muted`, `--ring`, `--radius`, …) are **not defined** in `globals.css`. Utilities like `bg-primary` or `bg-popover` from untouched shadcn defaults (such as Button's `default` variant) produce no color. Always override them with the site tokens through `className`, as the existing components do. `--primary-foreground` is defined, but only in `:root`, not in `.dark`.

## Accessibility and motion

Accessibility is a stated priority. Follow the existing patterns:

- Give every interactive element a visible `focus-visible` ring. Components define a local `focusRing` class string.
- Connect controls to their labels with `aria-labelledby` / `aria-describedby` and `React.useId()`.
- Use `aria-hidden` on decorative icons and `aria-label` on icon-only buttons.
- Respect reduced motion with `motion-reduce:transition-none`. Note that Tailwind's `motion-reduce:` reads the OS setting, not the in-app toggle. Nothing in the CSS reads `html[data-motion]` yet, so animation styles that should obey the toggle need to target `[data-motion=off]` explicitly.
- `scroll-padding-top: 7rem` on `html` stops anchor targets from landing under the sticky header.

## Known quirks

- `site-header.tsx` has two nested wrapper `div`s with the same `max-w-5xl px-6 py-8` classes. The outer one is the one that animates `py` when the header is compact. The inner one likely duplicates padding by mistake.

## Deployment and workflow

- Vercel deploys from `main` and from branches matching `feature/**` ([vercel.json](vercel.json)). The current branches use `feature-…` with a hyphen, which **doesn't** match that pattern.
- Feature branches are merged into `main` through GitHub PRs.
