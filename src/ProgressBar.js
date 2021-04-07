import React, { useEffect, useRef, useState } from "react";

export default function ProgressBar(props) {
  const progressBar = useRef(null);
  var progressInterval = useRef(null);
  const width = useRef(0);

  const counter = useRef(0);

  useEffect(() => {
    if (props.status) {
      progressInterval.current = setInterval(() => {
        if (width.current <= 100) {
          width.current++;
          progressBar.current.style.width = width.current + "%";
        }
      }, 50);
    } else {
      width.current = 0;
      progressInterval.current = null;
    }
    return () => {
      clearInterval(progressInterval.current);
    };
  }, [props.status]);

  return (
    <>
      <div className="slide-progress-bar">
        <div ref={progressBar} className="progress-bar" id="progress-bar"></div>
      </div>
    </>
  );
}
