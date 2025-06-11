import type { Meta, StoryObj } from '@storybook/react';
import { appendQuery } from '@/utils/query';
import type { QueryObject, QueryOptions } from '@/utils/query';

type Args = {
  baseURL: string;
  params: QueryObject;
  options?: QueryOptions;
};

const meta: Meta<Args> = {
  title: 'utils | query/appendQuery',
  parameters: {
    docs: {
      description: {
        component: 'URL에 쿼리 파라미터를 추가합니다.',
      },
    },
  },
};

export default meta;

const baseURL = 'https://example.com';
const params = { tag: 'query', extra: '', toggle: 'yes' };

export const 기본사용: StoryObj<Args> = {
  args: { baseURL, params },
  render: ({ baseURL, params }) => (
    <div>
      <strong>appendQuery(baseURL, params)</strong>
      <pre>{appendQuery(baseURL, params)}</pre>
    </div>
  ),
};

export const 빈값포함: StoryObj<Args> = {
  args: { baseURL, params, options: { clean: false } },
  render: ({ baseURL, params, options }) => (
    <div>
      <strong>appendQuery(baseURL, params, {JSON.stringify(options)})</strong>
      <pre>{appendQuery(baseURL, params, options)}</pre>
    </div>
  ),
};
