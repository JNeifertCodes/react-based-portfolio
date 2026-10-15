import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, spyOn } from "storybook/test";
import { Hero } from "@/components/home-page/hero";

const meta = {
  component: Hero,
  tags: ["ai-generated"],
} satisfies Meta<typeof Hero>;

export default meta;
type Story = StoryObj<typeof meta>;

// Catches the temporary link the buttons click, without downloading a file or
// opening a mail client.
function captureFollowedUrl() {
  const followed: HTMLAnchorElement[] = [];
  const spy = spyOn(HTMLAnchorElement.prototype, "click").mockImplementation(
    function (this: HTMLAnchorElement) {
      followed.push(this);
    },
  );
  return { followed, restore: () => spy.mockRestore() };
}

export const Default: Story = {
  play: async ({ canvas }) => {
    for (const name of [/download resume \(pdf\)/i, /contact me/i]) {
      const button = canvas.getByRole("button", { name });
      await expect(button.tagName).toBe("BUTTON");
      await expect(button).toHaveAttribute("type", "button");
      await expect(button).not.toHaveAttribute("href");
    }
    await expect(
      canvas.getByRole("button", { name: /contact me/i }),
    ).toHaveAccessibleDescription(
      "Opens your email app to write to jennamwneifert@gmail.com",
    );
  },
};

export const DownloadResume: Story = {
  play: async ({ canvas, userEvent }) => {
    const { followed, restore } = captureFollowedUrl();
    try {
      await userEvent.click(
        canvas.getByRole("button", { name: /download resume/i }),
      );
      await expect(followed).toHaveLength(1);
      await expect(followed[0].pathname).toBe("/Jenna_Neifert_Resume.pdf");
      await expect(followed[0].download).toBe("Jenna_Neifert_Resume.pdf");
    } finally {
      restore();
    }
  },
};

export const ContactMeWithKeyboard: Story = {
  play: async ({ canvas, userEvent }) => {
    const { followed, restore } = captureFollowedUrl();
    try {
      canvas.getByRole("button", { name: /contact me/i }).focus();
      await userEvent.keyboard("{Enter}");
      await userEvent.keyboard(" ");
      await expect(followed.map((link) => link.href)).toEqual([
        "mailto:jennamwneifert@gmail.com",
        "mailto:jennamwneifert@gmail.com",
      ]);
    } finally {
      restore();
    }
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
