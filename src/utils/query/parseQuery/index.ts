import { cleanQuery } from '../cleanQuery';
import { QueryObject, QueryOptions } from '../query.types';

/**
 * 쿼리 문자열을 객체로 파싱합니다.
 * 중복된 key는 배열로 처리됩니다.
 * @param query - 예: '?tag=a&tag=b'
 * @param options.clean - 빈 값 제거 여부 (기본값: true)
 * @returns 파싱된 객체
 */
export const parseQuery = (query: string, options?: QueryOptions): QueryObject => {
  const result: QueryObject = {};
  const queryString = query.startsWith('?') ? query.slice(1) : query;

  for (const param of queryString.split('&')) {
    const [rawKey, rawValue] = param.split('=');
    if (!rawKey) continue;

    const key = decodeURIComponent(rawKey);
    const value = decodeURIComponent(rawValue || '');

    if (key in result) {
      const prev = result[key];
      result[key] = Array.isArray(prev) ? [...prev, value] : [prev, value];
    } else {
      result[key] = value;
    }
  }

  return options?.clean === false ? result : cleanQuery(result);
};
