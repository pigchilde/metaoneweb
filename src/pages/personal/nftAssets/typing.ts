import { Contract } from 'web3-eth-contract';

export type ObjectT = {
  [propName: string]: any;
};

export enum ModeType {
  lease = 0, // 租赁模式
  share = 1, // 分层模式
}

export type ContractListObject = {
  [propName: string]: Contract;
};

export enum NFTTokenType {
  ERC721 = 0,
  ERC1155 = 1,
}
