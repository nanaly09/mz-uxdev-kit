export type CropPosition =
  | 'center'
  | 'top'
  | 'bottom'
  | 'left'
  | 'right'
  | 'topleft'
  | 'topright'
  | 'bottomleft'
  | 'bottomright';

export type ImageExtension = 'jpg' | 'jpeg' | 'png' | 'webp' | 'bmp' | 'gif' | 'avif';

interface SizeOption {
  width?: number;
  height?: number;
}

export interface ResizeImageOptions extends SizeOption {
  crop?: boolean; // 크롭 여부
  cropPosition?: CropPosition; // 크롭 기준 위치
}

export interface ConvertImageOptions {
  extension: ImageExtension;
  quality?: number; // default: 1 (0 ~ 1)
}

export interface CropImageOptions extends SizeOption {
  cropPosition?: CropPosition; // 기본값은 'center'
}

export interface CropResult {
  sx: number;
  sy: number;
  sWidth: number;
  sHeight: number;
}
