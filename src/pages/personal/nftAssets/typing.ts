export type ObjectT = {
  [propName: string]: any;
};

export enum ModeType {
  lease = 0, // 租赁模式
  share = 1, // 分层模式
}

export enum NFTTokenType {
  ERC721 = 0,
  ERC1155 = 1,
}

export enum TargetLeaser {
  allGuilds = 0,
  myGuildOnly = 1,
}
