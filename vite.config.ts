import vue from '@vitejs/plugin-vue';
import { defineConfig, loadEnv } from 'vite';
import { resolve } from 'path';
import { viteMockServe } from 'vite-plugin-mock';
import { createHtmlPlugin } from 'vite-plugin-html';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import appSetting from './src/setting';

const pathResolve = (dir: string) => {
  return resolve(__dirname, '.', dir);
};
const { siteTitle, useMock } = appSetting;
const timeStamp = new Date().getTime();

// https://cn.vitejs.dev/config
export default defineConfig(({ command, mode }) => {
  // 根据当前 mode 加载 .env 文件,设置第三个参数为 '' 来加载所有环境变量，而不管是否有 `VITE_` 前缀
  const { VITE_PROXY_TARGET } = loadEnv(mode, `./env`, '');
  const isBuild = command === 'build';
  return {
    base: './', // 开发或生产环境服务的公共基础路径
    envDir: './env', // 用于加载 .env 文件的目录
    envPrefix: ['VITE_'], // 以 envPrefix 开头的环境变量会通过 import.meta.env 暴露在客户端源码中
    plugins: [
      vue(),
      viteMockServe({
        mockPath: 'mock',
        localEnabled: !isBuild && useMock,
        prodEnabled: isBuild && useMock,
        watchFiles: true,
        supportTs: true,
        ignore: /^\_/,
        injectCode: `
          import { setupProdMockServer } from '../mock/_mockProdServer';
          setupProdMockServer();
        `
      }),
      createHtmlPlugin({
        inject: {
          data: {
            title: siteTitle,
            injectScript: `<script src="./inject.js"></script>`
          }
        }
      }),
      AutoImport({
        imports: ['vue', 'vue-router', 'vue-i18n', 'pinia'],
        dts: 'types/global/auto-import.d.ts',
        resolvers: []
      }),
      Components({
        dirs: ['src/components'],
        dts: 'types/global/components.d.ts',
        resolvers: []
      })
    ],
    build: {
      outDir: 'dist', // 指定打包路径，默认为项目根目录下的 dist 目录
      assetsDir: 'assets', // 指定生成静态资源的存放路径（相对于 build.outDir）
      minify: 'terser', // 指定使用混淆器<boolean | 'terser' | 'esbuild'>
      sourcemap: false, // 构建后是否生成 source map 文件
      terserOptions: {
        compress: {
          keep_infinity: true, // 防止 Infinity 被压缩成 1/0，这可能会导致 Chrome 上的性能问题
          drop_console: true, // 生产环境去除 console
          drop_debugger: true, // 生产环境去除 debugger
          pure_funcs: ['console.log'] // 去除指定 console
        }
      },
      chunkSizeWarningLimit: 3000, // chunk 大小警告的限制（以 kbs 为单位）
      rollupOptions: {
        // 静态资源分类打包
        output: {
          chunkFileNames: `assets/js/[name].${timeStamp}.js`,
          entryFileNames: `assets/js/[name].${timeStamp}.js`,
          assetFileNames: `assets/[ext]/[name][extname]`
        }
      }
    },
    resolve: {
      alias: {
        '@': pathResolve('src'),
        'vue-i18n': 'vue-i18n/dist/vue-i18n.cjs.js'
      }
    },
    server: {
      host: true,
      port: 3364, // 服务启动端口
      open: false, // 服务启动时是否自动打开浏览器
      cors: true, // 是否允许跨域
      proxy: {
        // 设置代理
        '/proxyApi': {
          target: VITE_PROXY_TARGET,
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path.replace(/^\/proxyApi/, '')
        }
      }
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
            @import "@/styles/variable.module.scss";
          `
        }
      }
    }
  };
});
