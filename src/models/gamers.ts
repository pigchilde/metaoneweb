import * as gamersService from '../services/gamers';
interface initialStateT {
  [propName: string]: any;
}

export default {
  namespace: 'gamers',
  state: {
    bannerData: {},
    informationList: {},
  },
  reducers: {
    setData(state: initialStateT, action: initialStateT) {
      console.log(state, 'state');
      const { payload = {} } = action;
      return {
        ...state,
        [payload.name]: payload.data || {},
      };
    },
  },
  effects: {
    *getGamersInfo(
      { payload, callback }: initialStateT,
      { call, put, all }: initialStateT,
    ) {
      const [banner, list]: [initialStateT, initialStateT] = yield all([
        call(gamersService.getGamersBanner, payload),
        call(gamersService.getGamersInformationList, payload),
      ]);
      return { banner: banner, list: list };
    },
    /* *getGamersBanner(
      { payload, callback }: initialStateT,
      { call, put }: initialStateT,
    ) {
      const data: initialStateT = yield call(
        gamersService.getGamersBanner,
        payload,
      );
      return data;
    },
    *getGamersInformationList(
      { payload, callback }: initialStateT,
      { call, put }: initialStateT,
    ) {
      const data: initialStateT = yield call(
        gamersService.getGamersInformationList,
        payload,
      );
      return data;
    }, */
  },
};
