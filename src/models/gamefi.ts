import * as gameFiService from '../services/gamefi';
interface initialStateT {
  [propName: string]: any;
}
export default {
  namespace: 'gamefi',
  state: {
    listDatas: {},
    queryFilter: {},
    hotlistDatas: {},
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
