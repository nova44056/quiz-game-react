import { combineReducers } from "redux";
import progressBarReducer from "./progessBarReducer";

const allReducers = combineReducers({
  progressBar: progressBarReducer,
});

export default allReducers;
