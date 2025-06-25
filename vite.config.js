// import imagemin from "imagemin";
// import imageminWebp from "imagemin-webp";
// import path from "path";
// import { defineConfig } from "vite";
// import glob from "fast-glob";
// import { fileURLToPath } from "url";
// import { ViteImageOptimizer } from "vite-plugin-image-optimizer";
// import purgecss from "@fullhuman/postcss-purgecss";

// export default defineConfig({
//   plugins: [
//     ViteImageOptimizer({
//       png: {
//         quality: 86,
//       },
//       jpeg: {
//         quality: 86,
//       },
//       jpg: {
//         quality: 86,
//       },
//     }),
//     {
//       ...imagemin(["./src/img/**/*.{jpg,png,jpeg}"], {
//         destination: "./src/img/webp/",
//         plugins: [imageminWebp({ quality: 86 })],
//       }),
//       apply: "serve",
//     },
//     purgecss({
//       content: ["./**/*.html"],
//     }),
//   ],
//   build: {
//     minify: false, // disable minification
//     rollupOptions: {
//       input: Object.fromEntries(
//         glob
//           .sync(["./*.html", "./pages/**/*.html"])
//           .map((file) => [
//             path.relative(
//               __dirname,
//               file.slice(0, file.length - path.extname(file).length)
//             ),
//             fileURLToPath(new URL(file, import.meta.url)),
//           ])
//       ),
//       // output unminified CSS file
//       output: {
//         assetFileNames: "assets/[name].[ext]",
//       },
//     },
//   },
// });


import { defineConfig } from 'vite';
import path from 'path';
import glob from 'fast-glob';
import { fileURLToPath } from 'url';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';
import viteImagemin from 'vite-plugin-imagemin';
import purgecss from '@fullhuman/postcss-purgecss';
import autoprefixer from 'autoprefixer';
import postcssSortMediaQueries from 'postcss-sort-media-queries';

export default defineConfig(() => ({
  // ✅ Подходит для Vercel (хостинг в корне)
  base: '/',

  plugins: [
    ViteImageOptimizer({
      png: { quality: 86 },
      jpeg: { quality: 86 },
      jpg: { quality: 86 },
    }),

    viteImagemin({
      webp: { quality: 86 },
      pngquant: { quality: [0.86, 0.86] },
      mozjpeg: { quality: 86 },
      gifsicle: false,
      svgo: false,
    }),
  ],

  css: {
    postcss: {
      plugins: [
        purgecss({
          content: [
            './index.html',
            './pages/**/*.html',
            './src/**/*.{js,ts,jsx,tsx,vue}',
          ],
        }),
        autoprefixer(),
        postcssSortMediaQueries(),
      ],
    },
  },

  build: {
    minify: false,
    rollupOptions: {
      input: Object.fromEntries(
        glob.sync(['./*.html', './pages/**/*.html']).map((file) => [
          path
            .relative(
              path.resolve(),
              file.slice(0, file.length - path.extname(file).length)
            )
            .replace(/\\/g, '/'),
          fileURLToPath(new URL(file, import.meta.url)),
        ])
      ),
      output: {
        assetFileNames: 'assets/[name].[hash].[ext]',
      },
    },
  },
}));
