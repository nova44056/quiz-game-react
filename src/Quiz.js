import React, { useEffect, useRef, useState } from "react";
import ProgressBar from "./ProgressBar";
import CountdownTimer from "./CountdownTimer";
import Result from "./Result";
import { TIME_LIMIT } from "./utils/const";
import {
  pauseTimer,
  resumeTimer,
  setCheckpoint,
  resetSecond,
} from "./actions/timerAction";
import {
  markQuestionAsAnswered,
  markQuestionAsUnanswered,
  incrementScore,
} from "./actions/quizAction";
import { useDispatch, useSelector } from "react-redux";

//? Reference: https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
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
  const dispatch = useDispatch();

  const quizState = useSelector((state) => state.quiz);
  const timerState = useSelector((state) => state.timer);

  const GAME_QUESTION_COUNT = 5;

  //? generate an array with a value of 1 to quizState.data.length
  //? then apply the shuffle algorithm and shorten the length of shuffled array to GAME_QUESTION_COUNT length
  const shuffledQuestions = useRef(
    shuffle(
      Array.from({ length: quizState.data.length }, (_, index) => index)
    ).splice(quizState.data.length - GAME_QUESTION_COUNT)
  );

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const nextQuestion = () => setCurrentQuestion((prevState) => prevState + 1);

  const answerKey =
    quizState.data[shuffledQuestions.current[currentQuestion]].answerKey;

  const [gameIsFinished, setGameIsFinished] = useState(false);

  //? currentQuestion
  useEffect(() => {
    if (timerState.pause) return;
    let interval = null;
    if (currentQuestion + 1 < GAME_QUESTION_COUNT)
      interval = setTimeout(
        nextQuestion,
        (TIME_LIMIT - timerState.checkpoint) * 1000
      );
    return () => clearTimeout(interval);
  }, [currentQuestion, timerState.pause, timerState.checkpoint]);

  //? check for unanswered questions
  useEffect(() => {
    const timeout = setTimeout(
      () => dispatch(markQuestionAsUnanswered()),
      TIME_LIMIT * 1000
    );
    const eventHandler = (_e) => {
      clearInterval(timeout);
    };
    window.addEventListener("click", eventHandler);
    return () => window.removeEventListener("click", eventHandler);
  }, [currentQuestion, dispatch]);

  //? end of game
  useEffect(() => {
    if (
      quizState.questionsAnswered + quizState.questionsUnanswered ===
      GAME_QUESTION_COUNT
    ) {
      document.querySelector(".progress-bar-fill").style.animationPlayState =
        "paused";
      setTimeout(() => setGameIsFinished(true), 2000);
    }
  }, [
    quizState.questionsAnswered,
    quizState.questionsUnanswered,
    gameIsFinished,
  ]);

  //? user choose an answer
  const choiceClicked = (e) => {
    dispatch(markQuestionAsAnswered());
    const element = e.target;
    const answerStatusText = document.querySelector(".quiz-answer-status");
    // check if answer is correct and show result
    if (element.innerHTML === answerKey) {
      answerStatusText.parentElement.classList.add("correct-answer");
      answerStatusText.innerHTML = "Correct answer";
      element.style.backgroundColor = "#3863A0";
      dispatch(incrementScore());
    } else {
      answerStatusText.parentElement.classList.add("wrong-answer");
      answerStatusText.innerHTML = "Wrong answer";
      element.style.backgroundColor = "#AF3031";
    }
    // disable other button click after user has chosen answer
    Array.from(e.target.parentNode.children).map(
      (button) => (button.disabled = true)
    );
    // pause timer
    dispatch(pauseTimer());
    // pause progress bar
    document.querySelector(".fill-animation").style.animationPlayState =
      "paused";
    // pause current question increment process
    dispatch(setCheckpoint(timerState.second));
    //TODO show result
    // move on to the next question after 2 seconds
    if (
      quizState.questionsAnswered + quizState.questionsUnanswered <
      GAME_QUESTION_COUNT - 1
    ) {
      setTimeout(() => {
        // reset answer status
        answerStatusText.innerHTML = "";
        answerStatusText.parentElement.webkitAnimation = "none";
        if (answerStatusText.parentElement.classList.contains("correct-answer"))
          answerStatusText.parentElement.classList.remove("correct-answer");
        else answerStatusText.parentElement.classList.remove("wrong-answer");
        // reset checkpoint
        dispatch(setCheckpoint(0));
        // reset second
        dispatch(resetSecond());
        // increment question
        if (currentQuestion + 1 < GAME_QUESTION_COUNT) nextQuestion();
        // make timer resume running
        dispatch(resumeTimer());
        // restart progress bar
        // ? Reference: http://jsfiddle.net/leaverou/xK6sa/
        document.querySelector(".fill-animation").style.webkitAnimation =
          "none";
        setTimeout(function () {
          document.querySelector(
            ".fill-animation"
          ).style.webkitAnimation = `fill ${TIME_LIMIT}s linear infinite`;
        }, 10);
      }, 1 * 1000);
    }
  };

  return (
    <>
      <div className="quiz-header-wrapper">
        <div className="quiz-question-count-wrapper">
          <span>Unanswered Question: {quizState.questionsUnanswered}</span>
          <span>Answered Question: {quizState.questionsAnswered}</span>
        </div>
        <div className="quiz-answer-status-wrapper">
          <span className="quiz-answer-status" />
        </div>
        <div className="quiz-score-wrapper">
          <span>Score: {quizState.score}</span>
        </div>
      </div>
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
          {quizState.data[shuffledQuestions.current[currentQuestion]]?.question}
        </span>
        <div className="quiz-answers-wrapper">
          {quizState.data[
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
      {gameIsFinished && <Result />}
    </>
  );
}
