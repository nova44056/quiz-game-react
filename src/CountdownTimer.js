import React, { useEffect } from "react";
import { TIME_LIMIT } from "./utils/const";
import { incrementSecond } from "./actions/timerAction";
import { useDispatch, useSelector } from "react-redux";

export default function CountdownTimer() {
  const second = useSelector((state) => state.timer.second);
  const pause = useSelector((state) => state.timer.pause);
  const dispatch = useDispatch();
  useEffect(() => {
    if (pause) return;
    // effect
    const timer = setInterval(() => dispatch(incrementSecond()), 1000);
    // clean up
    return () => clearInterval(timer);
  }, [second, pause, dispatch]);
  return (
    <>
      <span>{TIME_LIMIT - second}</span>
    </>
  );
}
