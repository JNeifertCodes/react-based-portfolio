import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect } from 'storybook/test';
import { SiteHeader } from '@/components/layout/site-header';

const meta = {
  component: SiteHeader,
  tags: ['ai-generated'],
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof SiteHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('link', { name: 'Jenna Neifert' })).toHaveAttribute('href', '#hero');
  },
};

// The header and its inner row transition only when motion is allowed. With
// `data-motion` unset, the OS reduced-motion setting decides.
async function expectHeaderTransitions(canvasElement: HTMLElement, motion: 'on' | 'off' | null) {
  const root = canvasElement.ownerDocument.documentElement;
  const original = root.dataset.motion;
  if (motion === null) delete root.dataset.motion;
  else root.dataset.motion = motion;

  try {
    const header = canvasElement.querySelector('header')!;
    const row = header.firstElementChild!;
    const view = canvasElement.ownerDocument.defaultView!;
    const allowed =
      motion === null ? !view.matchMedia('(prefers-reduced-motion: reduce)').matches : motion === 'on';

    await expect(getComputedStyle(header).transitionProperty).toBe(
      allowed ? 'margin, border-color, box-shadow' : 'all',
    );
    await expect(getComputedStyle(header).transitionDuration).toBe(allowed ? '0.2s' : '0s');
    await expect(getComputedStyle(row).transitionProperty).toBe(allowed ? 'padding' : 'all');
    await expect(getComputedStyle(row).transitionDuration).toBe(allowed ? '0.2s' : '0s');
  } finally {
    if (original === undefined) delete root.dataset.motion;
    else root.dataset.motion = original;
  }
}

export const MotionOn: Story = {
  play: async ({ canvasElement }) => expectHeaderTransitions(canvasElement, 'on'),
};

export const MotionOff: Story = {
  play: async ({ canvasElement }) => expectHeaderTransitions(canvasElement, 'off'),
};

export const MotionFollowsOs: Story = {
  play: async ({ canvasElement }) => expectHeaderTransitions(canvasElement, null),
};
