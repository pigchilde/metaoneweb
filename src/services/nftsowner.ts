import { request } from '@/utils/request';

interface objectT {
  [propName: string]: any;
}

export const getNftsOwnerBanner: objectT = async (params: objectT) => {
  /*  return request(`/center/information/getGuildsBanner`, {
    method: 'GET',
  }); */
};

export const getNftsOwnerNews: objectT = async (params: objectT) => {
  return request(`/center/news/getLatestNewsList/1201?pageNum=1&pageSize=4`, {
    method: 'GET',
  });
};

export const getNftsOwnerInformationList: objectT = async (params: objectT) => {
  return request(`/center/information/getNftsOwnerInformationList`, {
    method: 'GET',
  });
};
