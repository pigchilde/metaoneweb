import { request } from '@/utils/request';

interface objectT {
  [propName: string]: any;
}

/**
 * 登录
 * @param params 参数对象
 * - @param {string} auth 加密后的账号密码字符串
 * @returns token信息或登录失败信息
 */
export const login: objectT = async (params: objectT) => {
  return request(`/center/user/login`, {
    method: 'POST',
    data: params,
  });
};

/**
 * 获取登录用户信息
 * @param params 参数对象
 * - @param {string} Authorization 登录的token信息
 * @returns 返回已登录用户信息
 */
export const getUserInfo = async (params: objectT) => {
  const { token } = params;
  return request(`/center/user/info`, {
    method: 'GET',
    headers: {
      Authorization: token,
    },
  });
};

/**
 * 登出
 * @returns 返回登出情况
 */
export const logout: objectT = async () => {
  return request(`/center/user/logout`, {
    method: 'POST',
  });
};
