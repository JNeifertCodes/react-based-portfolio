import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect } from 'storybook/test';
import { ContactCard } from '@/components/home-page/contact-card';

const meta = {
  component: ContactCard,
  tags: ['ai-generated'],
  args: {
    label: 'Email',
    value: 'hello@example.com',
    href: 'mailto:hello@example.com',
    actions: ['email', 'copy'],
  },
} satisfies Meta<typeof ContactCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Email: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('button', { name: 'Send email to hello@example.com' })).toHaveAttribute(
      'href',
      'mailto:hello@example.com',
    );
  },
};

export const CopyValue: Story = {
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole('button', { name: 'Copy Email' }));
    await expect(await canvas.findByText('Email copied')).toBeInTheDocument();
  },
};

export const Resume: Story = {
  args: {
    label: 'Resume',
    value: 'Jenna_Neifert_Resume.pdf',
    href: '/Jenna_Neifert_Resume.pdf',
    actions: ['open', 'download'],
  },
};

export const NoActions: Story = { args: { actions: [] } };
