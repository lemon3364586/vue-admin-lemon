/// <reference types="vite/client" />

// 环境变量类型定义
interface ImportMetaEnv {
  readonly VITE_BASEURL: string;
  readonly VITE_PROXY_API: string;
  readonly VITE_USEMOCK: boolean;
}
interface ImportMeta {
  readonly env: ImportMetaEnv;
}
