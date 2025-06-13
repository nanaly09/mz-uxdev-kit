import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { resizeImage } from './index';
import type { CropPosition } from '../types';

type Props = {
  maxWidth: number;
  maxHeight: number;
  crop: boolean;
  cropPosition: CropPosition;
};

type ImageInfo = {
  url: string;
  width: number;
  height: number;
  size: number;
};

const meta: Meta<Props> = {
  title: 'utils | image/resizeImage',
  argTypes: {
    maxWidth: { control: 'number', defaultValue: 400 },
    maxHeight: { control: 'number', defaultValue: 400 },
    crop: { control: 'boolean', defaultValue: true },
    cropPosition: {
      control: 'select',
      options: [
        'center',
        'top',
        'bottom',
        'left',
        'right',
        'topleft',
        'topright',
        'bottomleft',
        'bottomright',
      ],
      defaultValue: 'center',
    },
  },
};
export default meta;

export const 기본사용: StoryObj<Props> = {
  render: ({ maxWidth, maxHeight, crop, cropPosition }) => {
    const [original, setOriginal] = useState<ImageInfo | null>(null);
    const [resized, setResized] = useState<ImageInfo | null>(null);
    const [currentFile, setCurrentFile] = useState<File | null>(null);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;
      setCurrentFile(file);
      await processResize(file);
    };

    const processResize = async (file: File) => {
      const img = new Image();
      img.src = URL.createObjectURL(file);
      await new Promise((resolve) => (img.onload = resolve));

      setOriginal({
        url: img.src,
        width: img.width,
        height: img.height,
        size: file.size,
      });

      const blob = await resizeImage(file, { maxWidth, maxHeight, crop, cropPosition });
      const url = URL.createObjectURL(blob);

      const resizedImg = new Image();
      resizedImg.src = url;
      await new Promise((resolve) => (resizedImg.onload = resolve));

      setResized({
        url,
        width: resizedImg.width,
        height: resizedImg.height,
        size: blob.size,
      });
    };

    const handleRefresh = () => {
      if (currentFile) processResize(currentFile);
    };

    return (
      <div style={{ padding: 16 }}>
        <input type="file" accept="image/*" onChange={handleFileChange} />
        {currentFile && (
          <button onClick={handleRefresh} style={{ marginLeft: 12 }}>
            🔄 다시 리사이즈
          </button>
        )}
        <div style={{ display: 'flex', gap: 32, marginTop: 24 }}>
          {original && <ImagePreview label="원본 이미지" info={original} />}
          {resized && <ImagePreview label="리사이즈 결과" info={resized} />}
        </div>
      </div>
    );
  },
};

const ImagePreview = ({ label, info }: { label: string; info: ImageInfo }) => (
  <div>
    <h3>{label}</h3>
    <img src={info.url} style={{ maxWidth: 300 }} />
    <p>
      사이즈: {info.width} × {info.height}
    </p>
    <p>용량: {info.size.toLocaleString()} bytes</p>
  </div>
);
