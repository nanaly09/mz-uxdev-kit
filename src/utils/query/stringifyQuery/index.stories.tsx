import type { Meta, StoryObj } from '@storybook/react';
import { stringifyQuery } from '../stringifyQuery';
import type { QueryObject, QueryOptions } from '../types';

type Args = {
  params: QueryObject;
  options?: QueryOptions;
};

const meta: Meta<Args> = {
  title: 'utils | query/stringifyQuery',
  parameters: {
    docs: {
      description: {
        component: '쿼리 객체를 문자열로 변환합니다.',
      },
    },
  },
};

export default meta;

const params = { page: 1, sort: 'asc', tag: ['a', 'b'], empty: '', skip: null };

export const 기본사용: StoryObj<Args> = {
  args: { params },
  render: ({ params }) => (
    <div>
      <strong>stringifyQuery(params)</strong>
      <pre>{stringifyQuery(params)}</pre>
    </div>
  ),
};

export const 빈값포함: StoryObj<Args> = {
  args: { params, options: { clean: false } },
  render: ({ params, options }) => (
    <div>
      <strong>stringifyQuery(params, {JSON.stringify(options)})</strong>
      <pre>{stringifyQuery(params, options)}</pre>
    </div>
  ),
};
