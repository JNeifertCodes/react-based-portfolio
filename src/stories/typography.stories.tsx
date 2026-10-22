import type { Meta, StoryObj } from "@storybook/nextjs-vite";

const meta = {
  title: "Foundations/Typography",
  tags: ["ai-generated"],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

// The scale sets size, weight and line-height together, so headings take no
// leading-* or font-* classes.
export const Headings: Story = {
  render: () => (
    <div className="flex flex-col gap-8 p-6">
      <div className="flex flex-col gap-1">
        <span className="text-sm">text-heading-lg · fluid 2.5rem–4rem · 700 · h1</span>
        <h1 className="text-heading-lg">Jenna Neifert</h1>
      </div>
      <div className="flex flex-col gap-1">
        <span className="text-sm">text-heading-md · 1.625rem · 600 · section h2</span>
        <h2 className="text-heading-md">Experience</h2>
      </div>
      <div className="flex flex-col gap-1">
        <span className="text-sm">text-heading-sm · 1.25rem · 600 · card h3</span>
        <h3 className="text-heading-sm">Software Engineer · Vanguard</h3>
      </div>
    </div>
  ),
};

export const Body: Story = {
  render: () => (
    <div className="flex max-w-prose flex-col gap-6 p-6">
      {[
        { name: "text-lg", className: "text-lg" },
        { name: "text-base", className: "text-base" },
        { name: "text-sm", className: "text-sm" },
      ].map((size) => (
        <div key={size.name} className="flex flex-col gap-1">
          <span className="text-sm">{size.name}</span>
          <p className={size.className}>
            Frontend engineer focused on accessible, well-tested interfaces.
          </p>
        </div>
      ))}
    </div>
  ),
};
