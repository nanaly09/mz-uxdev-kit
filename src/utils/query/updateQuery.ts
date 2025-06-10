import { QueryObject, UpdateQueryOptions } from './query.types';
import { getQuery } from './getQuery';
import { cleanQuery } from './cleanQuery';
import { stringifyQuery } from './stringifyQuery';

/**
 * 기존 URL 쿼리에 새로운 값을 추가하거나 갱신합니다.
 * @param newParams - 새로 추가/변경할 파라미터
 * @param options - 추가 옵션 (clean, baseURL)
 * @returns 문자열 (예: '?page=2')
 */
export const updateQuery = (newParams: QueryObject, options?: UpdateQueryOptions): string => {
  const merged = { ...getQuery(options?.baseURL), ...newParams };
  const final = options?.clean === false ? merged : cleanQuery(merged);

  return stringifyQuery(final);
};
