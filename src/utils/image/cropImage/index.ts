import type { CropImageOptions, CropPosition } from '../types';

/**
 * 이미지 파일을 지정된 위치 기준으로 크롭하여 Blob으로 반환합니다.
 * @param file - 이미지 파일
 * @param options - 크롭 옵션
 * @returns 크롭된 Blob 이미지
 */
export const cropImage = async (file: File, options: CropImageOptions): Promise<Blob> => {
  const { width, height, cropPosition = 'center' } = options;
  const image = await loadImageFromFile(file);

  const sx = getCropX(image.width, width, cropPosition);
  const sy = getCropY(image.height, height, cropPosition);

  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Canvas not supported');

  ctx.drawImage(image, sx, sy, width, height, 0, 0, width, height);

  return await new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (!blob) return reject(new Error('Failed to convert canvas to blob'));
      resolve(blob);
    }, file.type);
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

const getCropX = (imageWidth: number, cropWidth: number, position: CropPosition): number => {
  switch (position) {
    case 'left':
    case 'topleft':
    case 'bottomleft':
      return 0;
    case 'right':
    case 'topright':
    case 'bottomright':
      return Math.max(imageWidth - cropWidth, 0);
    case 'center':
    case 'top':
    case 'bottom':
    default:
      return Math.max((imageWidth - cropWidth) / 2, 0);
  }
};

const getCropY = (imageHeight: number, cropHeight: number, position: CropPosition): number => {
  switch (position) {
    case 'top':
    case 'topleft':
    case 'topright':
      return 0;
    case 'bottom':
    case 'bottomleft':
    case 'bottomright':
      return Math.max(imageHeight - cropHeight, 0);
    case 'center':
    case 'left':
    case 'right':
    default:
      return Math.max((imageHeight - cropHeight) / 2, 0);
  }
};
