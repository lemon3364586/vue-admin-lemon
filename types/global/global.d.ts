declare global {
  declare module '*.vue' {
    import type { DefineComponent } from 'vue';
    const component: DefineComponent<{}, {}, any>;
    export default component;
  }

  // axios response 类型定义
  declare module 'axios' {
    interface AxiosInstance {
      (config: AxiosRequestConfig): Promise<any>;
    }
  }
}
