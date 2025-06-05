import type { Meta, StoryObj } from '@storybook/react';
import { padZero } from '@/utils/padZero';

const meta: Meta = {
  title: 'utils/padZero',
};

export default meta;

type Story = StoryObj;

export const 기본사용: Story = {
  render: () => {
    const result = [
      `padZero(3) → "${padZero(3)}"`,
      `padZero(7, 4) → "${padZero(7, 4)}"`,
      `padZero(123, 2) → "${padZero(123, 2)}"`,
    ];

    return (
      <div style={{ fontFamily: 'monospace', lineHeight: '1.5' }}>
        {result.map((line, i) => (
          <div key={i}>{line}</div>
        ))}
      </div>
    );
  },
};
