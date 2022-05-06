import * as gameFiService from '../services/gamefi';
interface initialStateT {
  [propName: string]: any;
}
export default {
  namespace: 'gamefi',
  state: {
    listDatas: {},
    listFilter: {},
    hotlistDatas: {},
    hotFilter: { gamePopularCategory: 'LIKE' },
  },
  reducers: {
    setData(state: initialStateT, action: initialStateT) {
      const { payload = {} } = action;
      return {
        ...state,
        [payload.name]: payload.data || {},
      };
    },
    setListFilter(state: initialStateT, action: initialStateT) {
      const { payload = {} } = action;
      return { ...state };
    },
    setHotFilter(state: initialStateT, action: initialStateT) {
      const { payload = {} } = action;
      const hotFilter = { gamePopularCategory: payload };
      return {
        ...state,
        hotFilter,
      };
    },
  },
  effects: {
    *getHotList(
      { payload, callback }: initialStateT,
      { call, put, select }: initialStateT,
    ) {
      try {
        const filter: initialStateT = yield select(
          (state: initialStateT) => state.gamefi.hotFilter,
        );
        const data: initialStateT = yield call(
          gameFiService.getHotList,
          filter,
        );
        return data;
      } catch (err) {
        return Promise.reject(err);
      }
    },
    *getList(
      { payload, callback }: initialStateT,
      { call, put }: initialStateT,
    ) {
      try {
        const data: initialStateT = yield call(gameFiService.getList, payload);
        return data;
      } catch (err) {
        return Promise.reject(err);
      }
    },
    *getData(
      { payload, callback }: initialStateT,
      { call, put }: initialStateT,
    ) {
      const data: initialStateT = yield call(gameFiService.getData, payload);
      return data;
    },
  },
};