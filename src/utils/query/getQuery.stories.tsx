import type { Meta, StoryObj } from '@storybook/react';
import { getQuery } from '@/utils/query';

import type { QueryOptions } from '@/utils/query';

type Args = {
  url?: string;
  options?: QueryOptions;
};

const meta: Meta<Args> = {
  title: 'utils | query/getQuery',
  parameters: {
    docs: {
      description: {
        component: 'URL에서 쿼리 문자열을 추출합니다.',
      },
    },
  },
};

export default meta;

const url = 'https://example.com/?q=search&tag=js&tag=ts&empty=&null=null';

export const 기본사용: StoryObj<Args> = {
  args: { url },
  render: ({ url }) => (
    <div>
      <strong>getQuery("{url}")</strong>
      <pre>{JSON.stringify(getQuery(url), null, 2)}</pre>
    </div>
  ),
};

export const 빈값포함: StoryObj<Args> = {
  args: { url, options: { clean: false } },
  render: ({ url, options }) => (
    <div>
      <strong>
        getQuery("{url}", {JSON.stringify(options)})
      </strong>
      <pre>{JSON.stringify(getQuery(url, options), null, 2)}</pre>
    </div>
  ),
};
