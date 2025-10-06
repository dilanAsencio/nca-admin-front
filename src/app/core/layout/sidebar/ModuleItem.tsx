"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import style from "@/app/font.module.css";
import { useUI } from "@/providers/ui-context";
import clsx from "clsx";

export interface ModuleItemProps {
  name: string;
  label: string;
  icon?: string;
  path?: string;
  drop?: boolean;
  children?: ModuleItemProps[];
}

const ModuleItem: React.FC<ModuleItemProps> = ({ label, name, icon, path }) => {
  const {isOpenSidebar, hoverSidebar, toggleModule, selectedModule, setHoverSidebar } = useUI();

  const handleModule = (module: string) => {
    localStorage.removeItem("selectedModule");
    toggleModule(module);
    setHoverSidebar(false);
    localStorage.setItem("selectedModule", module);
  }

  useEffect(() => {
    const storedModule = localStorage.getItem("selectedModule");
    if (storedModule) {
      toggleModule(storedModule);
    }
  }, []);

  return (
    <Link href={path ?? "#"} className="module-item" onClick={() => handleModule(name)} >
      <div
        className={clsx(
          "flex items-center menu-item",
          name === selectedModule ? "active" : "",
          style["font-sidebar"],
        )}>
        <div className="content-icon">
          <img className="menu-icon" src={icon} alt="menu-icon" />
        </div>
        {hoverSidebar ? label : isOpenSidebar && label}
      </div>
    </Link>
  );
};

export default ModuleItem;
