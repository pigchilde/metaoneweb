/**
 * request 网络请求工具
 * 更详细的api文档: https://bigfish.alipay.com/doc/api#request
 */

import { extend } from 'umi-request';
import { notification, message } from 'antd';
import Cookies from 'js-cookie';
import { getLocale, history } from 'umi';

interface objectT {
  [propName: string]: any;
}
/**
 * 异常处理程序
 */
const errorHandler = (error: any) => {
  const { response = {}, data } = error;
  const { status } = response;
  if (status === 401) {
    Cookies.remove('token');
  }
  message.error(data?.message);
  throw error;
};

/**
 * 配置request请求时的默认参数
 */
export const request: any = extend({
  errorHandler, // 默认错误处理
  credentials: 'include', // 默认请求是否带上cookie
});

request.interceptors.request.use(
  (url: string, options: objectT) => {
    return {
      url,
      options: {
        ...options,
        headers: {
          ...(options?.headers ?? {}),
          language: getLocale().toLowerCase(),
        },
      },
    };
  },
  { global: false },
);

/**
 * 配置request请求时的默认参数
 */
export const authRequest: any = extend({
  errorHandler, // 默认错误处理
  credentials: 'include', // 默认请求是否带上cookie
});

authRequest.interceptors.request.use(
  (url: string, options: objectT) => {
    const token = Cookies.get('token');
    if (!token) {
      message.error('未登录或登录已过期，请重新登录。');
      history.push('/login');
      return false;
    }
    return {
      url,
      options: {
        ...options,
        headers: {
          ...(options?.headers ?? {}),
          Authorization: token,
          language: getLocale().toLowerCase(),
        },
      },
    };
  },
  { global: false },
);

authRequest.interceptors.response.use(
  async (response: objectT, options: objectT) => {
    const res = await response.json();
    if (res.code === 401) {
      // 暂未登录或token已经过期
      Cookies.remove('token');
      message.error(res.msg);
    }
    return res;
  },
  { global: false },
);
