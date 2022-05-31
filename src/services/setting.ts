import { request, authRequest } from '@/utils/request';
// import { accountData } from '@/utils/help';
import { stringify } from 'qs';

interface objectT {
  [propName: string]: any;
}
//头像
export const putAvatars: objectT = async (params: objectT) => {
  return authRequest(`/center/info-settings/avatars`, {
    method: 'PUT',
    data: params.data,
  });
};
//设置信息
export const putInfo: objectT = async (params: objectT) => {
  return authRequest(`/center/info-settings/user`, {
    method: 'PUT',
    data: params.data,
  });
};
//获取信息
export const getInfo: objectT = async (params: objectT) => {
  return authRequest(`/center/info-settings/profile`, {
    method: 'GET',
  });
};
//修改密码
export const changePassword: objectT = async (params: objectT) => {
  return authRequest(`/center/info-settings/password`, {
    method: 'PUT',
    data: params.data,
  });
};
//退出
export const siginOut: objectT = async (params: objectT) => {
  return authRequest(`/center/user/logout`, {
    method: 'POST',
  });
};
