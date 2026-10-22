import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect } from 'storybook/test';
import contactList from '@/app/contact-list.json';
import { Contact } from '@/components/sections/contact';

const meta = {
  component: Contact,
  tags: ['ai-generated'],
} satisfies Meta<typeof Contact>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvas }) => {
    for (const item of contactList) {
      await expect(canvas.getByRole('group', { name: item.label })).toBeVisible();
    }
  },
};
