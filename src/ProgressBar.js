import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { stopProgressBar } from "./actions/progressBarAction";

export default function ProgressBar() {
  const state = useSelector((state) => state.progressBar);
  const dispatch = useDispatch();

  const progressBar = useRef(null);
  var progressInterval = useRef(null);
  const DEFAULT_WIDTH = 0;
  const width = useRef(DEFAULT_WIDTH);
  var clock = useRef(null);
  const [clockStatus, toggleClockStatus] = useState(false);

  const resetProgressBar = () => {
    width.current = DEFAULT_WIDTH;
    clearInterval(progressInterval.current);
    progressInterval.current = null;
    progressBar.current.style.width = width.current + "%";
  };

  const resetClock = () => {
    clearInterval(clock.current);
    clock.current = null;
    toggleClockStatus(false);
  };

  useEffect(() => {
    function startProgressBar() {
      resetProgressBar();
      toggleClockStatus(true);
      progressInterval.current = setInterval(() => {
        if (width.current >= 100) {
          dispatch(stopProgressBar());
          resetProgressBar();
          resetClock();
        } else {
          width.current++;
          progressBar.current.style.width = width.current + "%";
        }
      }, 250);
    }
    if (state.status) {
      startProgressBar();
    }
  }, [state.status, dispatch]);

  useEffect(() => {
    const startTimer = () => {
      let seconds = 1;
      clock.current = setInterval(() => {
        console.log(seconds + " seconds has passed ...");
        seconds++;
      }, 1000);
    };
    if (clockStatus) {
      startTimer();
    }
  }, [clockStatus]);

  return (
    <>
      <div className="slide-progress-bar">
        <div ref={progressBar} className="progress-bar" id="progress-bar"></div>
      </div>
    </>
  );
}
