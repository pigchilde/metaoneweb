import { request, authRequest } from '@/utils/request';

interface objectT {
  [propName: string]: any;
}

export const getGuildsBanner: objectT = async (params: objectT) => {
  return request(`/center/information/getGuildsBanner`, {
    method: 'GET',
  });
};

export const getGuildsInformationList: objectT = async (params: objectT) => {
  return request(`/center/information/getGuildsInformationList`, {
    method: 'GET',
  });
};

export const getGuildRoleInfo: objectT = async (params: objectT) => {
  return authRequest(`/center/guild/info`, {
    method: 'GET',
  });
};
