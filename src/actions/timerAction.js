export const incrementSecond = () => {
  return {
    type: "INCREMENT_SECOND",
  };
};
export const resetSecond = () => {
  return {
    type: "RESET_SECOND",
  };
};
export const pauseTimer = () => {
  return {
    type: "PAUSE_TIMER",
  };
};
export const resumeTimer = () => {
  return {
    type: "RESUME_TIMER",
  };
};
export const setCheckpoint = (newCheckpoint) => {
  return {
    type: "SET_CHECKPOINT",
    payload: newCheckpoint,
  };
};
export const getCheckpoint = () => {
  return {
    type: "GET_CHECKPOINT",
  };
};
