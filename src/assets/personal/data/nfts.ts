import Mock from 'mockjs';
import EXCELLENT_awp_HASH_RATE_3 from '@/assets/personal/data/pic/EXCELLENT-awp-HASH_RATE_3.png';
import EXCELLENT_m4a1_HASH_RATE_3 from '@/assets/personal/data/pic/EXCELLENT-m4a1-HASH_RATE_3.png';
import medidcre_ak47_HASH_RATE_1 from '@/assets/personal/data/pic/medidcre-ak47-HASH_RATE_1[KILLBOX].png';
import medidcre_mp5_HASH_RATE_1 from '@/assets/personal/data/pic/medidcre-mp5-HASH_RATE_1[KILLBOX].png';
import RARE_mp5_HASH_RATE_12 from '@/assets/personal/data/pic/RARE_mp5-HASH_RATE_12[KILLBOX].png';
import tank_28031 from '@/assets/personal/data/pic/28031.png';
import tank_28030 from '@/assets/personal/data/pic/28030.png';
import tank_27773 from '@/assets/personal/data/pic/27773.png';
import tank_27772 from '@/assets/personal/data/pic/27772.png';
// import { accountInWhiteList } from "mockData";

const dataPool: any[] = [
  {
    name: 'awp',
    game: 'Kill Box',
    image: EXCELLENT_awp_HASH_RATE_3,
    quality: 'excellent',
    attr: { 'HASH RATE': 3 },
  },
  {
    name: 'm4a1',
    game: 'Kill Box',
    image: EXCELLENT_m4a1_HASH_RATE_3,
    quality: 'excellent',
    attr: { 'HASH RATE': 3 },
  },
  {
    name: 'ak47',
    game: 'Kill Box',
    image: medidcre_ak47_HASH_RATE_1,
    quality: 'medidcre',
    attr: { 'HASH RATE': 1 },
  },
  {
    name: 'mp5',
    game: 'Kill Box',
    image: medidcre_mp5_HASH_RATE_1,
    quality: 'medidcre',
    attr: { 'HASH RATE': 1 },
  },
  {
    name: 'mp5',
    game: 'Kill Box',
    image: RARE_mp5_HASH_RATE_12,
    quality: 'rare',
    attr: { 'HASH RATE': 12 },
  },
  {
    name: '28031',
    game: 'AOT',
    image: tank_28031,
    quality: 'legendary',
    attr: {
      HP: 917,
      ATTACK: 180,
      'CRITICAL CHANCE': '63%',
      SPEED: 61,
      'ATTACK RANGE': 73,
      'BARRING CAPACITY': 1693,
      WEIGHT: 914,
      TYPE: 'BRUTE ENGINE',
    },
  },
  {
    name: '28030',
    game: 'AOT',
    image: tank_28030,
    quality: 'legendary',
    attr: {
      HP: 951,
      ATTACK: 141,
      'CRITICAL CHANCE': '92%',
      SPEED: 136,
      'ATTACK RANGE': 69,
      'BARRING CAPACITY': 1764,
      WEIGHT: 1471,
      TYPE: 'FLASH ENGINE',
    },
  },
  {
    name: '27773',
    game: 'AOT',
    image: tank_27773,
    quality: 'legendary',
    attr: {
      HP: 810,
      ATTACK: 157,
      'CRITICAL CHANCE': '94%',
      SPEED: 102,
      'ATTACK RANGE': 79,
      'BARRING CAPACITY': 1529,
      WEIGHT: 1275,
      TYPE: 'FLASH ENGINE',
    },
  },
  {
    name: '27772',
    game: 'AOT',
    image: tank_27772,
    quality: 'legendary',
    attr: {
      HP: 840,
      ATTACK: 183,
      'CRITICAL CHANCE': '100%',
      SPEED: 134,
      'ATTACK RANGE': 74,
      'BARRING CAPACITY': 1714,
      WEIGHT: 1295,
      TYPE: 'FLASH ENGINE',
    },
  },
];

export type NFT = {
  id: number;
  hash: number;
  image: string;
  name: string;
  isGuild: boolean;
  game: 'Kill Box' | 'AOT';
  // NFT level
  // level: 1 | 2 | 3 | 4 | 5;
  owner: string;
  quality: string;
  attr: any;
  // 状态： 0未上架 1已上架 2已出租
  status: 0 | 1 | 2;
  // 出租信息
  leaseInfo?: NFTLeasing;
  // 承租信息
  rentInfo?: NFTRent;

  // 是否为我租赁的
  isMeRented?: boolean;
};

