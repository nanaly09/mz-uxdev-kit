import { QueryObject, QueryOptions } from './query.types';
import { cleanQuery } from './cleanQuery';

/**
 * 객체를 쿼리 문자열로 변환합니다.
 * @param params - key-value 객체
 * @param options.clean - 빈 값 제거 여부 (기본값: true)
 * @returns 문자열 (예: '?page=1&sort=asc')
 */
export const stringifyQuery = (params: QueryObject, options?: QueryOptions): string => {
  const entries =
    options?.clean !== false ? Object.entries(cleanQuery(params)) : Object.entries(params);

  const query = entries
    .filter(([, v]) => v !== undefined && v !== null) // 방어적으로 한 번 더
    .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(String(v))}`);

  return query.length ? `?${query.join('&')}` : '';
};
