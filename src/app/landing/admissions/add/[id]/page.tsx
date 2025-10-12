import React from "react";

import HeroSection from "@/components/public/admissions/HeroSection";
import NcaSection from "@/components/public/admissions/NcaSection";
import NcaSectionc from "@/components/public/home/NcaSection";
import "./style.css";

const AdmissionCampusPage: React.FC = () => (
  <div className="content-admissions flex flex-col gap-[100px] my-14">
    <HeroSection />
    <div className="container-admissions">
        <NcaSection />
        <NcaSectionc />
    </div>
  </div>
);

export default AdmissionCampusPage;