/**
 * NFT出租信息
 */
export type NFTLeasing = {
  id: number;
  nftId: number;
  // 租赁模式: 0 rent model  1 share model
  model: 0 | 1;
  // 出租金额 USDT/Day
  interest: number;
  shareProportion: number;
  shareDeposit: number;
  leastTerm: number;
  longestTerm: number;
  // 目标承租人 0 All guildss
  targetRenter: 0 | 1;
};

/**
 * NFT 承租信息
 */
export type NFTRent = {
  id: number;
  nftId?: number;
  // 租赁模式: 0 rent model  1 share model
  model: 0 | 1;
  // 租赁时间
  rentTime: string;
  // 租赁天数 Days
  rentDays: number;
  // 承租人地址
  renter: string;
};

const NFTs = (function () {
  const total = Mock.Random.integer(5, 8);
  const nfts: NFT[] = [];
  for (let i = 0; i < total; i++) {
    const index = Mock.Random.integer(0, dataPool.length - 1);
    const data = dataPool[index];
    if (data) {
      const nft = {
        id: Mock.Random.integer(1, 100000),
        hash: Mock.Random.integer(1000, 10000),
        owner: '0xac3Ba799055Bb644a7D35d862ea74C90c5b3AD44',
        status: Mock.Random.integer(0, 2),
        isMeRented: Mock.Random.boolean(7, 8, true),
        ...data,
      };
      nfts.push(nft);
    }
  }

  return nfts;
})();

