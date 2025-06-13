import type { ResizeImageOptions } from '../types';
import { cropImage } from '../cropImage';

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

/**
 * 이미지 파일을 주어진 크기로 리사이즈하거나, 필요 시 crop하여 Blob 형태로 반환합니다.
 * - crop이 true면 'cover' 방식으로 리사이즈 후 잘라냄
 * - crop이 false면 'contain' 방식으로 리사이즈만 수행
 * @param file - 이미지 파일
 * @param options - 리사이즈 옵션
 * @returns Blob 형태로 리사이즈된 이미지
 */
export const resizeImage = async (file: File, options: ResizeImageOptions = {}): Promise<Blob> => {
  const {
    maxWidth = Infinity,
    maxHeight = Infinity,
    crop = true,
    cropPosition = 'center',
  } = options;

  const image = await loadImageFromFile(file);

  if (!isFinite(maxWidth) || !isFinite(maxHeight)) {
    throw new Error('maxWidth와 maxHeight는 finite 값이어야 합니다.');
  }

  if (crop) {
    // cover 방식: 가득 채우도록 확대/축소 후 잘라냄
    const targetRatio = maxWidth / maxHeight;
    const imageRatio = image.width / image.height;

    let scale;
    if (imageRatio > targetRatio) {
      // 가로가 더 긴 경우: 세로에 맞춰서 스케일
      scale = maxHeight / image.height;
    } else {
      // 세로가 더 긴 경우: 가로에 맞춰서 스케일
      scale = maxWidth / image.width;
    }

    const scaledWidth = Math.round(image.width * scale);
    const scaledHeight = Math.round(image.height * scale);

    // 먼저 scale된 이미지 만들기
    const canvas = document.createElement('canvas');
    canvas.width = scaledWidth;
    canvas.height = scaledHeight;

    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('Canvas not supported');
    ctx.drawImage(image, 0, 0, scaledWidth, scaledHeight);

    const scaledBlob = await new Promise<Blob>((resolve, reject) => {
      canvas.toBlob((blob) => {
        if (!blob) return reject(new Error('Failed to scale image'));
        resolve(blob);
      }, file.type);
    });

    // scale된 Blob을 cropImage에 넘김
    const scaledFile = new File([scaledBlob], file.name, { type: file.type });
    return await cropImage(scaledFile, {
      width: maxWidth,
      height: maxHeight,
      cropPosition,
    });
  } else {
    // contain 방식: 최대 크기 내에서 비율 유지하여 축소
    const ratio = Math.min(maxWidth / image.width, maxHeight / image.height, 1);
    const width = Math.round(image.width * ratio);
    const height = Math.round(image.height * ratio);

    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('Canvas not supported');

    ctx.drawImage(image, 0, 0, width, height);

    return await new Promise((resolve, reject) => {
      canvas.toBlob((blob) => {
        if (!blob) return reject(new Error('Failed to convert canvas to blob'));
        resolve(blob);
      }, file.type);
    });
  }
};
