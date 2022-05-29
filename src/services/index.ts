import { getData } from './gamefi';
import { request } from '@/utils/request';
import { orderBy } from 'lodash';
interface objectT {
  [propName: string]: any;
}
export const getHomeBanner: objectT = async () => {
  return request(`/center/information/getHomeBanner`, {
    method: 'GET',
  });
};

export const getHomeInformationList: objectT = async () => {
  return request(`/center/information/getHomeInformationList`, {
    method: 'GET',
  });
};

export const getHomeVideoAutoList: objectT = async () => {
  return request(`/center/information/getHomeVideoAutoList`, {
    method: 'GET',
  });
};

export const getInvestmentAdviserList: objectT = async () => {
  return request(`/center/team/getInvestmentAdviserList`, {
    method: 'GET',
  });
};

export const getMetaoneManagmentList: objectT = async () => {
  return request(`/center/team/getMetaoneManagmentList`, {
    method: 'GET',
  });
};

export const getAdvisorList: objectT = async () => {
  const result = await request(`/center/advisor/getAdvisorList`, {
    method: 'GET',
  });

  let data = orderBy(result.data, ['serialNumber'], 'asc');
  result.data = data;
  return result;
};

export const getDicItem: objectT = async (params: objectT) => {
  const { dicCode } = params;
  return request(`/center/dic/getDicItem/${dicCode}`, {
    method: 'GET',
  });
};
