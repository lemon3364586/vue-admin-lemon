/**
 * 应用全局配置
 */

const appSetting = {
  // 网站 title
  siteTitle: 'vue-admin-lemon',
  // 进度条是否显示
  showProgress: true,
  // 是否使用mockjs数据
  useMock: true,
  // aes加密秘钥
  aesKey: 'vue-admin-lemon',
  // 阿里iconfont Symbol
  aliIcon: [
    '//at.alicdn.com/t/c/font_3709562_b68v7mnc6m.js', // 单色图标
    '//at.alicdn.com/t/c/font_3711373_tb3cbm2d8nk.js' // 彩色图标
  ],
  // 用户角色
  roles: {
    developer: '开发者',
    system: '系统管理员',
    admin: '超级管理员',
    manage: '管理员',
    visitor: '游客'
  },
  // 开源地址
  github: 'https://github.com/lemon3364586/vue-admin-lemon'
};

export default appSetting;
