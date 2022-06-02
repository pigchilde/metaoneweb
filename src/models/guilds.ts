import * as guildsService from '../services/guilds';
interface initialStateT {
  [propName: string]: any;
}

export default {
  namespace: 'guilds',
  state: {
    bannerData: {},
    informationList: {},
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
    *getGuildsInfo(
      { payload, callback }: initialStateT,
      { call, put, all }: initialStateT,
    ) {
      const [banner, list]: [initialStateT, initialStateT] = yield all([
        call(guildsService.getGuildsBanner, payload),
        call(guildsService.getGuildsInformationList, payload),
      ]);
      return { banner: banner, list: list };
    },
    *getGuildRoleInfo(
      { payload, callback }: initialStateT,
      { call, put, all }: initialStateT,
    ) {
      const data: initialStateT = yield call(
        guildsService.getGuildRoleInfo,
        payload,
      );
      return data;
      // const [banner, list]: [initialStateT, initialStateT] = yield all([
      //   call(guildsService.getGuildsBanner, payload),
      //   call(guildsService.getGuildsInformationList, payload),
      // ]);
      // return { banner: banner, list: list };
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