const NFTList: NFT[] = [
  {
    attr: { 'HASH RATE': 1 },
    game: 'Kill Box',
    isGuild: false,
    hash: 2591,
    id: 1,
    image: medidcre_mp5_HASH_RATE_1,
    isMeRented: false,
    name: 'mp5',
    owner: '0xac3Ba799055Bb644a7D35d862ea74C90c5b3AD44',
    quality: 'medidcre',
    status: 1,
  },
  {
    id: 2,
    hash: 4447,
    isGuild: false,
    owner: '0xac3Ba799055Bb644a7D35d862ea74C90c5b3AD44',
    status: 2,
    isMeRented: false,
    name: 'mp5',
    game: 'Kill Box',
    image: RARE_mp5_HASH_RATE_12,
    quality: 'rare',
    attr: {
      'HASH RATE': 12,
    },
  },
  {
    id: 3,
    hash: 3525,
    isGuild: false,
    owner: '0xac3Ba799055Bb644a7D35d862ea74C90c5b3AD44',
    status: 0,
    isMeRented: false,
    name: '28031',
    game: 'AOT',
    image: tank_28031,
    quality: 'legendary',
    attr: {
      HP: 917,
      ATTACK: 180,
      'CRITICAL CHANCE': '63%',
      SPEED: 61,
      'ATTACK RANGE': 73,
      'BARRING CAPACITY': '1,693',
      WEIGHT: 914,
      TYPE: 'BRUTE ENGINE',
    },
  },
  {
    id: 4,
    hash: 9358,
    isGuild: false,
    owner: '0xac3Ba799055Bb644a7D35d862ea74C90c5b3AD44',
    status: 2,
    isMeRented: true,
    name: 'awp',
    game: 'Kill Box',
    image: EXCELLENT_awp_HASH_RATE_3,
    quality: 'excellent',
    attr: {
      'HASH RATE': 3,
    },
    rentInfo: {
      id: 1,
      model: 1,
      rentTime: '2022-05-30T09:23:13.556Z',
      rentDays: 27,
      renter: '0xac3Ba799055Bb644a7D35d862ea74C90c5b3AD44',
    },
  },
  {
    id: 5,
    hash: 7283,
    isGuild: false,
    owner: '0xac3Ba799055Bb644a7D35d862ea74C90c5b3AD44',
    status: 2,
    isMeRented: true,
    name: 'awp',
    game: 'Kill Box',
    image: EXCELLENT_awp_HASH_RATE_3,
    quality: 'excellent',
    attr: {
      'HASH RATE': 3,
    },
    rentInfo: {
      id: 1,
      model: 1,
      rentTime: '2022-04-30T09:23:13.556Z',
      rentDays: 12,
      renter: '0xac3Ba799055Bb644a7D35d862ea74C90c5b3AD44',
    },
  },
  {
    id: 6,
    hash: 4255,
    isGuild: true,
    owner: '0xac3Ba799055Bb644a7D35d862ea74C90c5b3AD44',
    status: 2,
    isMeRented: true,
    name: 'mp5',
    game: 'Kill Box',
    image: medidcre_mp5_HASH_RATE_1,
    quality: 'medidcre',
    attr: {
      'HASH RATE': 1,
    },
    rentInfo: {
      id: 1,
      model: 0,
      rentTime: '2022-05-24T09:23:13.556Z',
      rentDays: 24,
      renter: '0xac3Ba799055Bb644a7D35d862ea74C90c5b3AD44',
    },
  },
  {
    id: 7,
    hash: 4166,
    isGuild: false,
    owner: '0xac3Ba799055Bb644a7D35d862ea74C90c5b3AD44',
    status: 2,
    isMeRented: true,
    name: '27773',
    game: 'AOT',
    image: tank_27773,
    quality: 'legendary',
    attr: {
      HP: 810,
      ATTACK: 157,
      'CRITICAL CHANCE': '94%',
      SPEED: 102,
      'ATTACK RANGE': 79,
      'BARRING CAPACITY': '1,529',
      WEIGHT: '1,275',
      TYPE: 'FLASH ENGINE',
    },
    rentInfo: {
      id: 1,
      model: 1,
      rentTime: '2022-05-16T09:23:13.556Z',
      rentDays: 20,
      renter: '0xac3Ba799055Bb644a7D35d862ea74C90c5b3AD44',
    },
  },
  {
    id: 8,
    hash: 3907,
    isGuild: false,
    owner: '0xac3Ba799055Bb644a7D35d862ea74C90c5b3AD44',
    status: 2,
    isMeRented: true,
    name: '27773',
    game: 'AOT',
    image: tank_27773,
    quality: 'legendary',
    attr: {
      HP: 810,
      ATTACK: 157,
      'CRITICAL CHANCE': '94%',
      SPEED: 102,
      'ATTACK RANGE': 79,
      'BARRING CAPACITY': '1,529',
      WEIGHT: '1,275',
      TYPE: 'FLASH ENGINE',
    },
    rentInfo: {
      id: 1,
      model: 1,
      rentTime: '2022-05-16T09:23:13.556Z',
      rentDays: 20,
      renter: '0xac3Ba799055Bb644a7D35d862ea74C90c5b3AD44',
    },
  },
  {
    id: 9,
    isGuild: false,
    hash: 2591,
    owner: '0xac3Ba799055Bb644a7D35d862ea74C90c5b3AD44',
    status: 1,
    isMeRented: true,
    name: 'mp5',
    game: 'Kill Box',
    image: medidcre_mp5_HASH_RATE_1,
    quality: 'medidcre',
    attr: {
      'HASH RATE': 1,
    },
    rentInfo: {
      id: 1,
      model: 1,
      rentTime: '2022-05-16T09:23:13.556Z',
      rentDays: 20,
      renter: '0xac3Ba799055Bb644a7D35d862ea74C90c5b3AD44',
    },
  },
  {
    id: 10,
    hash: 9893,
    isGuild: false,
    owner: '0xac3Ba799055Bb644a7D35d862ea74C90c5b3AD44',
    status: 1,
    isMeRented: true,
    name: 'mp5',
    game: 'Kill Box',
    image: medidcre_mp5_HASH_RATE_1,
    quality: 'medidcre',
    attr: {
      'HASH RATE': 1,
    },
    rentInfo: {
      id: 1,
      model: 1,
      rentTime: '2022-05-16T09:23:13.556Z',
      rentDays: 20,
      renter: '0xac3Ba799055Bb644a7D35d862ea74C90c5b3AD44',
    },
  },
  {
    id: 11,
    hash: 2144,
    isGuild: true,
    owner: '0xac3Ba799055Bb644a7D35d862ea74C90c5b3AD44',
    status: 1,
    isMeRented: false,
    name: '28030',
    game: 'AOT',
    image: tank_28030,
    quality: 'legendary',
    attr: {
      HP: 951,
      ATTACK: 141,
      'CRITICAL CHANCE': '92%',
      SPEED: 136,
      'ATTACK RANGE': 69,
      'BARRING CAPACITY': '1,764',
      WEIGHT: '1,471',
      TYPE: 'FLASH ENGINE',
    },
  },

  {
    id: 12,
    isGuild: true,
    hash: 2591,
    owner: '0xac3Ba799055Bb644a7D35d862ea74C90c5b3AD44',
    status: 1,
    isMeRented: false,
    name: 'mp5',
    game: 'Kill Box',
    image: medidcre_mp5_HASH_RATE_1,
    quality: 'medidcre',
    attr: {
      'HASH RATE': 1,
    },
    rentInfo: {
      id: 1,
      model: 1,
      rentTime: '2022-05-16T09:23:13.556Z',
      rentDays: 20,
      renter: '0xac3Ba799055Bb644a7D35d862ea74C90c5b3AD44',
    },
  },
  {
    id: 13,
    hash: 9893,
    isGuild: true,
    owner: '0xac3Ba799055Bb644a7D35d862ea74C90c5b3AD44',
    status: 2,
    isMeRented: false,
    name: 'mp5',
    game: 'Kill Box',
    image: medidcre_mp5_HASH_RATE_1,
    quality: 'medidcre',
    attr: {
      'HASH RATE': 1,
    },
    rentInfo: {
      id: 1,
      model: 1,
      rentTime: '2022-05-16T09:23:13.556Z',
      rentDays: 20,
      renter: '0xac3Ba799055Bb644a7D35d862ea74C90c5b3AD44',
    },
  },
  {
    id: 14,
    isGuild: true,
    hash: 2592,
    owner: '0xac3Ba799055Bb644a7D35d862ea74C90c5b3AD44',
    status: 0,
    isMeRented: false,
    name: 'awp',
    game: 'Kill Box',
    image: EXCELLENT_awp_HASH_RATE_3,
    quality: 'medidcre',
    attr: {
      'HASH RATE': 1,
    },
    rentInfo: {
      id: 1,
      model: 1,
      rentTime: '2022-05-16T09:23:13.556Z',
      rentDays: 20,
      renter: '0xac3Ba799055Bb644a7D35d862ea74C90c5b3AD44',
    },
  },
  {
    id: 15,
    hash: 2421,
    isGuild: true,
    owner: '0xac3Ba799055Bb644a7D35d862ea74C90c5b3AD44',
    status: 1,
    isMeRented: true,
    name: 'm4a1',
    game: 'Kill Box',
    image: EXCELLENT_m4a1_HASH_RATE_3,
    quality: 'excellent',
    attr: {
      'HASH RATE': 3,
    },
  },

  {
    id: 16,
    hash: 1575,
    isGuild: true,
    owner: '0xac3Ba799055Bb644a7D35d862ea74C90c5b3AD44',
    status: 2,
    isMeRented: false,
    name: '27773',
    game: 'AOT',
    image: tank_27773,
    quality: 'legendary',
    attr: {
      HP: 810,
      ATTACK: 157,
      'CRITICAL CHANCE': '94%',
      SPEED: 102,
      'ATTACK RANGE': 79,
      'BARRING CAPACITY': '1,529',
      WEIGHT: '1,275',
      TYPE: 'FLASH ENGINE',
    },
  },
  {
    id: 17,
    hash: 7812,
    isGuild: true,
    owner: '0xac3Ba799055Bb644a7D35d862ea74C90c5b3AD44',
    status: 0,
    isMeRented: false,
    name: 'ak47',
    game: 'Kill Box',
    image: medidcre_ak47_HASH_RATE_1,
    quality: 'medidcre',
    attr: {
      'HASH RATE': 1,
    },
  },
];

