import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, fn } from "storybook/test";
import { ContactIconButton } from "@/components/sections/contact-icon-button";

const meta = {
  title: "Patterns/Contact Icon Button",
  component: ContactIconButton,
  args: {
    action: "email",
    label: "Email",
    value: "hello@example.com",
    href: "mailto:hello@example.com",
    onCopy: fn(),
  },
} satisfies Meta<typeof ContactIconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Email: Story = {
  play: async ({ canvas }) => {
    const link = canvas.getByRole("link", {
      name: "Send email to hello@example.com",
    });
    await expect(link).toHaveAttribute("href", "mailto:hello@example.com");
    await expect(canvas.queryByRole("button")).not.toBeInTheDocument();
  },
};

export const Copy: Story = {
  args: { action: "copy" },
  play: async ({ args, canvas, userEvent }) => {
    const button = canvas.getByRole("button", { name: "Copy Email" });
    await expect(button.tagName).toBe("BUTTON");
    await expect(button).toHaveAttribute("type", "button");

    await userEvent.click(button);
    await expect(args.onCopy).toHaveBeenCalledOnce();

    // Keyboard users can copy too.
    await userEvent.keyboard("{Enter}");
    await expect(args.onCopy).toHaveBeenCalledTimes(2);
  },
};

export const Copied: Story = {
  args: { action: "copy", copied: true },
  play: async ({ canvas }) => {
    // The icon changes; the accessible name stays the same. The card announces
    // the result in its live region.
    await expect(
      canvas.getByRole("button", { name: "Copy Email" }),
    ).toBeInTheDocument();
  },
};

export const Download: Story = {
  args: {
    action: "download",
    label: "Resume",
    href: "/Jenna_Neifert_Resume.pdf",
  },
  play: async ({ canvas }) => {
    const link = canvas.getByRole("link", { name: "Download Resume" });
    await expect(link).toHaveAttribute("href", "/Jenna_Neifert_Resume.pdf");
    await expect(link).toHaveAttribute("download", "Jenna_Neifert_Resume.pdf");
  },
};

export const Open: Story = {
  args: {
    action: "open",
    label: "GitHub",
    href: "https://github.com/JNeifertCodes",
  },
  play: async ({ canvas }) => {
    const link = canvas.getByRole("link", { name: "Open GitHub in a new tab" });
    await expect(link).toHaveAttribute("target", "_blank");
    await expect(link).toHaveAttribute("rel", "noopener noreferrer");
  },
};

export const LinkWithoutHref: Story = {
  args: { action: "open", href: undefined },
  play: async ({ canvasElement }) => {
    await expect(canvasElement.querySelector("a, button")).toBeNull();
  },
};

export const FocusMarker: Story = {
  args: {
    action: "open",
    label: "GitHub",
    href: "https://github.com/JNeifertCodes",
  },
  play: async ({ canvas, userEvent }) => {
    const link = canvas.getByRole("link", { name: "Open GitHub in a new tab" });
    await userEvent.tab();
    await expect(link).toHaveFocus();
    // The bar under the icon shows on keyboard focus, not only on hover.
    await expect(getComputedStyle(link, "::after").transform).not.toBe(
      "matrix(0, 0, 0, 1, 0, 0)",
    );
  },
};
