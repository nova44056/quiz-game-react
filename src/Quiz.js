import React, { useEffect, useRef, useState } from "react";
import ProgressBar from "./ProgressBar";
import CountdownTimer from "./CountdownTimer";
import { useDispatch } from "react-redux";

import { startTimer, stopTimer } from "./actions/timerAction";

// mock data
// TODO convert it into a redux state afer everything works
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
};
// https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}
export default function Quiz() {
  const numberOfQuestions = 5;
  const totalQuestions = initialState.data.length;
  const shuffledQuestions = useRef(
    shuffle(Array.from({ length: totalQuestions }, (_, index) => index)).splice(
      totalQuestions - numberOfQuestions
    )
  );
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const dispatch = useDispatch();

  const [status, setStatus] = useState(true);
  const timeOut = useRef(null);

  const DEFAULT_COUTNDOWN_TIME = 10;

  useEffect(() => {
    dispatch(startTimer());
  }, [dispatch, currentQuestion]);

  // TODO refactor this block of code
  // ! bad readability
  useEffect(() => {
    timeOut.current = setTimeout(() => {
      setStatus(false);
      dispatch(stopTimer());
      setStatus(true);
      if (currentQuestion + 1 < numberOfQuestions) {
        setCurrentQuestion((prevState) => prevState + 1);
      } else {
        clearInterval(timeOut.current);
        setStatus(false);

        // end of game logic here
        console.log("End quiz game");
      }
    }, DEFAULT_COUTNDOWN_TIME * 1000);
  }, [currentQuestion, dispatch]);

  return (
    <>
      <div>
        <ProgressBar interval={DEFAULT_COUTNDOWN_TIME} status={status} />
      </div>
      <div className="countdown-timer-wrapper">
        <CountdownTimer interval={DEFAULT_COUTNDOWN_TIME} />
        <label htmlFor="countdown-timer">&nbsp;seconds</label>
      </div>
      <div className="quiz-content">
        <span className="quiz-question">
          {`${currentQuestion + 1} .`}
          {
            initialState.data[shuffledQuestions.current[currentQuestion]]
              ?.question
          }
        </span>
        <ul className="quiz-answers-wrapper">
          {initialState.data[
            shuffledQuestions.current[currentQuestion]
          ].answers.map((answer, i) => (
            <li className="quiz-answer" key={`Q${currentQuestion}C${i}`}>
              {answer}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
