import type {
  CropImageOptions,
  ResizeImageOptions,
  ConvertImageOptions,
  ImageExtension,
} from '../types';
import { resizeImage } from '../resizeImage';
import { convertImage } from '../convertImage';

type ProcessImageOptions = ResizeImageOptions &
  ConvertImageOptions & {
    enableResize?: boolean; // default: true
    enableConvert?: boolean; // default: true
  };

/**
 * 이미지 파일을 리사이즈 및 확장자 변환까지 한 번에 처리합니다.
 * @param file - 원본 이미지 파일
 * @param options - 리사이즈 및 변환 옵션
 * @returns Blob - 최종 처리된 이미지 Blob
 */
export const processImage = async (file: File, options: ProcessImageOptions): Promise<Blob> => {
  const {
    enableResize = true,
    enableConvert = true,
    extension,
    quality = 1,
    width,
    height,
    crop = true,
    cropPosition = 'center',
  } = options;

  let processed: Blob = file;

  // 1. 리사이즈
  if (enableResize && (width || height)) {
    processed = await resizeImage(file, {
      width,
      height,
      crop,
      cropPosition,
    });
  }

  // 2. 포맷 변환
  const originalExt = file.type.split('/')[1] as ImageExtension;
  if (enableConvert) {
    const extChanged = extension && extension !== originalExt;
    const qualityChanged = quality !== 1;
    if (extChanged || qualityChanged) {
      processed = await convertImage(processed, {
        extension,
        quality,
      });
    }
  }

  return processed;
};
