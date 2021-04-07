const initialState = {
  status: false,
  progressCounter: 0,
};
const progressBarReducer = (state = initialState, action) => {
  switch (action.type) {
    case "START_PROGRESSBAR":
      return {
        ...state,
        status: true,
      };
    case "STOP_PROGRESSBAR":
      return {
        ...state,
        status: false,
      };
    case "INCREMENT_PROGRESS_COUNTER":
      return {
        ...state,
        progressCounter: state.progressCounter + 1,
      };
    default:
      return state;
  }
};
export default progressBarReducer;
