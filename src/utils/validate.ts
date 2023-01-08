/**
 * @author lemon3364586<jun3364586@outlook.com>
 * @description 数据验证
 */

const username = /^[A-Za-z0-9\_]+$/; // 英文、数字、下划线，首尾不能是下划线、且不能只有下划线
const pwd = /^.{6,16}$/; // 密码，长度6-16位
const password = /^.*(?=.{6,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*? ]).*$/; //高强度密码强度，最少6位，包括至少1个大写字母，1个小写字母，1个数字，1个特殊字符
const landline = /^\d{3,4}-\d{7,8}(-\d{3,4})?$/; // 固定电话
const mobile = /^1[3-9]\d{9}$/; // 手机号码
const email =
  /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/; // 邮箱
const idCard = /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/; // 18位数身份证正则表达式（二代身份证）
const hyperlink = /^(https?:|mailto:|tel:)/; // 超链接

export function isUsername(value: string) {
  return username.test(value);
}
export function isPassword(value: string) {
  return pwd.test(value);
}
export function isLandline(value: string) {
  return landline.test(value);
}
export function isMobile(value: string) {
  return mobile.test(value);
}
export function isEmail(value: string) {
  return email.test(value);
}
export function isIdCard(value: string) {
  return idCard.test(value);
}
export function isHyperlink(value: string) {
  return hyperlink.test(value);
}
