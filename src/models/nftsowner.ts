import * as nftsOwnerService from '../services/nftsowner';
interface initialStateT {
  [propName: string]: any;
}

export default {
  namespace: 'nftsowners',
  state: {
    bannerData: {},
    informationList: {},
  },
  reducers: {
    setData(state: initialStateT, action: initialStateT) {
      const { payload = {} } = action;
      return {
        ...state,
        [payload.name]: payload.data || {},
      };
    },
  },
  effects: {
    *getNftsOwnerInfo(
      { payload, callback }: initialStateT,
      { call, put, all }: initialStateT,
    ) {
      const [banner, news, list]: [
        initialStateT,
        initialStateT,
        initialStateT,
      ] = yield all([
        call(nftsOwnerService.getNftsOwnerBanner, payload),
        call(nftsOwnerService.getNftsOwnerNews, payload),
        call(nftsOwnerService.getNftsOwnerInformationList, payload),
      ]);

      console.log(news, 'news');
      return { banner: banner, news: news, list: list };
    },
  },
};
