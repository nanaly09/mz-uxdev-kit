import { QueryObject, QueryOptions, UpdateQueryOptions } from '@/utils/query/types';

/**
 * 쿼리 문자열을 객체로 파싱합니다.
 * @param query - 예: '?page=1&sort=asc'
 * @returns 파싱된 객체
 */
export const parseQuery = (query: string): Record<string, string> => {
  const result: Record<string, string> = {};
  const queryString = query.startsWith('?') ? query.slice(1) : query;

  for (const param of queryString.split('&')) {
    const [key, value] = param.split('=');
    if (key) result[decodeURIComponent(key)] = decodeURIComponent(value || '');
  }

  return result;
};

/**
 * 객체에서 null, undefined, 빈 문자열을 제거합니다.
 * @param input - 정리할 쿼리 객체
 * @returns 정리된 객체
 */
export const cleanQuery = <T extends QueryObject>(input: T): T =>
  Object.fromEntries(
    Object.entries(input).filter(([, v]) => v !== undefined && v !== null && v !== ''),
  ) as T;

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

/**
 * 현재 브라우저 주소 또는 지정된 URL에서 쿼리 문자열을 추출하여 객체로 반환합니다.
 * @param url - (선택) 전체 URL 문자열
 * @returns 파싱된 쿼리 객체
 */
export const getQuery = (url?: string): QueryObject => {
  if (typeof window === 'undefined' && !url) return {};

  const queryString = url ? url.split('?')[1] || '' : window.location.search;

  return parseQuery(queryString);
};

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

/**
 * 지정된 URL에 쿼리 파라미터를 추가합니다.
 * @param baseUrl - 기준 URL
 * @param params - 추가할 쿼리 객체
 * @param options.clean - 빈 값 제거 여부 (기본값: true)
 * @returns 쿼리가 포함된 새로운 URL
 */
export const appendQuery = (
  baseUrl: string,
  params: QueryObject,
  options?: QueryOptions,
): string => {
  const finalParams = options?.clean === false ? params : cleanQuery(params);
  const query = stringifyQuery(finalParams);
  return query ? `${baseUrl}${baseUrl.includes('?') ? '&' : '?'}${query.slice(1)}` : baseUrl;
};

export * from '@/utils/query/types';
