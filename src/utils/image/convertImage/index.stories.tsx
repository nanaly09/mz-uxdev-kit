import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { convertImage } from './index';
import type { ConvertImageOptions, ImageExtension } from '../types';

const meta: Meta<ConvertImageOptions> = {
  title: 'utils | image/convertImage',
  argTypes: {
    extension: {
      control: { type: 'select' },
      options: ['jpg', 'jpeg', 'png', 'webp'],
      defaultValue: 'jpg',
    },
    quality: {
      control: { type: 'range', min: 0, max: 1, step: 0.05 },
      defaultValue: 0.8,
    },
  },
};
export default meta;

export const 기본사용: StoryObj<ConvertImageOptions> = {
  render: ({ extension, quality }) => {
    const [original, setOriginal] = useState<{
      url: string;
      size: number;
      type: string;
    } | null>(null);
    const [converted, setConverted] = useState<{
      url: string;
      size: number;
      type: string;
    } | null>(null);

    const [currentFile, setCurrentFile] = useState<File | null>(null);

    const processConvert = async (file: File) => {
      const originalUrl = URL.createObjectURL(file);
      setOriginal({
        url: originalUrl,
        size: file.size,
        type: file.type,
      });

      const blob = await convertImage(file, { extension, quality });
      const convertedUrl = URL.createObjectURL(blob);

      setConverted({
        url: convertedUrl,
        size: blob.size,
        type: blob.type,
      });
    };

    const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;
      setCurrentFile(file);
      await processConvert(file);
    };

    const handleRefresh = () => {
      if (currentFile) processConvert(currentFile);
    };

    return (
      <div style={{ padding: 16 }}>
        <input type="file" accept="image/*" onChange={handleChange} />
        {currentFile && (
          <button onClick={handleRefresh} style={{ marginLeft: 12 }}>
            🔄 다시 변환
          </button>
        )}
        <div style={{ display: 'flex', gap: 32, marginTop: 24 }}>
          {original && (
            <div>
              <h3>원본</h3>
              <img src={original.url} style={{ maxWidth: 300 }} />
              <p>타입: {original.type}</p>
              <p>용량: {original.size.toLocaleString()} bytes</p>
            </div>
          )}
          {converted && (
            <div>
              <h3>변환 결과</h3>
              <img src={converted.url} style={{ maxWidth: 300 }} />
              <p>타입: {converted.type}</p>
              <p>용량: {converted.size.toLocaleString()} bytes</p>
            </div>
          )}
        </div>
      </div>
    );
  },
};
