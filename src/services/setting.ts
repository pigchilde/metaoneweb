import { request, authRequest } from '@/utils/request';
// import { accountData } from '@/utils/help';
import { stringify } from 'qs';

interface objectT {
  [propName: string]: any;
}

export const putInfo: objectT = async (params: objectT) => {
  return authRequest(`/center/info-settings/user`, {
    method: 'PUT',
    data: params.data,
  });
};
export const getInfo: objectT = async (params: objectT) => {
  return authRequest(`/center/info-settings/profile`, {
    method: 'GET',
  });
};
