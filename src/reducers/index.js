import { combineReducers } from "redux";
import progressBarReducer from "./progessBarReducer";
import timerReducer from "./timerReducer";

const allReducers = combineReducers({
  progressBar: progressBarReducer,
  timer: timerReducer,
});

export default allReducers;
