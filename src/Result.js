import React from "react";

export default function Result() {
  //TODO style result ui
  //TODO display result data
  return (
    <div className="result-wrapper">
      <div className="result-data">
        <h1>Result</h1>
        <span>Score: </span>
        <span>Questions Answered: </span>
        <span>Questions Skipped: </span>
        <button onClick={() => window.location.reload()}>Restart</button>
      </div>
    </div>
  );
}
