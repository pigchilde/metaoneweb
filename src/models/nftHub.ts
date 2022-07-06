import * as nftHubService from '../services/nftAssets';

interface initialStateT {
  [propName: string]: any;
}
export default {
  namespace: 'nftHub',
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
    *getNFTList(
      { payload, callback }: initialStateT,
      { call, put, select }: initialStateT,
    ) {
      try {
        const data: initialStateT = yield call(
          nftHubService.getNFTList,
          payload,
        );
        yield put({
          type: 'setData',
          payload: {
            nftList: data.data,
          },
        });
      } catch (err) {
        return Promise.reject(err);
      }
    },
  },
};
