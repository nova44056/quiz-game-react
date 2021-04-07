import Quiz from "./Quiz";
import ProgressBar from "./ProgressBar";
import "./style.css";
import { startProgressBar } from "./actions/progressBarAction";
import { useDispatch } from "react-redux";
import CountdownTimer from "./CountdownTimer";

function App() {
  const dispatch = useDispatch();
  return (
    <div className="App">
      <Quiz />
      {/* <ProgressBar />
      <button onClick={() => dispatch(startProgressBar())}>
        Start progress bar
      </button> */}
    </div>
  );
}

export default App;
