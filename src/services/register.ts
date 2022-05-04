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