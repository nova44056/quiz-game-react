import { combineReducers } from "redux";
import timerReducer from "./timerReducer";

const allReducers = combineReducers({
  timer: timerReducer,
});

export default allReducers;
