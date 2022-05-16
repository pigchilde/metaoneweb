import { request } from '@/utils/request';
import { useParams } from 'umi/node_modules/@types/react-router';

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

/**
 * 发送验证码
 * @param params 参数对象
 * - @param {string} email 邮箱
 */
export const sendCode = async (params: objectT) => {
  return request(`/center/user/get-verification-code`, {
    method: 'POST',
    data: params,
  });
};

/**
 * 密码重置
 * @param params 参数对象
 * - @param {string} email 邮箱
 */
export const resetPassword = async (params: objectT) => {
  return request(`/center/user/forget-password`, {
    method: 'PUT',
    data: params,
  });
};
