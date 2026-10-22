import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, fn, spyOn } from 'storybook/test';
import { ActionIconButton } from '@/components/sections/action-icon-button';

const meta = {
  component: ActionIconButton,
  args: {
    action: 'email',
    label: 'Email',
    value: 'hello@example.com',
    href: 'mailto:hello@example.com',
    onCopy: fn(),
  },
} satisfies Meta<typeof ActionIconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Email: Story = {
  play: async ({ canvas }) => {
    const link = canvas.getByRole('link', { name: 'Send email to hello@example.com' });
    await expect(link).toHaveAttribute('href', 'mailto:hello@example.com');
    await expect(canvas.queryByRole('button')).not.toBeInTheDocument();
  },
};

export const Copy: Story = {
  args: { action: 'copy' },
  play: async ({ args, canvas, userEvent }) => {
    const button = canvas.getByRole('button', { name: 'Copy Email' });
    await expect(button.tagName).toBe('BUTTON');
    await expect(button).toHaveAttribute('type', 'button');

    await userEvent.click(button);
    await expect(args.onCopy).toHaveBeenCalledOnce();

    // Keyboard users can copy too.
    await userEvent.keyboard('{Enter}');
    await expect(args.onCopy).toHaveBeenCalledTimes(2);
  },
};

export const Copied: Story = {
  args: { action: 'copy', copied: true },
  play: async ({ canvas }) => {
    // The icon changes; the accessible name stays the same. The card announces
    // the result in its live region.
    await expect(canvas.getByRole('button', { name: 'Copy Email' })).toBeInTheDocument();
  },
};

export const Download: Story = {
  args: { action: 'download', label: 'Resume', href: '/Jenna_Neifert_Resume.pdf' },
  play: async ({ canvas, userEvent }) => {
    const button = canvas.getByRole('button', { name: 'Download Resume' });
    await expect(button.tagName).toBe('BUTTON');
    await expect(button).toHaveAttribute('type', 'button');
    await expect(button).not.toHaveAttribute('href');

    // Catch the temporary link the button clicks, without downloading a file.
    const followed: HTMLAnchorElement[] = [];
    const spy = spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(function (
      this: HTMLAnchorElement,
    ) {
      followed.push(this);
    });
    try {
      await userEvent.click(button);
      // Keyboard users can download too.
      await userEvent.keyboard('{Enter}');
      await expect(followed).toHaveLength(2);
      await expect(followed[0].pathname).toBe('/Jenna_Neifert_Resume.pdf');
      await expect(followed[0].download).toBe('Jenna_Neifert_Resume.pdf');
    } finally {
      spy.mockRestore();
    }
  },
};

export const Open: Story = {
  args: {
    action: 'open',
    label: 'GitHub',
    href: 'https://github.com/JNeifertCodes',
  },
  play: async ({ canvas }) => {
    const link = canvas.getByRole('link', { name: 'Open GitHub in a new tab' });
    await expect(link).toHaveAttribute('target', '_blank');
    await expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  },
};

export const LinkWithoutHref: Story = {
  args: { action: 'open', href: undefined },
  play: async ({ canvasElement }) => {
    await expect(canvasElement.querySelector('a, button')).toBeNull();
  },
};

export const FocusMarker: Story = {
  args: { action: 'open', label: 'GitHub', href: 'https://github.com/JNeifertCodes' },
  play: async ({ canvas, userEvent }) => {
    const link = canvas.getByRole('link', { name: 'Open GitHub in a new tab' });
    await userEvent.tab();
    await expect(link).toHaveFocus();
    // The bar under the icon shows on keyboard focus, not only on hover.
    await expect(getComputedStyle(link, '::after').transform).not.toBe('matrix(0, 0, 0, 1, 0, 0)');
  },
};
