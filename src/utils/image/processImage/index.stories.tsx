import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { processImage } from './index';
import type { ImageExtension, CropPosition } from '../types';
import type { ProcessImageOptions } from './index';

type ImageInfo = {
  url: string;
  width: number;
  height: number;
  size: number;
};

const meta: Meta<ProcessImageOptions> = {
  title: 'utils | image/processImage',
  // tags: ['autodocs'],
  parameters: {
    // More parameter definitions here
  },
  argTypes: {
    extension: {
      control: { type: 'select' },
      options: ['jpg', 'jpeg', 'png', 'webp', 'bmp', 'gif', 'avif'],
      defaultValue: 'png',
      description: '변환할 이미지 확장자',
    },
    quality: {
      control: { type: 'range', min: 0, max: 1, step: 0.1 },
      defaultValue: 1,
      description: '이미지 품질 (0~1)',
    },
    width: {
      control: { type: 'number' },
      description: '리사이즈할 너비',
    },
    height: {
      control: { type: 'number' },
      description: '리사이즈할 높이',
    },
    crop: {
      control: { type: 'boolean' },
      defaultValue: true,
      description: '크롭 여부 (리사이즈 시)',
    },
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
      description: '크롭 기준 위치',
    },
  },
};

export default meta;

export const 기본사용: StoryObj<typeof meta> = {
  render: (args) => {
    const [original, setOriginal] = useState<ImageInfo | null>(null);
    const [processed, setProcessed] = useState<ImageInfo | null>(null);
    const [currentFile, setCurrentFile] = useState<File | null>(null);

    const process = async (file: File) => {
      // 기존 URL 정리
      original?.url && URL.revokeObjectURL(original.url);
      processed?.url && URL.revokeObjectURL(processed.url);

      const img = new Image();
      img.src = URL.createObjectURL(file);
      await new Promise((r) => (img.onload = r));
      setOriginal({
        url: img.src,
        width: img.width,
        height: img.height,
        size: file.size,
      });

      try {
        // args는 이미 ProcessImageOptions 타입이므로 캐스팅 불필요
        const processedFile = await processImage(file, args);
        const blobUrl = URL.createObjectURL(processedFile);
        const processedImg = new Image();
        processedImg.src = blobUrl;
        await new Promise((r) => (processedImg.onload = r));

        setProcessed({
          url: blobUrl,
          width: processedImg.width,
          height: processedImg.height,
          size: processedFile.size,
        });
      } catch (error) {
        console.error('Error processing image:', error);
        setProcessed(null);
      }
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
            🔄 다시 처리
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
          {processed && (
            <div>
              <h3>처리 결과</h3>
              <img src={processed.url} style={{ maxWidth: 300 }} />
              <p>
                사이즈: {processed.width} × {processed.height}
              </p>
              <p>용량: {processed.size.toLocaleString()} bytes</p>
            </div>
          )}
        </div>
      </div>
    );
  },
};
