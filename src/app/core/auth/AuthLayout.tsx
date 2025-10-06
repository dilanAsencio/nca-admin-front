"use client";
import React, { useState } from "react";
import BackgroundBlurRight from "@/app/core/layout/vectors/BackgroundBlurRight";
import BackgroundBlurLeft from "@/app/core/layout/vectors/BackgroundBlurLeft";
import style from "@/app/font.module.css";
import Image from "next/image";

interface AuthLayoutProps {
  children: React.ReactNode;
  showBranding?: boolean;
  showBackgrounds?: boolean;
  title?: string;
  subtitle?: string;
  maxWidth?: "sm" | "md" | "lg";
}

const AuthLayout: React.FC<AuthLayoutProps> = ({
  children,
  showBranding = true,
  showBackgrounds = true,
  title,
  subtitle,
  maxWidth = "md",
}) => {
  const [logo, setLogo] = useState("/assets/img/logo-secure.png");
  return (
    <>
      <BackgroundBlurLeft />
      <div
        className={`relative w-[100vw] h-[100vh] bg-[#FFFBEF] ${style["font-outfit"]}`}
      >
        <div className="fixed top-[50%] left-[50%] gap-[2rem] z-30 transform -translate-x-1/2 -translate-y-1/2">
          <div
            className={`grid gap-[2rem] bg-[#FFFFFF] rounded-[1.5rem] border-0 shadow-[0_16px_32px_-4px_rgba(252,69,84,0.07)]
              w-[20.938rem] px-[2rem] py-[1.5rem]
              md:w-[30.938rem] md:px-[3.75rem] md:py-[3rem]`}
          >
            {children}
          </div>
          <div className="flex items-center justify-center gap-[0.75rem] mt-[2.5rem]">
            <p className="m-0 linked-forgotpass">By</p>
            {/* <Image src={logo} priority alt="logo-nexuscore" /> */}
            <img src={logo} alt="logo-nexuscore" />
          </div>
        </div>
      </div>
      <BackgroundBlurRight />
    </>
  );
};

export default AuthLayout;
