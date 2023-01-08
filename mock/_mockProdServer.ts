import { createProdMockServer } from 'vite-plugin-mock/es/createProdMockServer';

// 逐一导入您的mock.ts文件
// 如果使用vite.mock.config.ts，只需直接导入文件
// 可以使用 import.meta.glob功能来进行全部导入
// import adminModule from './modules/admin';
// export function setupProdMockServer() {console.log('mock注入');
//   createProdMockServer([...adminModule]);
// }

const modules = import.meta.glob('./**/*.ts', {
  import: 'default',
  eager: true
});
const mockModules: any[] = [];
Object.keys(modules).forEach((key) => {
  if (key.includes('_')) return;
  mockModules.push(...(modules[key] as any));
});

export function setupProdMockServer() {
  createProdMockServer(mockModules);
}
