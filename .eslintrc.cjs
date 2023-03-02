/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
  root: true,
  extends: [
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier',
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    'prettier',
    'plugin:prettier/recommended'
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  /*
   * "off" 或 0    ==>  关闭规则
   * "warn" 或 1   ==>  打开的规则作为警告（不影响代码执行）
   * "error" 或 2  ==>  规则作为一个错误（代码不能执行，界面报错）
   */
  rules: {
    'no-console': 0,
    'no-debugger': 0,
    'no-var': 1, // 要求使用 let 或 const 而不是 var
    'no-undef': 0, // 未定义变量(typescript 实际上已经对其进行了监测，所以可以直接关闭，避免编辑器报错提示)
    'no-unused-vars': 1, // 未使用变量
    'no-empty': 1, // 块语句中的内容不能为空
    'no-empty-pattern': 1, // 空对象
    'no-multiple-empty-lines': [1, { max: 30 }], // 空行最多不能超过30行
    'no-unreachable': 0, // 不能有无法执行的代码(如代码中直接return)
    'no-useless-escape': 0, // 不能有转义字符
    'space-before-function-paren': 0, // 函数名后必须加空格
    'prefer-const': 1, // let 未改变提示修改为 const

    'vue/multi-word-component-names': 0, // 组件名称校验
    'vue/no-unused-components': 1, // 已引入，但未使用组件
    // 'vue/no-unused-vars': 0, // 已定义/引入，但未使用变量
    'vue/valid-template-root': 1, // element 空节点

    'prettier/prettier': [0, { endOfLine: 'auto' }] // 关闭 prettier 换行符相关提示
  }
};
