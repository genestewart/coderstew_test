import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import vue from '@vitejs/plugin-vue';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.js'],
            refresh: true,
        }),
        vue({
            template: {
                transformAssetUrls: {
                    base: null,
                    includeAbsolute: false,
                },
            },
        }),
        tailwindcss(),
    ],
    resolve: {
        alias: {
            vue: 'vue/dist/vue.esm-bundler.js',
            '@': '/resources/js',
        },
    },
    server: {
        host: '127.0.0.1',
        port: 5173,
    },
    build: {
        // Production optimizations
        minify: 'terser',
        terserOptions: {
            compress: {
                drop_console: true,
                drop_debugger: true,
            },
        },
        rollupOptions: {
            output: {
                // Chunk splitting for better caching
                manualChunks: {
                    vendor: ['vue', 'vue-router'],
                    ui: ['@headlessui/vue', 'primevue'],
                    icons: ['lucide-vue-next'],
                },
            },
        },
        // Enable source maps for debugging (can be disabled for production)
        sourcemap: false,
        // Optimize chunk size
        chunkSizeWarningLimit: 1000,
    },
    css: {
        // PostCSS optimizations
        postcss: {
            plugins: [
                // CSS optimization plugins will be handled by Tailwind
            ],
        },
    },
    // Asset optimization
    assetsInclude: [
        // Include common image formats
        '**/*.jpg',
        '**/*.jpeg',
        '**/*.png',
        '**/*.gif',
        '**/*.svg',
        '**/*.webp',
        '**/*.avif',
    ],
});