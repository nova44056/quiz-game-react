import React, { useEffect, useRef, useState } from "react";
import ProgressBar from "./ProgressBar";
import "./style.css";

function App() {
  const [state, setState] = useState(false);

  useEffect(() => {
    console.log("State is updating ...");
  }, [state]);
  return (
    <div className="App">
      <button>Start</button>
      <button onClick={() => setState((prevState) => !prevState)}>
        Toggle state
      </button>
      <ProgressBar state={state} />
    </div>
  );
}

export default App;
