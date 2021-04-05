const initialState = {
  status: false,
};
const progressBarReducer = (state = initialState, action) => {
  switch (action.type) {
    case "START":
      return {
        ...state,
        status: true,
      };
    case "STOP":
      return {
        ...state,
        status: false,
      };
    default:
      return state;
  }
};
export default progressBarReducer;
