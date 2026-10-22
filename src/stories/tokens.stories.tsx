import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { cn } from "@/lib/utils";

const meta = {
  title: "Foundations/Tokens",
  tags: ["ai-generated"],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

// Each surface with the text color meant to sit on it. Class names are
// written out in full so Tailwind generates them.
const surfaces = [
  { name: "background / foreground", className: "bg-background text-foreground" },
  { name: "card / card-foreground", className: "bg-card text-card-foreground" },
  { name: "popover / popover-foreground", className: "bg-popover text-popover-foreground" },
  { name: "header / foreground", className: "bg-header text-foreground" },
  { name: "primary / primary-foreground", className: "bg-primary text-primary-foreground" },
  { name: "secondary / secondary-foreground", className: "bg-secondary text-secondary-foreground" },
  { name: "muted / muted-foreground", className: "bg-muted text-muted-foreground" },
  { name: "accent / accent-foreground", className: "bg-accent text-accent-foreground" },
  { name: "background / destructive", className: "bg-background text-destructive" },
];

// Non-text roles: control edges and the focus outline.
const lines = [
  { name: "border", className: "bg-border" },
  { name: "input", className: "bg-input" },
  { name: "ring", className: "bg-ring" },
];

const palette = [
  "white",
  "mist-50",
  "violet-50",
  "violet-100",
  "violet-150",
  "violet-200",
  "violet-250",
  "violet-500",
  "purple-800",
  "purple-900",
  "indigo-300",
  "indigo-700",
  "indigo-800",
  "indigo-900",
  "ink-500",
  "ink-850",
  "ink-900",
  "ink-950",
  "navy-950",
  "red-300",
  "red-900",
];

const radii = [
  { name: "rounded-sm", className: "rounded-sm" },
  { name: "rounded-md", className: "rounded-md" },
  { name: "rounded-lg", className: "rounded-lg" },
  { name: "rounded-xl", className: "rounded-xl" },
];

function SemanticColors({ dark = false }: { dark?: boolean }) {
  return (
    <div className={cn("flex flex-col gap-6 bg-background p-6 text-foreground", dark && "dark")}>
      <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {surfaces.map((surface) => (
          <li
            key={surface.name}
            className={cn("rounded-lg border border-border p-4", surface.className)}
          >
            <span className="text-sm">{surface.name}</span>
          </li>
        ))}
      </ul>
      <ul className="flex flex-col gap-3">
        {lines.map((line) => (
          <li key={line.name} className="flex items-center gap-4 text-sm">
            <span className="w-16">{line.name}</span>
            <span aria-hidden="true" className={cn("h-0.5 flex-1", line.className)} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export const SemanticLight: Story = {
  render: () => <SemanticColors />,
};

export const SemanticDark: Story = {
  render: () => <SemanticColors dark />,
};

// Raw values. Components never use these directly; they go through the
// semantic roles above.
export const Palette: Story = {
  render: () => (
    <ul className="grid grid-cols-2 gap-4 p-6 sm:grid-cols-4 lg:grid-cols-6">
      {palette.map((name) => (
        <li key={name} className="flex flex-col gap-2 text-sm">
          <span
            aria-hidden="true"
            className="h-12 rounded-md border border-border"
            style={{ background: `var(--palette-${name})` }}
          />
          <span>{name}</span>
        </li>
      ))}
    </ul>
  ),
};

export const Radius: Story = {
  render: () => (
    <ul className="flex flex-wrap gap-6 p-6">
      {radii.map((radius) => (
        <li key={radius.name} className="flex flex-col items-center gap-2 text-sm">
          <span
            aria-hidden="true"
            className={cn("size-16 border border-border bg-muted", radius.className)}
          />
          <span>{radius.name}</span>
        </li>
      ))}
    </ul>
  ),
};
