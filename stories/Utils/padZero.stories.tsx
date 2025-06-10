import type { Meta, StoryObj } from '@storybook/react';
import { padZero } from '@/index';

type Args = {
  number: number;
  length?: number;
};

const meta: Meta<Args> = {
  title: 'utils/basic/padZero',
  // tags: ['autodocs'],
  argTypes: {
    number: {
      control: { type: 'number' },
      description: '패딩할 숫자',
    },
    length: {
      control: { type: 'number' },
      description: '최소 자릿수',
    },
  },
  parameters: {
    docs: {
      description: {
        component: '숫자를 지정된 자릿수로 0을 채워 문자열로 반환합니다.',
      },
    },
  },
};

export default meta;

const Template = ({ number, length }: Args) => {
  const result = length !== undefined ? padZero(number, length) : padZero(number);
  return (
    <div
      style={{
        padding: '16px',
        fontFamily: 'monospace',
        fontSize: '16px',
        background: '#f9f9f9',
        borderRadius: '8px',
      }}
    >
      <strong>
        padZero({number}
        {length !== undefined ? `, ${length}` : ''})
      </strong>
      <div style={{ marginTop: '8px' }}>
        결과: "<code>{result}</code>"
      </div>
    </div>
  );
};

export const 기본사용: StoryObj<Args> = {
  args: {
    number: 3,
  },
  render: Template,
};

export const 자릿수지정: StoryObj<Args> = {
  args: {
    number: 3,
    length: 3,
  },
  render: Template,
};
