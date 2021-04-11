const initialState = {
  width: 0,
};
const progressBarReducer = (state = initialState, action) => {
  switch (action.type) {
    case "INCREMENT_WIDTH":
      return {
        ...state,
        width: (state.width + 1) % 101,
      };
    case "RESET_WIDTH":
      return {
        ...state,
        width: 0,
      };
    default:
      return state;
  }
};
export default progressBarReducer;
