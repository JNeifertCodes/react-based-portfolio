import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect } from "storybook/test";
import { Hero } from "@/components/home-page/hero";

const meta = {
  component: Hero,
  tags: ["ai-generated"],
} satisfies Meta<typeof Hero>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvas }) => {
    await expect(
      canvas.getByRole("button", { name: /download resume/i }),
    ).toHaveAttribute("href", "/Jenna_Neifert_Resume.pdf");
    await expect(
      canvas.getByRole("button", { name: /contact me/i }),
    ).toHaveAttribute("href", "#contact");
  },
};
