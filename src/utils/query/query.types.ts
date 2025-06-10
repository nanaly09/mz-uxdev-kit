export type QueryValue = string | number | boolean | null | undefined;
export type QueryObject = Record<string, QueryValue | QueryValue[]>;

export type QueryOptions = {
  clean?: boolean;
};

export type UpdateQueryOptions = QueryOptions & {
  baseURL?: string;
};
