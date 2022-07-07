import * as nftAssetsService from '../services/nftAssets';
interface initialStateT {
  [propName: string]: any;
}
export default {
  namespace: 'nftAssets',
  state: {
    orderInfo: {},
  },
  reducers: {
    setData(state: initialStateT, action: initialStateT) {
      const { payload = {} } = action;
      return {
        ...state,
        ...payload,
      };
    },
  },
  effects: {
    *getNFTInfo(
      { payload, callback }: initialStateT,
      { call, put, select }: initialStateT,
    ) {
      try {
        const data: initialStateT = yield call(
          nftAssetsService.getNFTInfo,
          payload,
        );
        return data;
      } catch (err) {
        return Promise.reject(err);
      }
    },
    *getMyNFTList(
      { payload, callback }: initialStateT,
      { call, put, select }: initialStateT,
    ) {
      try {
        const data: initialStateT = yield call(
          nftAssetsService.getMyNFTList,
          payload,
        );
        return data;
      } catch (err) {
        return Promise.reject(err);
      }
    },
    *getMyLeasingNFTList(
      { payload, callback }: initialStateT,
      { call, put, select }: initialStateT,
    ) {
      try {
        const data: initialStateT = yield call(
          nftAssetsService.getMyLeasingNFTList,
          payload,
        );
        return data;
      } catch (err) {
        return Promise.reject(err);
      }
    },
    *leasePublish(
      { payload, callback }: initialStateT,
      { call, put, select }: initialStateT,
    ) {
      try {
        const data: initialStateT = yield call(
          nftAssetsService.leasePublish,
          payload,
        );
        return data;
      } catch (err) {
        return Promise.reject(err);
      }
    },
    *publishComplete(
      { payload, callback }: initialStateT,
      { call, put, select }: initialStateT,
    ) {
      try {
        const data: initialStateT = yield call(
          nftAssetsService.publishComplete,
          payload,
        );
        return data;
      } catch (err) {
        return Promise.reject(err);
      }
    },
    *publishFail(
      { payload, callback }: initialStateT,
      { call, put, select }: initialStateT,
    ) {
      try {
        const data: initialStateT = yield call(
          nftAssetsService.publishFail,
          payload,
        );
        return data;
      } catch (err) {
        return Promise.reject(err);
      }
    },
  },
};
