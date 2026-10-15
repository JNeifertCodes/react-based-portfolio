import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect } from "storybook/test";
import { Mail } from "lucide-react";
import { Button } from "../components/ui/button";

const meta = {
  component: Button,
  tags: ["ai-generated"],
  args: { children: "Download resume (PDF)" },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { size: "lg" } };

export const Secondary: Story = {
  args: { variant: "secondary", size: "lg", children: "Contact me" },
};

export const Outline: Story = { args: { variant: "outline" } };

export const Disabled: Story = {
  args: { disabled: true },
  play: async ({ canvas }) => {
    await expect(
      canvas.getByRole("button", { name: /download resume/i }),
    ).toBeDisabled();
  },
};

export const IconOnly: Story = {
  args: {
    variant: "outline",
    size: "icon-lg",
    "aria-label": "Send email",
    children: <Mail aria-hidden="true" />,
  },
};

export const AsLink: Story = {
  args: {
    nativeButton: false,
    render: <a href="#contact" />,
    children: "Contact me",
  },
  play: async ({ canvas }) => {
    // Base UI keeps role="button" on non-native buttons.
    await expect(
      canvas.getByRole("button", { name: /contact me/i }),
    ).toHaveAttribute("href", "#contact");
  },
};

export const CssCheck: Story = {
  args: { variant: "secondary", children: "Contact me" },
  play: async ({ canvas }) => {
    const button = canvas.getByRole("button", { name: /contact me/i });
    // secondary uses bg-secondary (--secondary: #4338ca) — fails if globals.css did not load.
    await expect(getComputedStyle(button).backgroundColor).toBe(
      "rgb(67, 56, 202)",
    );
  },
};
