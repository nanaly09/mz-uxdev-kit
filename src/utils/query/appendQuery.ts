import { QueryObject, QueryOptions } from './query.types';
import { cleanQuery } from './cleanQuery';
import { stringifyQuery } from './stringifyQuery';

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
