// 请求成功
export function success(data?: any, msg: string = 'success') {
  return {
    code: 200,
    msg,
    data
  };
}
// 请求失败
export function fail(msg: string = 'error', data?: any) {
  return {
    code: 201,
    msg,
    data
  };
}
