"use client";
import React, { useEffect } from "react";

import HeroSection from "@/components/public/admissions/HeroSection";
import NcaSection from "@/components/public/admissions/NcaSection";
import NcaSectionc from "@/components/public/home/NcaSection";
import "./style.css";
import { useLanding } from "@/providers/landing-context";
import MainAuthAdmissions from "./components/MainAuthAdmissions";

const AdmissionsPage: React.FC = () => {

  const { handleMenu } = useLanding();
  const [isAuth, setIsAuth] = React.useState(false);

  useEffect(() => {
    handleMenu("admisiones")
  }, []);

  useEffect(() => {
    const isAuth = Boolean(localStorage.getItem("auth_tokenP"));
    setIsAuth(isAuth);
  }, []);

  return (<>
  { isAuth ? 
    <MainAuthAdmissions />
  :
    <div className="content-admissions flex flex-col gap-[100px] my-14">
      <HeroSection />
      <div className="container-admissions">
        <NcaSection />
        <NcaSectionc />
      </div>
    </div>
  }
  </>);
};

export default AdmissionsPage;
