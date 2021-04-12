const initialState = {
  data: [
    {
      question:
        "If soccer is called football in England, what is American football called in England?",
      answers: ["American football", "Combball", "Handball", "Touchdown"],
      answerKey: "American football",
    },
    {
      question: "What is the largest country in the world?",
      answers: ["Russia", "Canada", "China", "United States"],
      answerKey: "Russia",
    },
    {
      question:
        "An organic compound is considered an alcohol if it has what functional group?",
      answers: ["Hydroxyl", "Carbonyl", "Alkyl", "Aldehyde"],
      answerKey: "Hydroxyl",
    },
    {
      question: "What is the 100th digit of Pi?",
      answers: ["9", "4", "7", "2"],
      answerKey: "9",
    },
    {
      question: "A doctor with a PhD is a doctor of what?",
      answers: ["Philosophy", "Psychology", "Phrenology", "Physical Therapy"],
      answerKey: "Philosophy",
    },
    {
      question: "What year did World War I begin?",
      answers: ["1914", "1905", "1919", "1925"],
      answerKey: "1914",
    },
  ],
  questionsAnswered: 0,
  questionsUnanswered: 0,
  score: 0,
};
const quizReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ANSWERED":
      return {
        ...state,
        questionsAnswered: state.questionsAnswered + 1,
      };
    case "UNANSWERED":
      return {
        ...state,
        questionsUnanswered: state.questionsUnanswered + 1,
      };
    case "INCREMENT_SCORE":
      return {
        ...state,
        score: state.score + 1,
      };
    default:
      return state;
  }
};
export default quizReducer;
