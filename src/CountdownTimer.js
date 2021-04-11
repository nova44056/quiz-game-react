import React, { useEffect } from "react";
import { TIME_LIMIT, DELAY } from "./utils/const";
import { incrementSecond } from "./actions/timerAction";
import { useDispatch, useSelector } from "react-redux";

export default function CountdownTimer() {
  const second = useSelector((state) => state.timer.second);
  const dispatch = useDispatch();
  useEffect(() => {
    // effect
    const timer = setInterval(() => dispatch(incrementSecond()), 1000);
    // clean up
    return () => clearInterval(timer);
  }, [second, dispatch]);
  return (
    <>
      <span>{TIME_LIMIT - second}</span>
    </>
  );
}
