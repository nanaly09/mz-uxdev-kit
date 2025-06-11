import { QueryObject } from '../types';

/**
 * 객체에서 null, undefined, 빈 문자열을 제거합니다.
 * @param input - 정리할 쿼리 객체
 * @returns 정리된 객체
 */
export const cleanQuery = <T extends QueryObject>(input: T): T =>
  Object.fromEntries(
    Object.entries(input).filter(([, v]) => v !== undefined && v !== null && v !== ''),
  ) as T;
