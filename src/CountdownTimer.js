import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { stopTimer } from "./actions/timerAction";

export default function CountdownTimer(props) {
  const state = useSelector((state) => state.timer);
  const dispatch = useDispatch();
  var timer = useRef(null);
  const [seconds, setSeconds] = useState(props.from);

  useEffect(() => {
    if (state.status) {
      timer.current = setInterval(() => {
        if (seconds <= 0) {
          dispatch(stopTimer());
        } else {
          setSeconds((prevState) => prevState - 1);
        }
      }, 1000);
    } else {
      setSeconds(props.from);
    }
    return () => {
      clearInterval(timer.current);
    };
  }, [state.status, seconds, dispatch, props.from]);
  return (
    <>
      <span>{seconds}</span>
    </>
  );
}
