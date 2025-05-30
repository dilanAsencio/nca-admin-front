"use client";
import React from "react";
import Link from "next/link";
import style from "@/app/font.module.css";
import { useUI } from "@/providers/ui-context";

interface ModuleItemProps {
  name: string;
  label: string;
  icon: string;
  path: string;
}

const ModuleItem: React.FC<ModuleItemProps> = ({ label, name, icon, path }) => {
  const {isOpenSidebar, toggleModule, selectedModule } = useUI();

  const handleModule = (module: string) => {
    toggleModule(module);
  }

  return (
    <Link href={path} className="module-item" >
      <div
        className={`flex items-center menu-item
        ${name === selectedModule ? "active" : ""}
        ${style["font-sidebar"]}`}
      >
        <div className="content-icon">
          <img className="menu-icon" src={icon} alt="menu-icon" />
        </div>
        {isOpenSidebar && label}
      </div>
    </Link>
  );
};

export default ModuleItem;
