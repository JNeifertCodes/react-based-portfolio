import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect } from 'storybook/test';
import workExperience from '@/app/work-experience.json';
import { Experience } from '@/components/home-page/experience';

const meta = {
  component: Experience,
  tags: ['ai-generated'],
} satisfies Meta<typeof Experience>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getAllByRole('article')).toHaveLength(workExperience.length);

    const highlightLists = canvas.getAllByRole('list', { name: 'Highlights' });
    workExperience.forEach((job, index) => {
      expect(highlightLists[index].children).toHaveLength(job.highlights.length);
    });
  },
};