export function queryMyNFT() {
  // if (accountInWhiteList()) {
  let data = NFTList.filter((item) => !item.isMeRented);
  data = data.map((item) => {
    const model = Mock.Random.integer(0, 1);
    item.leaseInfo = Mock.mock({
      'id|+1': 1,
      // 租赁模式: 0 rent model  1 share model
      model,
      nftId: item.id,
      // 出租金额 USDT/Day
      'interest|1-10.1-3': 2,
      'shareProportion|1-20': 5,
      'shareDeposit|1-100': 50,
      'leastTerm|1-5': 1,
      'longestTerm|10-30': 10,
      // 目标承租人 0 All guildss
      'targetRenter|0-1': 0,
    });
    return item;
  });
  return data;
  // }
  // return [];
}

export function queryMyRentNFT() {
  // if (accountInWhiteList()) {
  let data = NFTList.filter((item) => item.isMeRented);
  data = data.map((item) => {
    item.status = 2;
    const model = Mock.Random.integer(0, 1);
    item.leaseInfo = Mock.mock({
      'id|+1': 1,
      // 租赁模式: 0 rent model  1 share model
      model,
      nftId: item.id,
      // 出租金额 USDT/Day
      'interest|1-10.1-3': 2,
      'shareProportion|1-20': 5,
      'shareDeposit|1-100': 50,
      'leastTerm|1-5': 1,
      'longestTerm|10-30': 10,
      // 目标承租人 0 All guildss
      'targetRenter|0-1': 0,
    });
    item.rentInfo = Mock.mock({
      'id|+1': 1,
      // 租赁模式: 0 rent model  1 share model
      'model|0-1': 0,
      rentTime: new Date(),
      'rentDays|1-30': 1,
      // 承租人地址
      renter: '0xac3Ba799055Bb644a7D35d862ea74C90c5b3AD44',
    });
    return item;
  });

  return data;
  // }
  return [];
}

