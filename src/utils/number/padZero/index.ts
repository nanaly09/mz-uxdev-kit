/**
 * 숫자를 최소 자릿수만큼 0으로 패딩한 문자열로 반환합니다.
 * @param num - 대상 숫자
 * @param length - 최소 자릿수 (기본값: 2)
 * @returns 문자열
 */
export const padZero = (num: number, length: number = 2): string => {
  return num.toString().padStart(length, '0');
};
