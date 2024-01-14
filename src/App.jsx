import { useRef, useState } from "react";
import "./App.css";

// ? -------------------------------------------------------------- helper functions
const padStart = (time) => {
  return time.toString().padStart(2, "0");
};

// ! -------------------------------------------------------------- App
export default function App() {
  // ? Hooks / states
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [title, setTitle] = useState("Let the count-down begin!");
  const [isRunning, setIsRunning] = useState(false);
  let intervalRef = useRef(null);

  // ? variables
  const minutes = padStart(Math.floor(timeLeft / 60));
  const seconds = padStart(timeLeft - minutes * 60);

  // ? -------------------------------------------------------------- functions
  // * ------------------------------------------ time start handler
  const handleStart = () => {
    if (intervalRef.current !== null) return;

    setTitle("Here we go again😍!!");
    setIsRunning(true);

    intervalRef.current = setInterval(() => {
      setTimeLeft((timeLeft) => {
        if (timeLeft > 0) return timeLeft - 1;

        handleReset();

        return 0;
      });
    }, 1000);
  };

  // * ------------------------------------------ time stop handler
  const handleStop = () => {
    if (intervalRef.current === null) return;

    clearInterval(intervalRef.current);
    setTitle("you are doing great😁!");
    intervalRef.current = null;
    setIsRunning(false);
  };

  // * ------------------------------------------ time reset handler
  const handleReset = () => {
    clearInterval(intervalRef.current);
    setTitle("Let the count-down begin!");
    setTimeLeft(25 * 60);
    intervalRef.current = null;
    setIsRunning(false);
  };

  // ! -------------------------------------------------------------- render
  return (
    <div className="app">
      <h2>{title}</h2>

      <div className="timer">
        <span>{minutes}</span>
        <span>:</span>
        <span>{seconds}</span>
      </div>

      <div className="buttons">
        {!isRunning && <button onClick={handleStart}>Start</button>}
        {isRunning && <button onClick={handleStop}>Stop</button>}
        <button onClick={handleReset}>Reset</button>
      </div>
    </div>
  );
}
