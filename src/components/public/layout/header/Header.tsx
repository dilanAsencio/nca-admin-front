"use client";

import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { useUI } from "@/providers/ui-context";
import NavigationMenu from "../menu/NavigationMenu";
import PublicLoginForm from "../../login/PublicLoginForm";
import UserMenu from "../../userMenu/UserMenu";

import "./style.css";
import { useSelector } from "react-redux";
import { RootState } from "@/providers/store/public-auth-store";

const Header: React.FC = () => {
  const { logoNexus } = useUI();
  const [user, setUser] = useState(
    "/assets/landing/icon/header/user-profile-01.svg"
  );
  const [openMenu, setOpenMenu] = useState(false);
  const [logoMenu, setLogoMenu] = useState(
    "/assets/landing/icon/header/menu-01.svg"
  );
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  const toggleMenu = () => {
    setOpenMenu(!openMenu);
    setLogoMenu(
      openMenu
        ? "/assets/landing/icon/header/menu-01.svg"
        : "/assets/landing/icon/header/x-01.svg"
    );
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node;
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(target) &&
        iconRef.current &&
        !iconRef.current.contains(target)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="custom-header w-full py-[0.5rem] px-[2rem] rounded-[0.5rem] flex items-center justify-between relative">
      <div className="flex items-center">
        <a href="/landing">
          <img
            src={logoNexus}
            alt="nexuscore"
            className="w-[9.625rem] h-[2rem]"
          />
        </a>
      </div>

      <NavigationMenu openMenu={openMenu} />

      <div className="content-profile">
        <div
          ref={iconRef}
          className="custom-profile hidden h-[2.813rem] w-[5.438rem] justify-between
          xl:flex xl:items-center xl:gap-3.5 xl:rounded-4xl xl:px-2 xl:py-1.5"
        >
          <img
            className="hidden xl:block"
            src={user}
            alt="user-profile"
            width={28}
            height={28}
          />
          <FontAwesomeIcon
            icon={faChevronDown}
            onClick={() => setOpen((prev) => !prev)}
            className={`w-4 h-4 transition-transform ${open ? "rotate-180" : "rotate-0"}`}
          />
        </div>
        <div className="custom-profile p-2 rounded-[0.5rem] block cursor-pointer xl:hidden">
          <img src={logoMenu} alt="menu-bars" onClick={() => toggleMenu()} />
        </div>

        {/* Dropdown */}
        {open && (
          <div
            ref={dropdownRef}
            className="absolute right-0 top-full mt-2 z-50"
          >
            {isAuthenticated ? (
              <UserMenu onLogout={() => setOpen(false)} />
            ) : (
              <PublicLoginForm onClose={() => setOpen(false)} />
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
