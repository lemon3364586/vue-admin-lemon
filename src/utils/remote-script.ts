/**
 * @author lemon3364586<jun3364586@outlook.com>
 * @description 引入外部js
 */

const remoteScript = (src: string) => {
  const scriptVNode = document.createElement('script');
  scriptVNode.type = 'text/javascript';
  scriptVNode.src = src;
  document.body.appendChild(scriptVNode);
};

export default remoteScript;
