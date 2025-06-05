import { defineConfig } from 'vite';
import type { StorybookConfig } from '@storybook/react-vite';
import path from 'path';

const config: StorybookConfig = {
  stories: ['../stories/**/*.mdx', '../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: ['@storybook/addon-onboarding', '@storybook/addon-docs'],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  viteFinal: async (config) => {
    config.resolve = {
      alias: {
        '@': path.resolve(__dirname, '../src'),
      },
    };
    return config;
  },
};

export default config;
