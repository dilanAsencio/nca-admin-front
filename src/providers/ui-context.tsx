"use client";
import React, { createContext, useContext, useState } from 'react';

interface SchoolFormData {
  basicData: any;
  headquarters: any[];
  certifications: any;
}
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
  
  stepsCreateSchool: { label: string; value: number; formChecked: boolean }[];
  handlerSteps: (s: number) => void;
  currentCampus: SchoolFormData;
  updateBasicData: (values: any) => void;
  addHeadquarter: (headquarter: any[]) => void;
  updateCertifications: (values: any) => void;
  resetForm: () => void;
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
  
  const [stepsCreateSchool, setStepsCreateSchool] = useState([
    { label: "Datos básicos", value: 1, formChecked: false },
    { label: "Datos infraestructura", value: 2, formChecked: false },
    { label: "Programas y Certificaciones", value: 3, formChecked: false },
  ]);
 const handlerSteps = (s: number) => {
    setStepsCreateSchool((prevSteps) =>
      prevSteps.map((step) =>
        step.value === s ? { ...step, formChecked: true } : step
      )
    );
  };
  
  const [currentCampus, setCurrentCampus] = useState<SchoolFormData>({
    basicData: {},
    headquarters: [],
    certifications: {},
  });

  const updateBasicData = (values: any) => {
    setCurrentCampus((prev) => ({ ...prev, basicData: values }));
    storageData(currentCampus);
  };

  const addHeadquarter = (headquarter: any[]) => {
    setCurrentCampus((prev) => ({
      ...prev,
      headquarters: [...headquarter],
    }));
    storageData(currentCampus);
  };

  const updateCertifications = (values: any) => {
    setCurrentCampus((prev) => ({ ...prev, certifications: values }));
    storageData(currentCampus);
  };

  const resetForm = () => {
    setCurrentCampus({ basicData: {}, headquarters: [], certifications: {} });
  };

  const storageData = (data: any) => {
    localStorage.removeItem("dataForm");
    localStorage.setItem("dataForm", JSON.stringify(data));
  }

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
    logoSecure,
    currentCampus, updateBasicData, addHeadquarter, updateCertifications, resetForm, stepsCreateSchool, handlerSteps
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
