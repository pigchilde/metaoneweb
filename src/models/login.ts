import * as loginService from '../services/login';
interface initialStateT {
  [propName: string]: any;
}
export default {
  namespace: 'login',
  state: {
    userInfo: {},
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
    *getUserInfo(
      { payload, callback }: initialStateT,
      { call, put, select }: initialStateT,
    ) {
      try {
        const data: initialStateT = yield call(
          loginService.getUserInfo,
          payload,
        );
        yield put({
          type: 'setData',
          payload: {
            userInfo: data.data,
          },
        });
      } catch (err) {
        return Promise.reject(err);
      }
    },
    *logout(
      { payload, callback }: initialStateT,
      { call, put, select }: initialStateT,
    ) {
      try {
        const data: initialStateT = yield call(loginService.logout);
        if (!data.code) {
          // 登出成功
          yield put({
            type: 'setData',
            payload: {
              userInfo: {},
            },
          });
        }
        return data;
      } catch (err) {
        return Promise.reject(err);
      }
    },
  },
};
