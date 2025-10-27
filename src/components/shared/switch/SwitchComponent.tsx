"use client";

import React from "react";
import { motion } from "framer-motion";

interface SwitchComponentProps {
  /** Estado actual del switch */
  checked: boolean;
  /** Función que se ejecuta al cambiar */
  onChange: (checked: boolean) => void;
  /** Texto opcional a mostrar */
  label?: string;
  /** Clases extra */
  className?: string;
}

const SwitchComponent: React.FC<SwitchComponentProps> = ({
  checked,
  onChange,
  label,
  className = "",
}) => {
  const inactiveColor = "#FEDADD";
  const activeColor = "#FC4554";
  return (
    <div
      className={`flex items-center gap-3 cursor-pointer select-none ${className}`}
      onClick={() => onChange(!checked)}
    >
      <motion.div
        className="relative w-12 h-6 rounded-full"
        animate={{
          backgroundColor: checked ? activeColor : inactiveColor,
        }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      >
        <motion.div
          className="absolute top-[2px] left-[2px] w-[20px] h-[20px] bg-white rounded-full shadow-md"
          animate={{
            x: checked ? 24 : 0,
          }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        />
      </motion.div>
      {label && (
        <span className="text-sm font-medium text-gray-800">{label}</span>
      )}
    </div>
  );
};

export default SwitchComponent;
