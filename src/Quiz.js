import React, { useEffect, useRef, useState } from "react";
import ProgressBar from "./ProgressBar";
import CountdownTimer from "./CountdownTimer";
import { TIME_LIMIT } from "./utils/const";

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
  const nextQuestion = () => setCurrentQuestion((prevState) => prevState + 1);

  //? currentQuestion
  useEffect(() => {
    let interval = null;
    if (currentQuestion + 1 < numberOfQuestions)
      interval = setTimeout(nextQuestion, TIME_LIMIT * 1000);
    return () => clearTimeout(interval);
  }, [currentQuestion]);

  const choiceClicked = (e) => {
    const answerKey =
      initialState.data[shuffledQuestions.current[currentQuestion]].answerKey;
    const element = e.target;
    if (element.innerHTML === answerKey) {
      console.log("Correct answer");
      element.style.backgroundColor = "#3863A0";
    } else {
      console.log("Wrong answer");
      element.style.backgroundColor = "#AF3031";
    }
    // disable other button click after user has chosen answer
    Array.from(e.target.parentNode.children).map(
      (button) => (button.disabled = true)
    );
    // TODO pause timer
    // TODO pause progress bar
    // TODO show result

    // TODO reset second
    // TODO reset progress bar
    //? Reference: http://jsfiddle.net/leaverou/xK6sa/
    // document.querySelector(".fill-animation").style.webkitAnimation = "none";
    // setTimeout(function () {
    //   document.querySelector(
    //     ".fill-animation"
    //   ).style.webkitAnimation = `fill ${TIME_LIMIT}s linear infinite`;
    // }, 10);
    // TODO increment question
  };

  return (
    <>
      <div>
        <ProgressBar />
      </div>
      <div className="countdown-timer-wrapper">
        <CountdownTimer />
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
        <div className="quiz-answers-wrapper">
          {initialState.data[
            shuffledQuestions.current[currentQuestion]
          ]?.answers.map((answer, i) => (
            <button
              onClick={(e) => choiceClicked(e)}
              className="quiz-answer"
              key={`Q${currentQuestion}C${i}`}
            >
              {answer}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
