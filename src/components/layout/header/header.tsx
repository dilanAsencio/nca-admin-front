"use client";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";

import UserInfo from "./user-info";
import "./header.css";
import { useUI } from "@/providers/ui-context";
import { logout } from "@/providers/store";
import { useDispatch } from "react-redux";

const Header = () => {
  const [isDrop, setIsDrop] = useState<boolean>(false);
  const { isOpenSidebar, toggleSidebar } = useUI();
  const dispatch = useDispatch();

  const handleLogout = () => {
    localStorage.removeItem("auth_token");
    dispatch(logout());
  };

  return (
    <header className={`header flex justify-between bg-[#FC4554] h-[4.5rem] transition-all duration-400 ease-in-out ${isOpenSidebar ? "ml-[15rem]" : "ml-[4rem]"}`}>
      <div className="header-title flex items-center pl-[1.5rem] py-[1rem] gap-[1rem]">
        <div className="hover-icon-header p-[0.5rem]" onClick={toggleSidebar}>
          <img src="/assets/icon/header/drop-sidebar.svg" className="w-[1.5rem] h-[1.5rem]" alt="drop-sidebar" />
        </div>
        <div className="relative flex items-center">
          <input
            type="text"
            className="w-[19.438rem] bg-[#FFFFFF] h-[2.5rem] rounded-[2.25rem] border-[#C6B4B4] border-solid border-1 gap-[0.25]
            pl-[2.7rem]"
            placeholder="Input placeholder"
          />
          <img
            className="absolute left-3"
            src="/assets/icon/header/search.svg"
            alt="search-icon"
          />
        </div>
      </div>
      <div className="header-actions flex items-center pr-[1.5rem]">
        <div className="hover-icon-header p-[0.5rem]">
          <img
            className="w-[1.5rem] h-[1.5rem]"
            src="/assets/icon/header/bell-notificate.svg" 
            alt="drop-sidebar" />
        </div>
        <UserInfo isOpen={isDrop} setIsOpen={setIsDrop} />
        { isDrop &&
          <div className="content-logout absolute z-10 bg-[#ffff] py-[0.5rem] top-[7%] right-[3%] border-solid border-1 border-[#00000026]">
            <ul className="p-0 m-0 ul-items">
              <li className="flex items-center gap-[0.5rem] p-[0.5rem] li-item" onClick={() => handleLogout()}>
                <FontAwesomeIcon icon={faArrowRightFromBracket} />
                <span >Cerrar sesión</span>
              </li>
            </ul>
          </div>
        }
      </div>
    </header>
  );
};

export default Header;
