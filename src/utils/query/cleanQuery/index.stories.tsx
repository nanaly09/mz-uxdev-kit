import type { Meta, StoryObj } from '@storybook/react';
import { cleanQuery } from '../cleanQuery';
import type { QueryObject } from '../query.types';

type Args = {
  params: QueryObject;
};

const meta: Meta<Args> = {
  title: 'utils | query/cleanQuery',
  parameters: {
    docs: {
      description: {
        component: '쿼리 객체에서 불필요한 값을 제거합니다.',
      },
    },
  },
};

export default meta;

export const 기본사용: StoryObj<Args> = {
  args: {
    params: { page: '1', sort: 'asc', empty: '', nullVal: null, undef: undefined },
  },
  render: ({ params }) => (
    <div>
      <strong>cleanQuery(params)</strong>
      <pre>{JSON.stringify(cleanQuery(params), null, 2)}</pre>
    </div>
  ),
};
