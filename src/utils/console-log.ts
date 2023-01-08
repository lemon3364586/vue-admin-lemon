/**
 * @author lemon3364586<jun3364586@outlook.com>
 * @description 自定义console.log输出样式
 */

const auther: string = '🍋LEMON🍋';

const defaultConsole = (message: any) => {
  const content = `%c ${auther} %c ${message} `;
  const autherCss = 'background: #030307;color: #fadfa3;padding:5px 0;';
  const contentCss = 'background: #fadfa3;padding:5px 0;';
  console.log(content, autherCss, contentCss);
};
const primaryConsole = (message: any) => {
  const content = `%c ${auther} %c ${message} `;
  const autherCss = 'background: #030307;color: #fadfa3;padding:5px 0;';
  const contentCss = 'background: #409EFF;color:#fff;padding:5px 0;';
  console.log(content, autherCss, contentCss);
};
const successConsole = (message: any) => {
  const content = `%c ${auther} %c ${message} `;
  const autherCss = 'background: #030307;color: #fadfa3;padding:5px 0;';
  const contentCss = 'background: #67C23A;color:#fff;padding:5px 0;';
  console.log(content, autherCss, contentCss);
};
const warningConsole = (message: any) => {
  const content = `%c ${auther} %c ${message} `;
  const autherCss = 'background: #030307;color: #fadfa3;padding:5px 0;';
  const contentCss = 'background: #E6A23C;color:#fff;padding:5px 0;';
  console.log(content, autherCss, contentCss);
};
const dangerConsole = (message: any) => {
  const content = `%c ${auther} %c ${message} `;
  const autherCss = 'background: #030307;color: #fadfa3;padding:5px 0;';
  const contentCss = 'background: #F56C6C;color:#fff;padding:5px 0;';
  console.log(content, autherCss, contentCss);
};
const infoConsole = (message: any) => {
  const content = `%c ${auther} %c ${message} `;
  const autherCss = 'background: #030307;color: #fadfa3;padding:5px 0;';
  const contentCss = 'background: #909399;color:#fff;padding:5px 0;';
  console.log(content, autherCss, contentCss);
};

const lemonConsole = (message: any, type: string = 'default') => {
  switch (type) {
    case 'primary':
      primaryConsole(message);
      break;
    case 'success':
      successConsole(message);
      break;
    case 'warning':
      warningConsole(message);
      break;
    case 'danger':
      dangerConsole(message);
      break;
    case 'info':
      infoConsole(message);
      break;
    default:
      defaultConsole(message);
      break;
  }
};

export default lemonConsole;
