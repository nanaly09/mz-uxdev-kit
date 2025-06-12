import { QueryObject, QueryOptions } from '../query.types';
import { parseQuery } from '../parseQuery';

/**
 * 현재 브라우저 주소 또는 지정된 URL에서 쿼리 문자열을 추출하여 객체로 반환합니다.
 * @param url - (선택) 전체 URL 문자열
 * @param options.clean - 빈 값 제거 여부 (기본값: true)
 * @returns 파싱된 쿼리 객체
 */
export const getQuery = (url?: string, options?: QueryOptions): QueryObject => {
  if (typeof window === 'undefined' && !url) return {};

  const queryString = url ? url.split('?')[1] || '' : window.location.search;

  return parseQuery(queryString, options);
};
