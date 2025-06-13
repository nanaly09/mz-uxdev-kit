import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { cropImage } from './index';
import type { CropPosition } from '../types';

const meta: Meta<{
  width: number;
  height: number;
  cropPosition: CropPosition;
}> = {
  title: 'utils | image/cropImage',
  argTypes: {
    width: { control: { type: 'number' }, defaultValue: 200 },
    height: { control: { type: 'number' }, defaultValue: 200 },
    cropPosition: {
      control: { type: 'select' },
      options: [
        'topleft',
        'top',
        'topright',
        'left',
        'center',
        'right',
        'bottomleft',
        'bottom',
        'bottomright',
      ],
      defaultValue: 'center',
    },
  },
};
export default meta;

export const 기본사용: StoryObj<{
  width: number;
  height: number;
  cropPosition: CropPosition;
}> = {
  render: ({ width, height, cropPosition }) => {
    const [original, setOriginal] = useState<{
      url: string;
      width: number;
      height: number;
      size: number;
    } | null>(null);
    const [cropped, setCropped] = useState<{
      url: string;
      width: number;
      height: number;
      size: number;
    } | null>(null);
    const [currentFile, setCurrentFile] = useState<File | null>(null);

    const process = async (file: File) => {
      const img = new Image();
      img.src = URL.createObjectURL(file);
      await new Promise((r) => (img.onload = r));
      setOriginal({
        url: img.src,
        width: img.width,
        height: img.height,
        size: file.size,
      });

      const blob = await cropImage(file, { width, height, cropPosition });
      const blobUrl = URL.createObjectURL(blob);
      const croppedImg = new Image();
      croppedImg.src = blobUrl;
      await new Promise((r) => (croppedImg.onload = r));

      setCropped({
        url: blobUrl,
        width: croppedImg.width,
        height: croppedImg.height,
        size: blob.size,
      });
    };

    const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;
      setCurrentFile(file);
      await process(file);
    };

    const handleRefresh = () => {
      if (currentFile) process(currentFile);
    };

    return (
      <div style={{ padding: 16 }}>
        <input type="file" accept="image/*" onChange={handleChange} />
        {currentFile && (
          <button onClick={handleRefresh} style={{ marginLeft: 12 }}>
            🔄 다시 크롭
          </button>
        )}
        <div style={{ display: 'flex', gap: 32, marginTop: 24 }}>
          {original && (
            <div>
              <h3>원본 이미지</h3>
              <img src={original.url} style={{ maxWidth: 300 }} />
              <p>
                사이즈: {original.width} × {original.height}
              </p>
              <p>용량: {original.size.toLocaleString()} bytes</p>
            </div>
          )}
          {cropped && (
            <div>
              <h3>크롭 결과</h3>
              <img src={cropped.url} style={{ maxWidth: 300 }} />
              <p>
                사이즈: {cropped.width} × {cropped.height}
              </p>
              <p>용량: {cropped.size.toLocaleString()} bytes</p>
            </div>
          )}
        </div>
      </div>
    );
  },
};
