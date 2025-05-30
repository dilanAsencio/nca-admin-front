import React, { useState } from "react";
import CountdownTimer from "@/components/ui/CountdownTimer";
import AttemptCounter from "@/components/ui/AttemptCounter";

interface AccountBlockedAlertProps {
  remainingSeconds: number;
  currentAttempts: number;
  maxAttempts: number;
  onUnblock?: () => void;
  variant?: "warning" | "error" | "info";
  showAttempts?: boolean;
}
const AccountBlockedAlert: React.FC<AccountBlockedAlertProps> = ({
  remainingSeconds,
  currentAttempts,
  maxAttempts,
  showAttempts,
  onUnblock,
}) => {
  const [show, setShow] = useState(false);
  return (
    <div
      className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-2 rounded relative"
      role="alert"
    >
      {show && (
        <>
          <strong>Cuenta bloqueada temporalmente.</strong>
          <div className="mt-2">
            Intenta nuevamente en{" "}
            <CountdownTimer
              initialSeconds={remainingSeconds}
              onFinish={() => setShow(false)}
            />
          </div>
        </>
      )}
      <div className="mt-2">
        {showAttempts && (
          <AttemptCounter
            attempts={currentAttempts}
            maxAttempts={maxAttempts}
          />
        )}
      </div>
    </div>
  );
};

export default AccountBlockedAlert;
