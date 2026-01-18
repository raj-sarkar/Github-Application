import { resolve } from 'node:path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
    test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: './src/test/setup.ts',
    },
    resolve: {
        alias: {
            '@assets': resolve(__dirname, './src/assets'),
            '@constant': resolve(__dirname, './src/constant'),
            '@theme': resolve(__dirname, './src/theme'),
            '@components': resolve(__dirname, './src/components'),
            '@protectedRoute': resolve(__dirname, './src/protectedRoute'),
            '@routes': resolve(__dirname, './src/routes'),
            '@layout': resolve(__dirname, './src/layout'),
            '@store': resolve(__dirname, './src/store'),
            '@features': resolve(__dirname, './src/features'),
            '@containers': resolve(__dirname, './src/containers'),
            '@api': resolve(__dirname, './src/api'),
            '@models': resolve(__dirname, './src/models'),
            '@hooks': resolve(__dirname, './src/hooks'),
            '@pages': resolve(__dirname, './src/pages'),
            '@skeletons': resolve(__dirname, './src/skeletons'),
            '@utils': resolve(__dirname, './src/utils'),
            '@services': resolve(__dirname, './src/services'),
        },
    },
});
