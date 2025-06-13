export type CropPosition =
  | 'center'
  | 'top'
  | 'bottom'
  | 'left'
  | 'right'
  | 'top-left'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-right';

export type CropImageOptions = {
  width: number;
  height: number;
  position?: CropPosition;
};

export type ResizeImageOptions = {
  maxWidth?: number;
  maxHeight?: number;
  crop?: boolean;
};
