import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect } from 'storybook/test';
import { ExperienceCard } from '@/components/sections/experience-card';

const meta = {
  component: ExperienceCard,
  tags: ['ai-generated'],
  args: {
    role: 'Software Engineer',
    company: 'Lumen Learning',
    companyHref: 'https://lumenlearning.com',
    location: 'Remote (remote)',
    startDate: { label: 'Jan 2022', dateTime: '2022-01' },
    endDate: { label: 'Mar 2025', dateTime: '2025-03' },
    description: 'Built accessible course tools used by students and instructors.',
    highlights: [
      'Started Storybook as the shared component library.',
      'Made the learning pages screen reader friendly.',
    ],
    technologies: ['Vue', 'TypeScript', 'Accessibility'],
  },
} satisfies Meta<typeof ExperienceCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('article', { name: /software engineer · lumen learning/i })).toBeVisible();
    await expect(canvas.getByRole('link', { name: /opens in a new tab/i })).toHaveAttribute(
      'target',
      '_blank',
    );
    await expect(canvas.getByRole('list', { name: 'Highlights' }).children).toHaveLength(2);
    await expect(canvas.getByRole('list', { name: 'Technologies used' }).children).toHaveLength(3);
  },
};

export const NoHighlights: Story = {
  args: { highlights: [] },
  play: async ({ canvas }) => {
    await expect(canvas.queryByRole('list', { name: 'Highlights' })).not.toBeInTheDocument();
  },
};

export const CurrentRole: Story = {
  args: { endDate: undefined },
  play: async ({ canvas }) => {
    await expect(canvas.getByText(/present/i)).toBeVisible();
  },
};

export const WithoutLink: Story = { args: { companyHref: undefined } };

export const NoTechnologies: Story = { args: { technologies: [], location: undefined } };
