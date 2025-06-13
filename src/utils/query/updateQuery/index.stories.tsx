import type { Meta, StoryObj } from '@storybook/react';
import { updateQuery } from '../updateQuery';
import type { QueryObject, UpdateQueryOptions } from '../types';

type Args = {
  newParams: QueryObject;
  options?: UpdateQueryOptions;
};

const meta: Meta<Args> = {
  title: 'utils | query/updateQuery',
  parameters: {
    docs: {
      description: {
        component: 'URL의 쿼리 문자열을 업데이트합니다.',
      },
    },
  },
};

export default meta;

const baseURL = 'https://example.com/?page=1&sort=asc';
const newParams = { page: 2, filter: 'on', sort: '', empty: '', null: null };

export const 기본사용: StoryObj<Args> = {
  args: { newParams, options: { baseURL } },
  render: ({ newParams, options }) => (
    <div>
      <strong>updateQuery(newParams, options)</strong>
      <pre>{updateQuery(newParams, options)}</pre>
    </div>
  ),
};

export const 빈값포함: StoryObj<Args> = {
  args: { newParams, options: { baseURL, clean: false } },
  render: ({ newParams, options }) => (
    <div>
      <strong>updateQuery(newParams, {JSON.stringify(options)})</strong>
      <pre>{updateQuery(newParams, options)}</pre>
    </div>
  ),
};
