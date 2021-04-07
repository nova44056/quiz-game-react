export const startProgressBar = () => {
  return {
    type: "START_PROGRESSBAR",
  };
};

export const stopProgressBar = () => {
  return {
    type: "STOP_PROGRESSBAR",
  };
};

export const increment = () => {
  return {
    type: "INCREMENT_PROGRESS_COUNTER",
  };
};
