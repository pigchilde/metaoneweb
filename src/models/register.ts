import * as registerService from '../services/register';
interface initialStateT {
  [propName: string]: any;
}

export default {
  namespace: 'register',
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
    *postData(
      { payload, callback }: initialStateT,
      { call, put }: initialStateT,
    ) {
      const data: initialStateT = yield call(registerService.postData, payload);
      return data;
    },
    *postEmial(
      { payload, callback }: initialStateT,
      { call, put }: initialStateT,
    ) {
      const data: initialStateT = yield call(
        registerService.postEmial,
        payload,
      );
      return data;
    },
    *postCode(
      { payload, callback }: initialStateT,
      { call, put }: initialStateT,
    ) {
      const data: initialStateT = yield call(registerService.postCode, payload);
      return data;
    },
    *getCuntry(
      { payload, callback }: initialStateT,
      { call, put }: initialStateT,
    ) {
      const data: initialStateT = yield call(
        registerService.getCuntry,
        payload,
      );
      return data;
    },
    *getDic(
      { payload, callback }: initialStateT,
      { call, put }: initialStateT,
    ) {
      const data: initialStateT = yield call(registerService.getDic, payload);
      return data;
    },
  },
};
