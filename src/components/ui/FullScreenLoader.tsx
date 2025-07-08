"use client";

import React from "react";

const FullScreenLoader = () => (
  <div
    className="fixed inset-0 w-screen h-screen bg-white/70 z-[9999] flex items-center justify-center transition-opacity duration-200"
  >
    <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" role="status">
      <span className="sr-only">Cargando...</span>
    </div>
  </div>
);

export default FullScreenLoader;