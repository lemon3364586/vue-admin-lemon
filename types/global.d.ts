declare global {
  declare module '*.vue' {
    import type { DefineComponent } from 'vue';
    const component: DefineComponent<{}, {}, any>;
    export default component;
  }

  // axios response 类型定义
  declare module 'axios' {
    // 后台返回数据格式
    interface responseDataType<T> {
      code: string | number;
      msg: string;
      payload?: T;
    }
    export interface AxiosResponse extends responseDataType {}
  }
}
