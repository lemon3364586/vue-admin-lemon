/**
 * @author lemon3364586<jun3364586@outlook.com>
 * @description 引入外部js
 */

const remoteScript = (src: string) => {
  const scriptNode = document.createElement('script');
  scriptNode.type = 'text/javascript';
  scriptNode.src = src;
  document.body.appendChild(scriptNode);
};
export default remoteScript;
