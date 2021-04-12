import { combineReducers } from "redux";
import quizReducer from "./quizReducer";
import timerReducer from "./timerReducer";

const allReducers = combineReducers({
  timer: timerReducer,
  quiz: quizReducer,
});

export default allReducers;
