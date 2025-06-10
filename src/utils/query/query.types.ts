export type QueryValue = string | string[] | number | boolean | null | undefined;
export type QueryObject = Record<string, QueryValue>;

export type QueryOptions = {
  clean?: boolean;
};

export type UpdateQueryOptions = QueryOptions & {
  baseURL?: string;
};
