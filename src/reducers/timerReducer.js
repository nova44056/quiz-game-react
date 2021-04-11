import { TIME_LIMIT } from "../utils/const";
const initialState = {
  second: 0,
};
const timerReducer = (state = initialState, action) => {
  switch (action.type) {
    case "INCREMENT_SECOND":
      return {
        ...state,
        second: (state.second + 1) % TIME_LIMIT,
      };
    case "RESET_SECOND":
      return {
        ...state,
        second: 0,
      };
    default:
      return state;
  }
};
export default timerReducer;
