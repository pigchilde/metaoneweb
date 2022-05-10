import * as loginService from '../services/login';
interface initialStateT {
  [propName: string]: any;
}
export default {
  namespace: 'login',
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
    *login(
      { payload, callback }: initialStateT,
      { call, put, select }: initialStateT,
    ) {
      try {
        const data: initialStateT = yield call(loginService.login, payload);
        return data;
      } catch (err) {
        return Promise.reject(err);
      }
    },
  },
};
