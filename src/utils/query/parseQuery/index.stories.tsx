import type { Meta, StoryObj } from '@storybook/react';
import { parseQuery } from '../parseQuery';
import type { QueryOptions } from '../query.types';

type Args = {
  query: string;
  options?: QueryOptions;
};

const meta: Meta<Args> = {
  title: 'utils | query/parseQuery',
  parameters: {
    docs: {
      description: {
        component: '쿼리 문자열을 객체로 파싱합니다.',
      },
    },
  },
};

export default meta;

const query = '?page=1&sort=asc&tag=a&tag=b&empty=&null=null';

export const 기본사용: StoryObj<Args> = {
  args: { query },
  render: ({ query }) => (
    <div>
      <strong>parseQuery("{query}")</strong>
      <pre>{JSON.stringify(parseQuery(query), null, 2)}</pre>
    </div>
  ),
};

export const 빈값포함: StoryObj<Args> = {
  args: { query, options: { clean: false } },
  render: ({ query, options }) => (
    <div>
      <strong>
        parseQuery("{query}", {JSON.stringify(options)})
      </strong>
      <pre>{JSON.stringify(parseQuery(query, options), null, 2)}</pre>
    </div>
  ),
};
