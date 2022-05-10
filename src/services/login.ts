import { request } from '@/utils/request';

interface objectT {
  [propName: string]: any;
}
export const login: objectT = async (params: objectT) => {
  return request(`/center/user/login`, {
    method: 'POST',
    data: params,
  });
};
