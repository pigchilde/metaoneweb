import * as helpsService from '../services/helps';
interface initialStateT {
  [propName: string]: any;
}

export default {
  namespace: 'helps',
  state: {
    listDatas: {},
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
        const data: initialStateT = yield call(helpsService.getList, payload);
        return data;
      } catch (err) {
        return Promise.reject(err);
      }
    },
  },
};
