import type { ConvertImageOptions } from '../types';

const extensionToMime: Record<string, string> = {
  jpg: 'image/jpeg',
  jpeg: 'image/jpeg',
  png: 'image/png',
  webp: 'image/webp',
  bmp: 'image/bmp',
  gif: 'image/gif',
  avif: 'image/avif',
};

/**
 * 이미지 파일을 주어진 확장자 및 퀄리티로 변환합니다.
 * 동일한 포맷 + 퀄리티 1일 경우 변환하지 않고 원본 반환합니다.
 * @param file - 이미지 파일
 * @param options - 변환 옵션
 * @returns 변환된 File
 */
export const convertImage = async (file: File, options: ConvertImageOptions): Promise<File> => {
  const { extension, quality = 1 } = options;
  const mime = extensionToMime[extension.toLowerCase()];

  if (!mime) {
    throw new Error(`Unsupported extension: ${extension}`);
  }

  if (file.type === mime && quality === 1) {
    return file;
  }

  const image = await loadImageFromFile(file);
  const canvas = document.createElement('canvas');
  canvas.width = image.width;
  canvas.height = image.height;

  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Canvas not supported');
  ctx.drawImage(image, 0, 0);

  return await new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (!blob) return reject(new Error('Failed to convert canvas to blob'));
        resolve(new File([blob], file.name, { type: blob.type }));
      },
      mime,
      quality,
    );
  });
};

const loadImageFromFile = (file: File): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = reader.result as string;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};
