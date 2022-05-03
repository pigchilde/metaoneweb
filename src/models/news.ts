import * as newsService from '../services/news';
interface initialStateT {
  [propName: string]: any;
}

export default {
  namespace: 'news',
  state: {
    listDatas: {},
    tabValue: '1',
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
      const data: initialStateT = yield call(newsService.getList, payload);
      return data;
    },
  },
};
