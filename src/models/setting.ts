import * as registerService from '../services/setting';
interface initialStateT {
  [propName: string]: any;
}

export default {
  namespace: 'setting',
  state: {},
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
    *putInfo(
      { payload, callback }: initialStateT,
      { call, put }: initialStateT,
    ) {
      const data: initialStateT = yield call(registerService.putInfo, payload);
      return data;
    },
    *getInfo(
      { payload, callback }: initialStateT,
      { call, put }: initialStateT,
    ) {
      const data: initialStateT = yield call(registerService.getInfo, payload);
      return data;
    },
  },
};
