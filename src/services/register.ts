import { request } from '@/utils/request';
// import { accountData } from '@/utils/help';
import { stringify } from 'qs';

interface objectT {
  [propName: string]: any;
}

export const postData: objectT = async (params: objectT) => {
  return request(`/center/user/register`, {
    method: 'POST',
    data: params.data,
  });
};

export const postEmial: objectT = async (params: objectT) => {
  return request(`/center/user/get-verification-code`, {
    method: 'POST',
    data: params.data,
  });
};
export const postCode: objectT = async (params: objectT) => {
  return request(`/center/user/verification-code`, {
    method: 'POST',
    data: params.data,
  });
};
export const getCuntry: objectT = async (params: objectT) => {
  return request(`/center/dic/getDicItem/${params.id}`, {
    method: 'GET',
  });
};
export const getDic: objectT = async (params: objectT) => {
  return request(`/center/cdi/getDicList?dicCodes=${params.id}`, {
    method: 'GET',
  });
};
