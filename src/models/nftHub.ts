interface initialStateT {
  [propName: string]: any;
}
export default {
  namespace: 'nftHub',
  state: {
    contract: null,
    account: '',
    orderInfo: null,
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
