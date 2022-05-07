import * as indexService from '../services/index';
interface initialStateT {
  [propName: string]: any;
}

export default {
  namespace: 'index',
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
    *getIndexInfo(
      { payload, callback }: initialStateT,
      { call, put, all }: initialStateT,
    ) {
      const [
        banner,
        videoList,
        imgList,
        informationList,
        adviserList,
        managmentList,
        advisorList,
      ]: [
        initialStateT,
        initialStateT,
        initialStateT,
        initialStateT,
        initialStateT,
        initialStateT,
        initialStateT,
      ] = yield all([
        call(indexService.getHomeBanner, payload),
        call(indexService.getHomeVideoAutoList, payload),
        call(indexService.getHomeImgAutoList, payload),
        call(indexService.getHomeInformationList, payload),
        call(indexService.getInvestmentAdviserList, payload),
        call(indexService.getMetaoneManagmentList, payload),
        call(indexService.getAdvisorList, payload),
      ]);
      return {
        banner: banner,
        videoList: videoList,
        imgList: imgList,
        informationList: informationList,
        adviserList: adviserList,
        managmentList: managmentList,
        advisorList: advisorList,
      };
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
