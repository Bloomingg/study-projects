export default {
  namespace: "test",
  state: {
    data: [
      { id: 1, name: "t1" },
      { id: 2, name: "t2" },
    ],
  },
  reducers: {
    addData(state, action) {
      // let temp = JSON.parse(JSON.stringify(state));
      // temp.data.push(action.payload);
      // return temp;
      return { ...state, data: [...state.data, action.payload] };
    },
  },
};
