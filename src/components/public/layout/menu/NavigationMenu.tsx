"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import RenderIcon from "./RenderIconsMenu";
import style from "@/app/font.module.css";
import "./style.css";
import { useLanding } from "@/providers/landing-context";
import clsx from "clsx";
import { useTenant } from "@/providers/tenant-context";

const NavigationMenu: React.FC<{ openMenu: boolean }> = ({ openMenu }) => {
  const { handleMenu, menuSelected } = useLanding();
  const [menuItems, setMenuItems] = useState<any[]>([
    { label: "Home", name: "home", href: "/landing", width: "auto" },
    {
      label: "Colegios",
      name: "colegios",
      href: "/landing/school",
      width: "auto",
    },
    {
      label: "Admisiones",
      name: "admisiones",
      href: "/landing/admissions",
      width: "auto",
    },
    {
      label: "Matriculas",
      name: "registrations",
      href: "/landing/registrations",
      width: "auto",
    },
    {
      label: "Certificaciones",
      name: "certificaciones",
      href: "/landing",
      width: "auto",
    },
    { label: "Noticias", name: "noticias", href: "/landing", width: "auto" },
    {
      label: "¿Quienes Somos?",
      name: "quienes-somos",
      href: "/landing",
      width: "9rem",
    },
  ]);
  useEffect(() => {
    const storedMenu = localStorage.getItem("selectedModuleLanding");
    if (storedMenu) {
      handleMenu(storedMenu);
    }
  }, []);
  useEffect(() => {
    const token = localStorage.getItem("auth_tokenP");
    if(token === null || token === undefined || token === "null") {
      setMenuItems(prevItems => prevItems.filter(item => item.name !== 'registrations'));
    }
  }, []);
  return (
    <nav className="bg-white xl:border-0 xl:bg-transparent">
      <div className="max-w-7xl flex items-center">
        <ul
          className={`m-0 p-0 xl:flex gap-2 ${openMenu ? "block" : "hidden"} xl:block
          ${openMenu ? "absolute bg-white z-30 top-[5.313rem] right-[1.875rem]" : ""}
        `}
        >
          {menuItems.map((item) => (
            <Link
              href={item.href}
              key={item.name}
              onClick={() => {
                handleMenu(item.name);
              }}
              className={clsx(
                "px-2 py-1 rounded-[0.5rem] custom-link flex flex-col items-center font-normal text-[1rem] gap-[0.75rem]",
                `w-[${item.width}]`,
                openMenu ? "flex-row" : "flex-col",
                item.name,
                `${style["font-outfit"]}`,
                menuSelected === item.name
                  ? "active"
                  : menuSelected === null && item.name === "home"
                    ? "active"
                    : ""
              )}
            >
              <RenderIcon name={item.name} />
              {item.label}
            </Link>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default NavigationMenu;
