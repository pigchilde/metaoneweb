import { request } from '@/utils/request';

interface objectT {
  [propName: string]: any;
}

export const getGamersBanner: objectT = async (params: objectT) => {
  return request(`/center/information/getGamersBanner`, {
    method: 'GET',
  });
};

export const getGamersInformationList: objectT = async (params: objectT) => {
  return request(`/center/information/getGamersInformationList`, {
    method: 'GET',
  });
};
