import { QueryObject } from './query.types';

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
