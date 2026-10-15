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

export const UnderlineRespectsMotionPreference: Story = {
  play: async ({ canvas, canvasElement, userEvent }) => {
    const root = canvasElement.ownerDocument.documentElement;
    const previous = root.dataset.motion;
    const underline = canvas.getByText("Contact me");
    const style = getComputedStyle(underline);

    try {
      root.dataset.motion = "on";
      await expect(style.transitionProperty).toBe("background-size");
      await expect(style.transitionDuration).not.toBe("0s");

      root.dataset.motion = "off";
      await expect(style.transitionDuration).toBe("0s");

      // With motion off the underline still appears on keyboard focus, at full
      // width immediately.
      await userEvent.tab();
      await userEvent.tab();
      await expect(canvas.getByRole("button", { name: /contact me/i })).toHaveFocus();
      await expect(style.backgroundSize).toBe("100% 2px");
    } finally {
      if (previous === undefined) delete root.dataset.motion;
      else root.dataset.motion = previous;
      (canvasElement.ownerDocument.activeElement as HTMLElement | null)?.blur();
    }
  },
};
