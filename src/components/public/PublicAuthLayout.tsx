"use client";
import React from "react";
import BackgroundBlurRight from "@/components/layout/vectors/BackgroundBlurRight";
import BackgroundBlurLeft from "@/components/layout/vectors/BackgroundBlurLeft";
import style from "@/app/font.module.css";

interface PublicAuthLayoutProps {
  children: React.ReactNode;
}

const PublicAuthLayout: React.FC<PublicAuthLayoutProps> = ({ children }) => {
  return (
    <>
      <BackgroundBlurLeft />
      <div
        className={`relative flex items-center justify-center w-screen h-screen bg-[#FFFBEF] ${style["font-outfit"]}`}
      >
        <div className="z-30 w-full max-w-5xl p-4">{children}</div>
      </div>
      <BackgroundBlurRight />
    </>
  );
};

export default PublicAuthLayout;
