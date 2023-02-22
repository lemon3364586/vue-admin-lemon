/**
 * @author lemon3364586<jun3364586@outlook.com>
 * @description 对 crypto-js 库常用加解密方法的简单封装
 */

import CryptoJS from 'crypto-js';

/**
 * @param data 明文
 * @returns 32位密文
 */
export function Md5(data: string) {
  return CryptoJS.MD5(data).toString();
}

// base64 加解密
export const Base64 = {
  /**
   * @param {Object} data 明文
   * @returns base64编码字符串
   */
  encode: function (plaintext: any) {
    plaintext = tryString(plaintext);
    const strUtf8 = CryptoJS.enc.Utf8.parse(plaintext);
    return CryptoJS.enc.Base64.stringify(strUtf8);
  },
  /**
   * @param {Object} data base64编码字符串
   * @returns base解码字符串
   */
  decode: function (data: any) {
    const parseWordWorry = CryptoJS.enc.Base64.parse(data);
    return parseWordWorry.toString(CryptoJS.enc.Utf8);
  }
};

// Aes 加解密
export const Aes = {
  /**
   * AES 加密
   * @param plaintext 明文
   * @param key 加密 key
   * @param iv 偏移量
   * @returns 密文
   */
  encode: (plaintext: any, key: string, iv: string) => {
    plaintext = tryString(plaintext);
    /* 网上找的示例都说要 utf8 编码转换，但我用的时候，转换后就无法解密得到结果，暂且就这么用，后续再研究 */
    // key = CryptoJS.enc.Utf8.parse(key)
    // iv = CryptoJS.enc.Utf8.parse(iv)
    const encryptedData = CryptoJS.AES.encrypt(plaintext, key, {
      iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });
    return encryptedData.toString();
  },
  /**
   * AES 解密
   * @param ciphertext 密文
   * @param key 加密 key
   * @param iv 偏移量
   * @returns 明文
   */
  decode: (ciphertext: string, key: string, iv: string) => {
    /* 同上，如果加密进行了转换，解密也要 */
    // key = CryptoJS.enc.Utf8.parse(key)
    // iv = CryptoJS.enc.Utf8.parse(iv)
    const decryptedData = CryptoJS.AES.decrypt(ciphertext, key, {
      iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });
    let result = decryptedData.toString(CryptoJS.enc.Utf8);
    // 尝试对解密结果反序列化
    try {
      result = JSON.parse(result);
    } catch (e) {
      /* console.log(e) */
    }
    return result;
  }
};

/**
 * @param len 指定返回长度
 * @returns 指定长度随机字符串
 */
export function RandCode(len: number = 16) {
  // 默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1
  const $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
  const maxPos = $chars.length;
  let str = '';
  for (let i = 0; i < len; i++) {
    str += $chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return str;
}

export function tryString(data: any) {
  if (typeof data === 'object') {
    // 如果传入数据为object/array，尝试对其进行json序列化
    try {
      data = JSON.stringify(data);
    } catch (error) {
      // console.log("error:", error);
    }
  } else if (typeof data === 'number') {
    // 如果传入数据为number，尝试转换为string
    data = String(data);
  }
  return data;
}
