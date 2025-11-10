"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import style from "@/app/font.module.css";
import { useUI } from "@/providers/ui-context";
import clsx from "clsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";

export interface ModuleItemProps {
  name: string;
  label: string;
  icon?: string;
  path?: string;
  drop?: boolean;
  children?: ModuleItemProps[];
}

const ModuleItem: React.FC<ModuleItemProps> = ({ label, name, icon, path = "#", children = [] }) => {
  const {isOpenSidebar, hoverSidebar, toggleModule, selectedModule, setHoverSidebar } = useUI();

  const [isOpen, setIsOpen] = useState<{ module: string, isOpen: boolean}>({module: name, isOpen: false});
  const [selectParent, setSelectParent] = useState<boolean>(false);

  const handleModule = (module: string, open?: boolean) => {
    localStorage.removeItem("selectedModule");
    toggleModule(module);
    setHoverSidebar(false);
    localStorage.setItem("selectedModule", module);
    open && setIsOpen({ module, isOpen: true });
    open ? setSelectParent(true) : setSelectParent(false);
  }

  useEffect(() => {
    const storedModule = localStorage.getItem("selectedModule");
    if (storedModule) {
      toggleModule(storedModule);
    }
  }, []);

  return (<>
    <li>
      <Link href={children.length > 0 ? "#" : path ?? "#"} className="module-item" onClick={() => {
        handleModule(name);
        setIsOpen({ module: name, isOpen: !isOpen.isOpen });
        }} >
        <div
          className={clsx(
            "flex items-center menu-item",
            name === selectedModule || selectParent ? "active" : "",
            style["font-sidebar"],
          )}>
            <div className="content-icon">
              <img className="menu-icon" src={icon} alt="menu-icon" />
            </div>
            <div className={`flex justify-between w-full ${isOpenSidebar ? "" : "hidden"}`}>
              {hoverSidebar ? label : isOpenSidebar && label}
              {isOpenSidebar && children.length > 0 && (
                <div className="arrow-icon">
                  <FontAwesomeIcon icon={isOpen.isOpen ? faChevronUp : faChevronDown} />
                </div>
              )}
            </div>
        </div>
      </Link>
      { children.length > 0 && isOpen.isOpen &&
        <ul className="flex flex-col gap-[0.315rem] mt-[0.315rem]">
          {
            children.map((child, idx) => {
              return (
              <Link key={idx} href={`${path}${child.path}`} className="module-item" onClick={() => handleModule(child.name, true)}>
                <div
                  className={clsx(
                    "flex items-center menu-item",
                    child.name === selectedModule ? "active" : "",
                    style["font-sidebar"],
                  )}>
                    { child.label }
                </div>
              </Link>)
            })
          }
        </ul>
      }
  </li>
  </>);
};

export default ModuleItem;
