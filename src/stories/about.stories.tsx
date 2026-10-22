import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { About } from '@/components/sections/about';

const meta = {
  component: About,
  tags: ['ai-generated'],
} satisfies Meta<typeof About>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
