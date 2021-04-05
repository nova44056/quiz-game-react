import ProgressBar from "./ProgressBar";
import { startProgressBar } from "./actions/progressBarAction";
import "./style.css";
import { useDispatch } from "react-redux";

function App() {
  const dispatch = useDispatch();
  return (
    <div className="App">
      <button onClick={() => dispatch(startProgressBar())}>Start</button>
      <ProgressBar />
    </div>
  );
}

export default App;
