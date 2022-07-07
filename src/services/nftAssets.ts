import { request, authRequest } from '@/utils/request';
import { stringify } from 'qs';

interface ObjectT {
  [propName: string]: any;
}

/**
 * 获取nft信息
 * @returns
 */
export const getNFTInfo: ObjectT = async (params: ObjectT) => {
  const { id } = params;
  return authRequest(`/nft/asset/${id}`, {
    method: 'GET',
  });
};

/**
 * 获取我的nft资产列表
 * @returns
 */
export const getMyNFTList: ObjectT = async (params: ObjectT) => {
  return authRequest(`/nft/asset/list?${stringify(params)}`, {
    method: 'GET',
    data: params,
  });
};

/**
 * 获取nft资产列表
 * @returns
 */
export const getMyLeasingNFTList: ObjectT = async (params: ObjectT) => {
  return authRequest(`/nft/asset/lessee/list?${stringify(params)}`, {
    method: 'GET',
    data: params,
  });
};

/**
 * lease模式上架nft资产
 * @returns
 */
export const leasePublish: ObjectT = async (params: ObjectT) => {
  return authRequest(`/nft/asset-make/lease-publish`, {
    method: 'POST',
    data: params,
  });
};

/**
 * nft资产发布完成
 * @returns
 */
export const publishComplete: ObjectT = async (params: ObjectT) => {
  const { id } = params;
  return authRequest(`/nft/asset-make/publish-complete/${id}`, {
    method: 'PUT',
  });
};

/**
 * nft资产发布完成
 * @returns
 */
export const publishFail: ObjectT = async (params: ObjectT) => {
  const { id } = params;
  return authRequest(`/nft/asset-make/publish-fail/${id}`, {
    method: 'PUT',
  });
};
