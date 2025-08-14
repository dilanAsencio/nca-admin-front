"use client";
import React, { createContext, useContext, useState } from "react";

interface LandingContextType {
  menuSelected: string | null;
  handleMenu: (selected: string) => void;
}

const LandingContext = createContext<LandingContextType | undefined>(undefined);

export const LandingProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [menuSelected, setMenuSelected] = useState<string | null>(null);

  const handleMenu = (selected: string) => {
    setMenuSelected(selected);
  };

  const value = {
    menuSelected,
    handleMenu,
  };

  return (
    <LandingContext.Provider value={value}>{children}</LandingContext.Provider>
  );
};

export const useLanding = () => {
  const context = useContext(LandingContext);
  if (!context) {
    throw new Error("useUI must be used within a LandingProvider");
  }
  return context;
};
