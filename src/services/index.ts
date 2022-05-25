import { request } from '@/utils/request';
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
  return request(`/center/advisor/getAdvisorList`, {
    method: 'GET',
  });
};

export const getDicItem: objectT = async (params: objectT) => {
  const { dicCode } = params;
  return request(`/center/dic/getDicItem/${dicCode}`, {
    method: 'GET',
  });
};
