const initialState = {
  status: false,
};
const timerReducer = (state = initialState, action) => {
  switch (action.type) {
    case "START_TIMER":
      return {
        ...state,
        status: true,
      };
    case "STOP_TIMER":
      return {
        ...state,
        status: false,
      };
    default:
      return state;
  }
};
export default timerReducer;
