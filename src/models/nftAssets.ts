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
    *getNFTList(
      { payload, callback }: initialStateT,
      { call, put, select }: initialStateT,
    ) {
      try {
        const data: initialStateT = yield call(
          nftAssetsService.getNFTList,
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
      } catch (err) {
        return Promise.reject(err);
      }
    },
  },
};