export async function queryNFTDetailsById(id: number) {
  const nft = NFTList.find((item) => item.id == id);
  if (nft) {
    const { status } = nft;
    let data = nft;
    if ([1, 2].includes(status)) {
      const model = Mock.Random.integer(0, 1);
      data.leaseInfo = Mock.mock({
        'id|+1': 1,
        // 租赁模式: 0 rent model  1 share model
        model,
        nftId: nft.id,
        // 出租金额 USDT/Day
        'interest|1-10.1-3': 2,
        'shareProportion|1-20': 5,
        'shareDeposit|1-100': 50,
        'leastTerm|1-5': 1,
        'longestTerm|10-30': 10,
        // 目标承租人 0 All guildss
        'targetRenter|0-1': 0,
      });
      if (status === 2) {
        data.rentInfo = Mock.mock({
          'id|+1': 1,
          // 租赁模式: 0 rent model  1 share model
          model,
          nftId: nft.id,
          rentTime: new Date(),
          'rentDays|1-30': 1,
          // 承租人地址
          renter: '0x95C65C0752b64B8Df8B749Dd096b47c473eba561',
        });
      }
    }
    return Promise.resolve({
      code: 0,
      msg: 'success',
      data: nft,
    });
  }
  return Promise.resolve({
    code: 1,
    data: null,
    msg: '404 not find',
  });
}

const marketNFTs = (function () {
  const total = Mock.Random.integer(36, 100);
  const nfts: NFT[] = [];
  for (let i = 0; i < total; i++) {
    const index = Mock.Random.integer(0, dataPool.length - 1);
    const data = dataPool[index];
    if (data) {
      const nft = {
        id: 1000 + index,
        level: Mock.Random.integer(1, 5),
        hash: Mock.Random.integer(1000, 10000),
        owner: '0xac3Ba799055Bb644a7D35d862ea74C90c5b3AD44',
        isMeRented: Mock.Random.boolean(5, 6, true),
        status: 1,
        leaseInfo: Mock.mock({
          'id|+1': 1,
          // 租赁模式: 0 rent model  1 share model
          'mode|0-1': 0,
          'nftId|+1': 1,
          // 出租金额 USDT/Day
          'interest|1-10.0-2': 2,
          'shareProportion|1-20': 5,
          'shareDeposit|1-100': 50,
          'leastTerm|1-5': 1,
          'longestTerm|10-30': 10,
          // 目标承租人 0 All guildss
          'targetRenter|0-1': 0,
        }),
        ...data,
      };
      nfts.push(nft);
    }
  }

  return nfts;
})();

export async function queryMarketNFTs({ pageIndex = 1, pageSize = 16 }) {
  const start = pageSize * (pageIndex - 1);
  const data = marketNFTs.slice(start, pageSize + start);

  return Promise.resolve({
    code: 0,
    data: {
      nfts: data,
      total: marketNFTs.length,
    },
    msg: '',
  });
}

export async function queryMarketNFTById(id: string) {
  const nft = marketNFTs.find((item: any) => item.id === parseInt(id));
  return Promise.resolve({
    code: 0,
    data: nft,
    msg: '',
  });
}
