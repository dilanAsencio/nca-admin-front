import { CountdownTimerProps } from "@/app/core/interfaces/shared-interfaces";
import React, { useEffect, useState } from "react";

const CountdownTimer: React.FC<CountdownTimerProps> = ({
  initialSeconds,
  onFinish,
}) => {
  const [seconds, setSeconds] = useState(initialSeconds);

  useEffect(() => {
    if (seconds <= 0) {
      onFinish?.();
      return;
    }
    const interval = setInterval(() => {
      setSeconds((s) => s - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [seconds, onFinish]);

  const min = Math.floor(seconds / 60)
    .toString()
    .padStart(2, "0");
  const secs = (seconds % 60).toString().padStart(2, "0");

  return (
    <p className="count-timer font-normal">
      {`3 intentos fallidos. debe esperar ${min}:${secs.toString().padStart(2, "0")}}min:sc para volver intentarlo`}
    </p>
  );
};

export default CountdownTimer;
