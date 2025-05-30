"use client";
import React from "react";
import ModuleItem from "./ModuleItem";
import "./sidebar.css";
import { useUI } from "@/providers/ui-context";

const SidebarMenu: React.FC = () => {
  const { isOpenSidebar } = useUI();
  const modules = [
    {
      label: "Gestión Académica",
      name: "dashboard",
      path: "/",
      icon: "/assets/icon/sidebar/graduetion.svg",
    },
    {
      label: "Adminisiones",
      name: "#",
      path: "/dashboard",
      icon: "/assets/icon/sidebar/users-profiles-up.svg",
    },
    {
      label: "Personas",
      name: "#",
      path: "/dashboard",
      icon: "/assets/icon/sidebar/user-profile.svg",
    },
    {
      label: "Activos",
      name: "#",
      path: "/dashboard",
      icon: "/assets/icon/sidebar/file-branch.svg",
    },
    {
      label: "Rutas",
      name: "#",
      path: "/dashboard",
      icon: "/assets/icon/sidebar/icon-schoolbus.svg",
    },
    { label: "Agendas",
      name: "#",
      path: "/dashboard",
      icon: "/assets/icon/sidebar/calendar.svg" },
    {
      label: "Certificaciones",
      name: "#",
      path: "/dashboard",
      icon: "/assets/icon/sidebar/certified.svg",
    },
    {
      label: "Control de Accesos",
      name: "#",
      path: "/dashboard",
      icon: "/assets/icon/sidebar/lock-open.svg",
    },
    {
      label: "Personalización",
      name: "#",
      path: "/dashboard",
      icon: "/assets/icon/sidebar/settings.svg",
    },
    // Agrega más módulos según sea necesario
  ];

  return (
    <aside
      className={`sidebar fixed top-0 left-0 bottom-0 h-svh transition-all duration-400 ease-in-out 
        bg-[#FFFFFF] box-shadow-[0px_7px_21px_0px_#451A1A0A]
        py-[1.5rem] flex justify-between ${isOpenSidebar ? "w-[15rem] pl-[1rem]" : "w-[4rem]"}`}
    >
      <div className="flex flex-col items-center gap-[3.5rem] w-[100%]">
        <div className="sidebar-header pt-[1.563rem]">
          <img
            src={`/assets/img/${isOpenSidebar ? "logo-nc-aca" : "logo-nc-aca-light"}.svg`}
            className={`${isOpenSidebar ? "pl-[1rem]" : "px-[0.75rem]"}`} alt="logo-nexus" />
        </div>
        <nav className="sidebar-nav overflow-y-auto w-[100%] flex flex-col gap-[0.313rem]">
          {modules.map((module) => (
            <ModuleItem
              key={module.label}
              path={module.path}
              label={module.label}
              name={module.name}
              icon={module.icon}
            />
          ))}
        </nav>
      </div>
    </aside>
  );
};

export default SidebarMenu;
