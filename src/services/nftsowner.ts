import { request } from '@/utils/request';

interface objectT {
  [propName: string]: any;
}

export const getNftsOwnerBanner: objectT = async (params: objectT) => {
  /*  return request(`/center/information/getGuildsBanner`, {
    method: 'GET',
  }); */

  return {
    code: 0,
    msg: '操作成功',
    data: {
      title: 'Gaming Guilds As A Service',
      content:
        'MetaOne simplifies onboarding and NFT processes, enabling a massive gamers community with extensive gaming data analytics from games to gamers level, and provides a high assurance NFT assets management platform to the gaming metaverse.',
      img: '',
      backageImg:
        'https://bucket-metaone.obs.ap-southeast-3.myhuaweicloud.com/assets/irw9XEAR.jpg',
      volume: 460327,
      transactions: 31656,
    },
    count: 0,
    pageNo: 0,
    pages: 0,
  };
};

export const getNftsOwnerNews: objectT = async (params: objectT) => {
  return request(`/center/news/getLatestNewsList/1201?pageNum=1&pageSize=4`, {
    method: 'GET',
  });
};

export const getNftsOwnerInformationList: objectT = async (params: objectT) => {
  /* return request(`/center/information/getGuildsInformationList`, {
    method: 'GET',
  }); */
  return {
    code: 0,
    msg: '操作成功',
    data: [
      {
        id: 'cd24ODvQ',
        status: 1,
        statusText: '启用',
        createTime: '2022-05-17 11:18:13',
        createUser: 'xEImTJjX',
        createUserDept: '1',
        updateTime: '2022-05-17 11:18:13',
        updateUser: 'xEImTJjX',
        version: 3,
        title: 'MetaOne Analytics Tools',
        content:
          'MetaOne provides extensive gaming data analytics from games to gamers level. The insights reflect undisputed value for all stakeholders, with the infusion of AI in our predictive analysis.',
        subtitle: '',
        img: 'http://bucket-metaone.obs.ap-southeast-3.myhuaweicloud.com/assets/p9Gle95o.png',
        video: '',
        backageImg: '',
        serialNumber: 1,
        informationCategory: '12',
        layoutCategory: '11',
        releaseStatus: '3',
      },
      {
        id: 'DkSBwyZZ',
        status: 1,
        statusText: '启用',
        createTime: '2022-05-17 11:24:58',
        createUser: 'xEImTJjX',
        createUserDept: '1',
        updateTime: '2022-05-17 11:24:58',
        updateUser: 'xEImTJjX',
        version: 2,
        title: 'Metaone NFT Assets  Management',
        content:
          'The NFT Assets Management by MetaOne allows asset owners to lease their available NFTs on MetaOne platform even on different blockchain.Asset owners can define the lease rate and duration themselves for every NFT they wish to lease.Now asset owners can have a peace of mind leasing their NFT assets without transferring out from their wallet, thanks to MetaOne Smart Contract Vault Box that ensures all leasing and staking of NFT assets in high assurance mode',
        subtitle: '',
        img: 'http://bucket-metaone.obs.ap-southeast-3.myhuaweicloud.com/assets/l37nzIdo.png',
        video: '',
        backageImg: '',
        serialNumber: 1,
        informationCategory: '12',
        layoutCategory: '11',
        releaseStatus: '3',
      },
    ],
    count: 0,
    pageNo: 0,
    pages: 0,
  };
};
