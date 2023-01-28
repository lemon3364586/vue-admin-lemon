// 请求成功
export function success(data?: any) {
  return {
    code: 200,
    msg: 'success',
    data
  };
}
// 请求失败
export function fail(msg?: string, data?: any) {
  return {
    code: 201,
    msg,
    data
  };
}
