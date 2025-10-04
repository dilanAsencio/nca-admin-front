"use client";

import React, { createContext, useContext, useState } from 'react';

interface SchoolFormData {
  basicData: any;
  branches: any[];
  certifications: any;
}
interface UiContextType {
  isOpenSidebar: boolean;
  toggleSidebar: () => void;
  selectedModule: string | null;
  toggleModule: (module: string) => void;
  isVisualCardMessage: boolean;
  toggleCardMessage: () => void;
  isOpenModalColegio: boolean;
  toggleModalColegio: () => void;
  isOpenModalNivel: boolean;
  toggleModalNivel: (isOpen: boolean) => void;
  isOpenModalGrado: boolean;
  toggleModalGrado: (isOpen: boolean) => void;
  logoNexus: string;
  logoSecure: string;
  isLoading: boolean;
  toggleLoading: (loading: boolean) => void;
  iconsActions: { [key: string]: { path: string; alt: string } },
  iconsActionsTable: { [key: string]: { path: string; alt: string } },
  
  stepsCreateSchool: { label: string; value: number; formChecked: boolean }[];
  handlerSteps: (s: number) => void;
  handleCheckSteps: () => void;
  currentCampus: SchoolFormData;
  updateBasicData: (values: any) => void;
  addBranches: (headquarter: any[]) => void;
  updateCertifications: (values: any) => void;
  resetForm: () => void;
}

const UiContext = createContext<UiContextType | undefined>(undefined);

export const UIProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isOpenSidebar, setIsOpenSidebar] = useState<boolean>(true);
  const [isOpenModalColegio, setIsOppenModalColegio] = useState<boolean>(false);
  const [isOpenModalNivel, setIsOpenModalNivel] = useState<boolean>(false);
  const [isOpenModalGrado, setIsOpenModalGrado] = useState<boolean>(false);
  const [isVisualCardMessage, setIsVisualCardMessage] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedModule, setSelectedModule] = useState<string | null>("dashboard");
  const [logoNexus, setLogoNexus] = useState<string>("/assets/img/logo-nexuscore.png");
  const [logoSecure, setLogoSecure] = useState<string>("/assets/img/logo-secure.png");

  const iconsActions: { [key: string]: { path: string; alt: string } } = {
    edit: { path: "/assets/icon/edit-contained.svg", alt: "Editar" },
    delete: { path: "/assets/icon/trash-02.svg", alt: "Eliminar" },
    add: { path: "/assets/icon/plus-03.svg", alt: "Agregar" },
    // puedes agregar más acciones aquí
  };

  
  const iconsActionsTable: { [key: string]: { path: string; alt: string } } = {
    edit: { path: "/assets/icon/edit-contained-purple.svg", alt: "Editar" },
    delete: { path: "/assets/icon/trash-02-red.svg", alt: "Eliminar" },
    add: { path: "/assets/icon/plus-03.svg", alt: "Agregar" },
    // puedes agregar más acciones aquí
  };
  
  const [stepsCreateSchool, setStepsCreateSchool] = useState<any[]>([
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
  
 const handleCheckSteps = () => {
    setStepsCreateSchool((prevSteps) =>
      prevSteps.map((step) => ({ ...step, formChecked: true }))
    );
  };

  const toggleLoading = (loading: boolean) => {
    setIsLoading(loading);
  }
  
  const [currentCampus, setCurrentCampus] = useState<SchoolFormData>({
    basicData: {},
    branches: [],
    certifications: {},
  });

  const updateBasicData = (values: any) => {
    setCurrentCampus((prev) => ({ ...prev, basicData: values }));
    storageData(currentCampus);
  };

  const addBranches = (headquarter: any[]) => {
    setCurrentCampus((prev) => ({
      ...prev,
      branches: [...headquarter],
    }));
    storageData(currentCampus);
  };

  const updateCertifications = (values: any) => {
    setCurrentCampus((prev) => ({ ...prev, certifications: values }));
    storageData(currentCampus);
  };

  const resetForm = () => {
    setCurrentCampus({ basicData: {}, branches: [], certifications: {} });
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
  const toggleModalNivel = (isOpen: boolean) => {
    setIsOpenModalNivel(isOpen);
  };
  const toggleModalGrado = (isOpen: boolean) => {
    setIsOpenModalGrado(isOpen);
  };

  const value = { 
    isOpenSidebar,
    toggleSidebar,
    selectedModule,
    toggleModule,
    isVisualCardMessage,
    toggleCardMessage,
    isOpenModalColegio,
    toggleModalColegio,
    isOpenModalNivel,
    toggleModalNivel,
    isOpenModalGrado,
    toggleModalGrado,
    logoNexus,
    logoSecure,
    isLoading,
    toggleLoading,
    iconsActions,
    handleCheckSteps,
    iconsActionsTable,
    currentCampus, updateBasicData, addBranches, updateCertifications, resetForm, stepsCreateSchool, handlerSteps
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
