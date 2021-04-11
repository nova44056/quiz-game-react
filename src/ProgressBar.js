import React, { useEffect } from "react";
import { TIME_LIMIT } from "./utils/const";

export default function ProgressBar() {
  // ? progress bar
  useEffect(() => {
    document.querySelector(
      ".fill-animation"
    ).style.animationDuration = `${TIME_LIMIT}s`;
    document.querySelector(".fill-animation").style.animationIterationCount =
      "infinite";
  }, []);

  return (
    <>
      <div className="progress-bar">
        <div className="progress-bar-fill fill-animation" />
      </div>
    </>
  );
}
