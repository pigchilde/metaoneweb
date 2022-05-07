import { request } from '@/utils/request';
// import { accountData } from '@/utils/help';
import { stringify } from 'qs';
interface objectT {
  [propName: string]: any;
}
export const getHomeBanner: objectT = async (params: objectT) => {
  return request(`/center/information/getHomeBanner`, {
    method: 'GET',
  });
};

export const getHomeImgAutoList: objectT = async (params: objectT) => {
  return request(`/center/information/getHomeImgAutoList`, {
    method: 'GET',
  });
};

export const getHomeInformationList: objectT = async (params: objectT) => {
  return request(`/center/information/getHomeInformationList`, {
    method: 'GET',
  });
};

export const getHomeVideoAutoList: objectT = async (params: objectT) => {
  return request(`/center/information/getHomeVideoAutoList`, {
    method: 'GET',
  });
};

export const getInvestmentAdviserList: objectT = async (params: objectT) => {
  return request(`/center/team/getInvestmentAdviserList`, {
    method: 'GET',
  });
};

export const getMetaoneManagmentList: objectT = async (params: objectT) => {
  return request(`/center/team/getMetaoneManagmentList`, {
    method: 'GET',
  });
};

export const getAdvisorList: objectT = async (params: objectT) => {
  return request(`/center/advisor/getAdvisorList`, {
    method: 'GET',
  });
};
