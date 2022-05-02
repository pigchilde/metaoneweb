/**
 * request 网络请求工具
 * 更详细的api文档: https://bigfish.alipay.com/doc/api#request
 */

import { extend } from 'umi-request';
import { notification } from 'antd';
import router from 'umi/router';
import { APIURL, UOMURL } from '@/utils/constants';

interface objectT {
  [propName: string]: any;
}

/**
 * 异常处理程序
 */
const errorHandler = (error: any) => {
  const { response = {}, data } = error;
  const { status } = response;
  const { message } = data;
  if (status === 401) {
    notification.error({
      message: '未登录或登录已过期，请重新登录。',
    });
    return;
  }
  notification.error({
    message: `请求错误 ${status}`,
    description: message,
  });
  throw error;
};

/**
 * 配置request请求时的默认参数
 */
export const request: any = extend({
  errorHandler, // 默认错误处理
  credentials: 'include', // 默认请求是否带上cookie
});

export const Request = (url: string, params: objectT) => {
  const newOption = {
    ...params,
    headers: {},
  };
  return request(url, newOption)
    .then((res: objectT) => {
      if (res.code) {
        return Promise.reject(res);
      } else {
        return Promise.resolve(res);
      }
    })
    .catch(function (error: any) {
      console.log(error);
    });
};

export const authRequest = (url: string, params: objectT) => {
  const { xqjy }: objectT = window;
  const auth = xqjy.xqjyUcManager.getAuthHeader({
    url: (url.indexOf('/v1.0/') > -1 ? UOMURL : APIURL) + url,
    method: params.method,
  });

  const newOption = {
    ...params,
    headers: {
      authorization: auth,
      vorg: xqjy.OrgName,
    },
    credentials: 'same-origin',
  };
  //代理build后失效 环境判断
  const reqUrl =
    process.env.NODE_ENV === 'production'
      ? (url.indexOf('/v1.0/') > -1 ? UOMURL : APIURL) + url
      : url;

  return request(reqUrl, newOption)
    .then((res: objectT) => {
      if (res.code) {
        return Promise.reject(res);
      } else {
        return Promise.resolve(res);
      }
    })
    .catch(function (error: any) {
      console.log(error);
    });
};
