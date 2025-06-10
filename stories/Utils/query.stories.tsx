import type { Meta, StoryObj } from '@storybook/react';
import {
  parseQuery,
  stringifyQuery,
  cleanQuery,
  getQuery,
  updateQuery,
  appendQuery,
  QueryObject,
  QueryOptions,
  UpdateQueryOptions,
} from '@/utils/query';

const meta: Meta = {
  title: 'utils/query',
  parameters: {
    docs: {
      description: {
        component: '쿼리 문자열 관련 유틸리티 함수 모음',
      },
    },
  },
};

export default meta;

// 1. parseQuery
type ParseArgs = {
  query: string;
  options?: QueryOptions;
};
export const ParseQuery: StoryObj<ParseArgs> = {
  args: { query: '?page=1&sort=asc&tag=a&tag=b', options: { clean: true } },
  render: ({ query, options }) => (
    <div>
      <strong>parseQuery("{query}", options)</strong>
      <pre>{JSON.stringify(parseQuery(query, options), null, 2)}</pre>
    </div>
  ),
};

// 2. stringifyQuery
type StringifyArgs = {
  params: QueryObject;
  options?: QueryOptions;
};
export const StringifyQuery: StoryObj<StringifyArgs> = {
  args: {
    params: { page: 1, sort: 'asc', empty: '', skip: null },
    options: { clean: true },
  },
  render: ({ params, options }) => (
    <div>
      <strong>stringifyQuery(params, options)</strong>
      <pre>{stringifyQuery(params, options)}</pre>
    </div>
  ),
};

// 3. cleanQuery
type CleanArgs = { params: QueryObject };
export const CleanQuery: StoryObj<CleanArgs> = {
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

// 4. getQuery
type GetQueryArgs = { url?: string };
export const GetQuery: StoryObj<GetQueryArgs> = {
  args: { url: 'https://example.com/?q=search&tag=js&tag=ts' },
  render: ({ url }) => (
    <div>
      <strong>getQuery({url ? `"${url}"` : 'undefined'})</strong>
      <pre>{JSON.stringify(getQuery(url), null, 2)}</pre>
    </div>
  ),
};

// 5. updateQuery
type UpdateArgs = {
  newParams: QueryObject;
  options?: UpdateQueryOptions;
};
export const UpdateQuery: StoryObj<UpdateArgs> = {
  args: {
    newParams: { page: 2, filter: 'on', sort: '' },
    options: { baseURL: 'https://example.com/?page=1&sort=asc', clean: true },
  },
  render: ({ newParams, options }) => (
    <div>
      <strong>updateQuery(newParams, options)</strong>
      <pre>{updateQuery(newParams, options)}</pre>
    </div>
  ),
};

// 6. appendQuery
type AppendArgs = {
  baseURL: string;
  params: QueryObject;
  options?: QueryOptions;
};
export const AppendQuery: StoryObj<AppendArgs> = {
  args: {
    baseURL: 'https://example.com',
    params: { tag: 'query', extra: '', toggle: 'yes' },
    options: { clean: true },
  },
  render: ({ baseURL, params, options }) => (
    <div>
      <strong>appendQuery(baseURL, params, options)</strong>
      <pre>{appendQuery(baseURL, params, options)}</pre>
    </div>
  ),
};
