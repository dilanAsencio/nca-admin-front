"use client";

import React, { useState } from "react";
import { useUI } from "@/providers/ui-context";
import "./style.css";
import style from "@/app/font.module.css";

const Footer: React.FC = () => {
  const { logoNexus, logoSecure } = useUI();
  const [logoFacebook, setLogoFacebook] = useState("/assets/landing/icon/footer/icon-facebook.svg");
  const [logoInstagram, setLogoInstagram] = useState("/assets/landing/icon/footer/icon-instagram.svg");
  const [logoYoutube, setLogoYoutube] = useState("/assets/landing/icon/footer/icon-youtube.svg");
  const [logoLinkedin, setLogoLinkedin] = useState("/assets/landing/icon/footer/icon-linkedin.svg");
  const [logoTwitter, setLogoTwitter] = useState("/assets/landing/icon/footer/icon-twitter.svg");

  return (
    <footer className={`${style["font-outfit"]} custom-footer w-full rounded-[0.5rem] p-8 mt-14`}>
      <div className="content-footer flex flex-col gap-[2.938rem]">
        <div className="
          flex flex-col items-center gap-4
          lg:flex-row lg:justify-between lg:items-start">
          <div className="content-logo flex flex-col gap-8 w-[15rem]">
            <a href="/landing"><img className="w-[13rem] h-[2.688rem]" src={logoNexus} alt="logo-nexus" /></a>
            <div className="flex flex-row justify-between">
              <a href="#"><img src={logoFacebook} alt="icon-facebook" /></a>
              <a href="#"><img src={logoInstagram} alt="icon-instagram" /></a>
              <a href="#"><img src={logoYoutube} alt="icon-youtube" /></a>
              <a href="#"><img src={logoLinkedin} alt="icon-linkedin" /></a>
              <a href="#"><img src={logoTwitter} alt="icon-twitter" /></a>
            </div>
          </div>
          <div className="content-routing flex flex-col gap-3">
            <div className="flex py-2 gap-2">
              <span className="m-0 font-bold text-[1rem]">Contenido</span>
            </div>
            <div className="flex flex-col gap-2 font-normal text-[1rem] content-link">
              <a href="/landing">Home</a>
              <a href="#">Colegios</a>
              <a href="#">Quienes somos</a>
              <a href="#">Visión</a>
              <a href="#">Noticias</a>
              <a href="#">Mi cuenta</a>
            </div>
          </div>
          <div className="content-legal flex flex-col gap-3">
            <div className="flex py-2 gap-2">
              <span className="m-0 font-bold text-[1rem]">Legal</span>
            </div>
            <div className="flex flex-col gap-2 font-normal text-[1rem] content-link">
              <a href="#">Términos de uso</a>
              <a href="#">Acuerdo de licencia</a>
              <a href="#">Política de privacidad</a>
              <a href="#">Información de copyright</a>
              <a href="#">Políticas de cookies</a>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2.5">
        <hr />
        <div className="flex flex-row justify-end gap-4">
          <span className="text-[0.875rem]">&copy; Copyright {new Date().getFullYear()}</span>
          <span className="text-[0.875rem]">Powered By:</span>
          <img src={logoSecure} alt="logo-securecore" width={82} height={20} />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
