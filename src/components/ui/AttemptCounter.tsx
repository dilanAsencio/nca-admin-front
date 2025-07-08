import React from "react";
import { AttemptCounterProps } from "@/types/componentsShared";

const AttemptCounter: React.FC<AttemptCounterProps> = ({ attempts, maxAttempts = 3 }) => (
  <div aria-live="polite" className="flex gap-1 items-center">
    {Array.from({ length: maxAttempts }).map((_, i) => (
      <span
        key={i}
        className={`w-3 h-3 rounded-full ${i < attempts ? "bg-red-500" : "bg-gray-300"}`}
        aria-label={i < attempts ? "Intento fallido" : "Intento disponible"}
      />
    ))}
    <span className="ml-2 text-sm">{`${attempts}/${maxAttempts}`}</span>
  </div>
);

export default AttemptCounter;