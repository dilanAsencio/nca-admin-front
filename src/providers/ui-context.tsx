"use client";
import React, { createContext, useContext, useState } from 'react';

interface UiContextType {
  isOpenSidebar: boolean;
  toggleSidebar: () => void;
  selectedModule: string | null;
  toggleModule: (module: string) => void;
  isVisualCardMessage: boolean;
  toggleCardMessage: () => void;
  isOppenModalColegio: boolean;
  toggleModalColegio: () => void;
  isOpenModalNivel: boolean;
  toggleModalNivel: () => void;
  isOpenModalGrado: boolean;
  toggleModalGrado: () => void;
  logoNexus: string;
  logoSecure: string;
}

const UiContext = createContext<UiContextType | undefined>(undefined);

export const UIProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isOpenSidebar, setIsOpenSidebar] = useState(true);
  const [isOppenModalColegio, setIsOppenModalColegio] = useState(false);
  const [isOpenModalNivel, setIsOpenModalNivel] = useState(false);
  const [isOpenModalGrado, setIsOpenModalGrado] = useState(false);
  const [isVisualCardMessage, setIsVisualCardMessage] = useState(false);
  const [selectedModule, setSelectedModule] = useState<string | null>("dashboard");
  const [logoNexus, setLogoNexus] = useState("/assets/img/logo-nexuscore.png");
  const [logoSecure, setLogoSecure] = useState("/assets/img/logo-secure.png");

  const toggleSidebar = () => {
    localStorage.setItem("sidebarOpen", isOpenSidebar ? "0" : "1");
    setIsOpenSidebar(prev => !prev);
  };

  const toggleModule = (module: string) => {
    setSelectedModule(module);
  };

  const toggleCardMessage = () => {
    setIsVisualCardMessage(prev => !prev);
  };
  
  const toggleModalColegio = () => {
    setIsOppenModalColegio(prev => !prev);
  };
  const toggleModalNivel = () => {
    setIsOpenModalNivel(prev => !prev);
  };
  const toggleModalGrado = () => {
    setIsOpenModalGrado(prev => !prev);
  };

  const value = { 
    isOpenSidebar,
    toggleSidebar,
    selectedModule,
    toggleModule,
    isVisualCardMessage,
    toggleCardMessage,
    isOppenModalColegio,
    toggleModalColegio,
    isOpenModalNivel,
    toggleModalNivel,
    isOpenModalGrado,
    toggleModalGrado,
    logoNexus,
    logoSecure
  };

  return (
    <UiContext.Provider value={value}>
      {children}
    </UiContext.Provider>
  );
};

export const useUI = () => {
  const context = useContext(UiContext);
  if (!context) {
    throw new Error('useUI must be used within a UIProvider');
  }
  return context;
};
