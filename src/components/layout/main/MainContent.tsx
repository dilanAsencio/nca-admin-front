"use client";
import React, { useEffect } from "react";
import { useUI } from "@/providers/ui-context";
import Header from "@/components/layout/header/header";
import SidebarMenu from "@/components/layout/sidebar/SidebarMenu";
import { useSelector } from "react-redux";
import { RootState } from "@/providers/store";
import { usePathname, useRouter } from "next/navigation";

const MainContent: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isOpenSidebar } = useUI();
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const router = useRouter();
  const pathname = usePathname();
  
  const whiteList = ["/login", "/reset-password", "/forgot-password", "/change-password", "/landing"];
  const isLandingRoute = pathname.startsWith("/landing");
  // Redirige si ya está autenticado y está en una ruta pública
  // useEffect(() => {
  //   if (isAuthenticated && whiteList.includes(pathname)) {
  //     router.replace("/");
  //   }
  // }, [isAuthenticated, pathname, router]);

  return (<>
    { isAuthenticated && !whiteList.includes(pathname) && !isLandingRoute && <Header />}
    { isAuthenticated && !whiteList.includes(pathname) && !isLandingRoute && <SidebarMenu />}
    <main
      className={`
        transition-all duration-400 ease-in-out px-[1.5rem]
        ${whiteList.includes(pathname) ? 
          "" : isOpenSidebar ? "ml-[15rem]" : "ml-[4rem]"
        }
      `}
    >
      {children}
    </main></>
  );
};
export default MainContent;
