import { request } from '@/utils/request';
import { stringify } from 'qs';

interface objectT {
  [propName: string]: any;
}
export const getList: objectT = async (params: objectT) => {
  return request(`/center/game/list?${stringify(params.data)}`, {
    method: 'GET',
  });
};
export const getHotList: objectT = async (params: objectT) => {
  return request(`/center/game/hot-game-list?gamePopularCategory=${params}`, {
    method: 'GET',
  });
};
export const getData: objectT = async (params: objectT) => {
  return request(`/center/game/detail/${params.id}`, {
    method: 'GET',
  });
};
export const gameStar: objectT = async (params: objectT) => {
  // return request(`/center/game/star`, {
  //   method: 'POST',
  //   data: params.data,
  // });

  return request(`/center/game/star?${stringify(params.data)}`, {
    method: 'POST',
  });
};
export const gameLike: objectT = async (params: objectT) => {
  return request(`/center/game/like?${stringify(params.data)}`, {
    method: 'POST',
  });
};
export const getDicItem: objectT = async (params: objectT) => {
  return request(`/center/dic/getDicItem/${params}`, {
    method: 'GET',
  });
};
