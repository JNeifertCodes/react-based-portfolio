import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, within } from 'storybook/test';
import { MobileNav } from '@/components/home-page/mobile-nav';

const meta = {
  component: MobileNav,
  tags: ['ai-generated'],
  args: {
    links: [
      { href: '#about', label: 'About' },
      { href: '#experience', label: 'Experience' },
      { href: '#contact', label: 'Contact' },
    ],
  },
} satisfies Meta<typeof MobileNav>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Closed: Story = {};

export const Open: Story = {
  play: async ({ canvas, canvasElement, userEvent }) => {
    await userEvent.click(canvas.getByRole('button', { name: 'Open menu' }));

    const nav = await within(canvasElement.ownerDocument.body).findByRole('navigation', {
      name: 'Mobile',
    });
    await expect(within(nav).getByRole('link', { name: 'Experience' })).toHaveAttribute(
      'href',
      '#experience',
    );
  },
};
