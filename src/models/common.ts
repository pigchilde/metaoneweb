import * as commonService from '../services/common';
interface initialStateT {
  [propName: string]: any;
}

export default {
  namespace: 'common',
  state: {
    socialMediaList: [],
    platformInfo: {},
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
    *getSocialMediaList(
      { payload, callback }: initialStateT,
      { call, put, select }: initialStateT,
    ) {
      try {
        const data: initialStateT = yield call(
          commonService.getSocialMediaList,
          payload,
        );
        yield put({
          type: 'setData',
          payload: {
            socialMediaList: data.data,
          },
        });
      } catch (err) {
        return Promise.reject(err);
      }
    },
    *getPlatformInfo(
      { payload, callback }: initialStateT,
      { call, put, select }: initialStateT,
    ) {
      try {
        const data: initialStateT = yield call(
          commonService.getPlatformInfo,
          payload,
        );
        yield put({
          type: 'setData',
          payload: {
            platformInfo: data.data,
          },
        });
      } catch (err) {
        return Promise.reject(err);
      }
    },
  },
};
