import { request } from '@/utils/request';
interface objectT {
  [propName: string]: any;
}

export const getSocialMediaList: objectT = async () => {
  return request(`/center/platform-setting/getSocialMediaList`, {
    method: 'GET',
  });
};
