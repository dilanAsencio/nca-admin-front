"use client";
import React, { useEffect, useRef } from "react";
import { useUI } from "@/providers/ui-context";
import Header from "@/app/core/layout/header/header";
import SidebarMenu from "@/app/core/layout/sidebar/SidebarMenu";
import { useSelector } from "react-redux";
import { RootState } from "@/providers/store";
import { usePathname } from "next/navigation";
import ReduxLoaderOverlay from "@/components/ui/ReduxLoaderOverlay";
import clsx from "clsx";
import "./style.css"

const MainContent: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isOpenSidebar, closeSidebar, setHoverSidebar } = useUI();
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const pathname = usePathname();
  
  const whiteList = ["/login", "/reset-password", "/forgot-password", "/change-password", "/landing", "/auth/register"];
  const isLandingRoute = pathname.startsWith("/landing");
  const lastWidthRef = useRef(window.innerWidth);
  
  useEffect(() => {
    const handleResize = () => {
      const currentWidth = window.innerWidth;
      if (lastWidthRef.current >= 1150 && currentWidth < 1150) {
        closeSidebar();
      }
      lastWidthRef.current = currentWidth;
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [closeSidebar]);

  return (<>
  
    <ReduxLoaderOverlay />
    { isAuthenticated && !whiteList.includes(pathname) && !isLandingRoute && <Header />}
    { isAuthenticated && !whiteList.includes(pathname) && !isLandingRoute && <SidebarMenu />}
    <main
      onMouseEnter={() => {if (window.innerWidth < 768) {setHoverSidebar(false); closeSidebar()}}}
      className={clsx(
        "content-main",
        `transition-all duration-400 ease-in-out px-[1.5rem]`,
        whiteList.includes(pathname) ? 
          "" : isOpenSidebar ? "ml-[15rem]" : "ml-[4rem]",
        )}
    >
      {children}
    </main></>
  );
};
export default MainContent;
