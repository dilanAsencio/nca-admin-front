import React from "react";

import HeroSection from "@/components/public/admissions/HeroSection";
import Admition2Section from "@/components/public/home/Admition-2Section";
import NcaSection from "@/components/public/home/NcaSection";
import "./style.css";

const AdmissionsPage: React.FC = () => (
  <div className="content-admissions flex flex-col gap-[100px] my-14">
    <HeroSection />
    <div className="container-admissions">
        <Admition2Section />
        <NcaSection />
    </div>
  </div>
);

export default AdmissionsPage;
