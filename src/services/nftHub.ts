import { request, authRequest } from '@/utils/request';
import { stringify } from 'qs';

interface ObjectT {
  [propName: string]: any;
}

/**
 * 获取nft资产列表
 * @returns
 */
export const getNFTList: ObjectT = async (params: ObjectT) => {
  return authRequest(`/nft/nfts-hub/list?${stringify(params)}`, {
    method: 'GET',
  });
};
