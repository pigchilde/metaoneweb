import { request } from '@/utils/request';
// import { accountData } from '@/utils/help';
import { stringify } from 'qs';

interface objectT {
  [propName: string]: any;
}

export const getList: objectT = async (params: objectT) => {
  return request(
    `/center/news/getLatestNewsList/${params.id}?${stringify(params.data)}`,
    {
      method: 'GET',
    },
  );
};

export const getData: objectT = async (params: objectT) => {
  return request(`/center/news/getNews/${params.id}`, {
    method: 'GET',
  });
};
