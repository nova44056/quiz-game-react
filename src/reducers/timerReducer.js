import { TIME_LIMIT } from "../utils/const";
const initialState = {
  second: 0,
  pause: false,
  checkpoint: 0,
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
    case "PAUSE_TIMER":
      return {
        ...state,
        pause: true,
      };
    case "RESUME_TIMER":
      console.log(state.pause);
      return {
        ...state,
        pause: false,
      };
    case "SET_CHECKPOINT":
      return {
        ...state,
        checkpoint: action.payload,
      };
    default:
      return state;
  }
};
export default timerReducer;
