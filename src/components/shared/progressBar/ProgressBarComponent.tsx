"use client";

import React from "react";
import { motion } from "framer-motion";

interface ProgressBarProps {
  /** Valor actual del progreso (0–100) */
  value: number;
  /** Alto de la barra */
  height?: string;
  /** Color del relleno */
  color?: string;
  /** Mostrar porcentaje con decimales */
  showDecimals?: boolean;
  /** Mostrar animación de transición */
  animated?: boolean;
  /** Clases extra opcionales */
  className?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  height = "8px",
  color = "linear-gradient(90deg, #F0813C 9.83%, #EB3751 48.88%, #610CF4 88.69%)",
  showDecimals = false,
  animated = true,
  className = "",
}) => {
  const progress = Math.min(100, Math.max(0, value ?? 0));

  return (
    <div className={`relative w-full ${className}`}>
      {/* Track */}
      <div
        className="w-full bg-gray-200 rounded-full overflow-hidden"
        style={{ height }}
      >
        {/* Fill */}
        <motion.div
          className="h-full rounded-full"
          style={{
            background: color,
            width: `${progress}%`,
          }}
          animate={
            animated
              ? { width: `${progress}%` }
              : undefined
          }
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
      </div>

      {/* Label flotante */}
      <motion.div
        className="absolute shadow-[0_16px_32px_-4px_#0000001c] top-[-16px] text-[1rem] text-center font-bold text-gray-600 p-[0.5rem] rounded-[3.625rem] bg-[#ffffff] whitespace-nowrap"
        animate={{
          left: `calc(${progress}% - 1.5rem)`, // mantiene el label sobre la punta
        }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {showDecimals ? progress.toFixed(1) : Math.round(progress)}%
      </motion.div>
    </div>
  );
};

export default ProgressBar;
