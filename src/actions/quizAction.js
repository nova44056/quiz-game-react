export const markQuestionAsAnswered = () => {
  return {
    type: "ANSWERED",
  };
};
export const markQuestionAsUnanswered = () => {
  return {
    type: "UNANSWERED",
  };
};
export const incrementScore = () => {
  return {
    type: "INCREMENT_SCORE",
  };
};
