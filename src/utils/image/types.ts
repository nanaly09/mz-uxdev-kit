export type ResizeImageOptions = {
  maxWidth?: number;
  maxHeight?: number;
  crop?: boolean; // 크롭 여부
  cropPosition?: CropPosition; // 크롭 기준 위치
};

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

export type CropImageOptions = {
  width: number;
  height: number;
  cropPosition?: CropPosition; // 기본값은 'center'
};

export type CropResult = {
  sx: number;
  sy: number;
  sWidth: number;
  sHeight: number;
};
