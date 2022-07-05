interface initialStateT {
  [propName: string]: any;
}
export default {
  namespace: 'nftHub',
  state: {
    account: '',
    contract: null,
    orderInfo: {},
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
  effects: {},
};
