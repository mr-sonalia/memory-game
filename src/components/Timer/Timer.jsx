import { useReducer, useEffect, useState } from "react";
// import classes from "./Timer.module.scss";

const reducer = (_state, { type, data }) => {
  switch (type) {
    case "UPDATETIMER": {
      return data;
    }
    default: {
      return { hours: 0, mins: 0, secs: 0 };
    }
  }
};

const initialTimerValues = {
  hours: 0,
  mins: 0,
  secs: 0,
};

const Timer = (props) => {
  const [isLoading, setIsLoading] = useState(true);

  const [timer, dispatchTimer] = useReducer(reducer, initialTimerValues);

  const [worker, _setWorker] = useState(
    new Worker(new URL("../../workers/worker.timer.js", import.meta.url))
  );

  useEffect(() => {
    worker.postMessage(initialTimerValues);
    // dispatchTimer({ hours: timer.hours, mins: timer.mins, secs: timer.secs });
    setIsLoading(false);

    worker.onmessage = ({ data }) => {
      dispatchTimer({ type: "UPDATETIMER", data });
    };
  }, [props.loadNewGame]);

  return (
    <div className="tray__item">
			<span className="tray__label">Time</span>
      <h2 className="tray__value">
        {timer.mins}:{timer.secs}
      </h2>
    </div>
  );
};

export default Timer;
