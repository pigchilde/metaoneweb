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
  },
};
