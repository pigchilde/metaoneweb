import { request } from '@/utils/request';
// import { accountData } from '@/utils/help';
// import { stringify } from 'qs';

interface objectT {
  [propName: string]: any;
}

export const getList: objectT = async (params: objectT) => {
  return request(`/api-docs/center/news/getLatestNewsList/${params.id}`, {
    method: 'GET',
  });
};
