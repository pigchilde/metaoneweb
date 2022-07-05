import { request, authRequest } from '@/utils/request';

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
 * 获取nft资产列表
 * @returns
 */
export const getNFTList: ObjectT = async (params: ObjectT) => {
  const { nftAddress, owner, pageNum, pageSize } = params;
  return authRequest(
    `/nft/asset/list?nftAddress=${nftAddress}&owner=${owner}&pageNum=${pageNum}&pageSize=${pageSize}`,
    {
      method: 'GET',
      data: params,
    },
  );
};
