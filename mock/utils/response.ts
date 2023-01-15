// 请求成功
export function success(data?: any) {
  return {
    code: 200,
    msg: 'success',
    data
  };
}
// 请求失败
export function fail(data?: any) {
  return {
    code: 200,
    msg: 'success',
    data
  };
}
