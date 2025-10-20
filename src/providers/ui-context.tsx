"use client";

import { AcademicGradeForm, AcademicGradeResponse } from '@/app/core/interfaces/academicManagement/academic-grade-interfaces';
import { AcademicLevelForm, AcademicLevelResponse } from '@/app/core/interfaces/academicManagement/academic-level-interfaces';
import { CampusForm } from '@/app/core/interfaces/academicManagement/campus-interfaces';
import React, { createContext, useContext, useState } from 'react';

interface SchoolFormData {
  basicData: any | {};
  branches: any[];
  certifications: any;
}
interface UiContextType {
  isOpenSidebar: boolean;
  toggleSidebar: () => void;
  closeSidebar: () => void;
  selectedModule: string | null;
  toggleModule: (module: string) => void;
  isVisualCardMessage: boolean;
  toggleCardMessage: () => void;
  isOpenModalColegio: boolean;
  toggleModalColegio: () => void;
  isOpenModalNivel: { isOpen: boolean; op: "add" | "edit" | "view", data?: AcademicLevelResponse | null };
  toggleModalNivel: (isOpen: boolean, op: "add" | "edit" | "view", data?: AcademicLevelResponse | null) => void;
  isOpenModalGrado: { isOpen: boolean; op: "add" | "edit" | "view", data?: AcademicGradeResponse | null };
  toggleModalGrado: (isOpen: boolean, op: "add" | "edit" | "view", data?: AcademicGradeResponse | null) => void;
  optionsLevels: {label: string; value: string}[];
  handleOptionLevel: (levels: {label: string; value: string}[]) => void;
  logoNexus: string;
  logoSecure: string;
  isLoading: boolean;
  toggleLoading: (loading: boolean) => void;
  iconsActions: { [key: string]: { path: string; alt: string } },
  hoverSidebar: boolean;
  setHoverSidebar: (value: boolean) => void;
  
  stepsCreateSchool: { label: string; value: number; formChecked: boolean, navCheck: boolean }[];
  handleDownChecks: () => void;
  handlerSteps: (s: number) => void;
  activeNavSteps: (s: number) => void;
  handleCheckSteps: () => void;
  currentCampus: SchoolFormData;
  updateBasicData: (values: CampusForm) => void;
  addBranches: (headquarter: any[]) => void;
  updateCertifications: (values: any) => void;
  resetForm: () => void;
}

const UiContext = createContext<UiContextType | undefined>(undefined);

export const UIProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isOpenSidebar, setIsOpenSidebar] = useState<boolean>(true);
  const [isOpenModalColegio, setIsOppenModalColegio] = useState<boolean>(false);
  const [isOpenModalNivel, setIsOpenModalNivel] = useState<{ isOpen: boolean; op: "add" | "edit" | "view", data?: AcademicLevelResponse | null}>({ isOpen: false, op: "add" });
  const [isOpenModalGrado, setIsOpenModalGrado] = useState<{ isOpen: boolean; op: "add" | "edit" | "view", data?: AcademicGradeResponse | null}>({ isOpen: false, op: "add" });
  const [isVisualCardMessage, setIsVisualCardMessage] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedModule, setSelectedModule] = useState<string | null>("dashboard");
  const [logoNexus, setLogoNexus] = useState<string>("/assets/img/logo-nexuscore.png");
  const [logoSecure, setLogoSecure] = useState<string>("/assets/img/logo-secure.png");
  const [hoverSidebar, setHoverSidebar] = useState<boolean>(false);
  const [optionsLevels, setOptionsLevels] = useState<{label: string; value: string}[]>([]);

  const iconsActions: { [key: string]: { path: string; alt: string } } = {
    edit: { path: "/assets/icon/edit-contained-purple.svg", alt: "Editar" },
    delete: { path: "/assets/icon/trash-02-red.svg", alt: "Eliminar" },
    reject: { path: "/assets/icon/minus-circle-contained-red.svg", alt: "Rechazar" },
    approve: { path: "/assets/icon/state-yes.svg", alt: "Aprobar" },
    add: { path: "/assets/icon/plus-03.svg", alt: "Agregar" },
    view: { path: "/assets/icon/eye-open-purple.svg", alt: "Detalle" },
    comment: { path: "/assets/icon/edit-contained-purple.svg", alt: "Comentar" },
    filter: { path: "/assets/icon/filter.svg", alt: "Filtrar" },
    // puedes agregar más acciones aquí
  };

  const handleOptionLevel = (levels: {label: string; value: string}[]) => {
    setOptionsLevels(levels || []);
  }
  
  const [stepsCreateSchool, setStepsCreateSchool] = useState<any[]>([
    { label: "Datos básicos", value: 1, formChecked: false, navCheck: false },
    { label: "Datos infraestructura", value: 2, formChecked: false, navCheck: false },
    { label: "Programas y Certificaciones", value: 3, formChecked: false, navCheck: false },
  ]);
 const handlerSteps = (s: number) => {
    setStepsCreateSchool((prevSteps) =>
      prevSteps.map((step) =>
        step.value === s ? { ...step, formChecked: true} : step
      )
    );
    activeNavSteps(s);
  };

  const activeNavSteps = (s: number) => {
    setStepsCreateSchool((prevSteps) =>
      prevSteps.map((step) =>
        step.value === s ? { ...step, navCheck: true } : step
      )
    );
  };
  
 const handleCheckSteps = () => {
    setStepsCreateSchool((prevSteps) =>
      prevSteps.map((step) => ({ ...step, formChecked: true }))
    );
  };
  const handleDownChecks = () => {
    setStepsCreateSchool((prevSteps) =>
      prevSteps.map((step) => ({ ...step, formChecked: false, navCheck: false }))
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

  const updateBasicData = (values: CampusForm) => {
    setCurrentCampus((prev) => ({ ...prev, basicData: values }));
    storageData(currentCampus);
  };

  const addBranches = (headquarter: any[]) => {
    setCurrentCampus((prev) => ({
      ...prev,
      branches: [...prev.branches, ...headquarter],
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
  const closeSidebar = () => {
    localStorage.setItem("sidebarOpen", "0");
    setIsOpenSidebar(false);
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
  const toggleModalNivel = (isOpen: boolean, op: "add" | "edit" | "view", data?: AcademicLevelResponse | null) => {
    setIsOpenModalNivel({isOpen, op, data});
  };
  const toggleModalGrado = (isOpen: boolean, op: "add" | "edit" | "view", data?: AcademicGradeResponse | null) => {
    setIsOpenModalGrado({isOpen, op, data});
  };

  const value = {
    hoverSidebar,
    setHoverSidebar,
    isOpenSidebar,
    toggleSidebar,
    closeSidebar,
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
    handleOptionLevel,
    optionsLevels,
    logoNexus,
    logoSecure,
    isLoading,
    toggleLoading,
    iconsActions,
    handleCheckSteps,
    handleDownChecks,
    activeNavSteps,
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
