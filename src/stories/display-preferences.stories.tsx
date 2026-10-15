import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, waitFor, within } from 'storybook/test';
import { DisplayPreferences } from '@/components/home-page/display-preferences';

const meta = {
  component: DisplayPreferences,
  tags: ['ai-generated'],
} satisfies Meta<typeof DisplayPreferences>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Closed: Story = {};

export const ToggleTheme: Story = {
  play: async ({ canvas, canvasElement, userEvent }) => {
    await userEvent.click(canvas.getByRole('button', { name: 'Display preferences' }));

    const body = within(canvasElement.ownerDocument.body);
    const dark = await body.findByRole('button', { name: 'Dark' });
    await userEvent.click(dark);

    await waitFor(() => expect(dark).toHaveAttribute('aria-pressed', 'true'));
    await expect(canvasElement.ownerDocument.documentElement).toHaveClass('dark');

    // Restore the default so later stories render in light mode.
    await userEvent.click(body.getByRole('button', { name: 'Light' }));
    await waitFor(() => expect(canvasElement.ownerDocument.documentElement).not.toHaveClass('dark'));
  },
};

export const ToggleAnimations: Story = {
  play: async ({ canvas, canvasElement, userEvent }) => {
    await userEvent.click(canvas.getByRole('button', { name: 'Display preferences' }));

    const toggle = await within(canvasElement.ownerDocument.body).findByRole('switch', {
      name: 'Animations',
    });
    const wasChecked = toggle.getAttribute('aria-checked') === 'true';
    await userEvent.click(toggle);

    await expect(toggle).toHaveAttribute('aria-checked', String(!wasChecked));
    await expect(canvasElement.ownerDocument.documentElement.dataset.motion).toBe(
      wasChecked ? 'off' : 'on',
    );
  },
};
