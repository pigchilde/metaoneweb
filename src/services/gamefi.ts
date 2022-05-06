import { request } from '@/utils/request';
import { stringify } from 'qs';

interface objectT {
  [propName: string]: any;
}
export const getList: objectT = async (params: objectT) => {
  console.log('getlist', params);
  return request(`/center/game/list?${stringify(params.data)}`, {
    method: 'GET',
  });
};
export const getHotList: objectT = async (params: objectT) => {
  return request(`/center/game/hot-game-list?${stringify(params)}`, {
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
  console.log(params.data);
  return request(`/center/game/star`, {
    method: 'POST',
    data: params.data,
  });
};
export const gameLike: objectT = async (params: objectT) => {
  console.log(params.data);
  return request(`/center/game/like`, {
    method: 'POST',
    data: params.data,
  });
};
