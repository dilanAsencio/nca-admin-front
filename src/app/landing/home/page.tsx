import React from "react";

import HeroSection from "@/components/public/home/HeroSection";
import NewsSection from "@/components/public/home/NewsSection";
import SchoolSection from "@/components/public/home/SchoolSection";
import CollegeGrid from "@/components/public/home/school/CollegeGrid";
import TestimonialSection from "@/components/public/home/TestimonialSection";
import AdmitionSection from "@/components/public/home/AdmitionSection";
import ToDoAdmitionSection from "@/components/public/home/ToDoAdmitionSection";
import Admition2Section from "@/components/public/home/Admition-2Section";
import RutesSection from "@/components/public/home/RutesSection";
import ComboCardSection from "@/components/public/home/ComboCardsSection";
import NcaSection from "@/components/public/home/NcaSection";

const HomePage: React.FC = () => (
  <div className="content-home flex flex-col gap-14 my-14">
    <HeroSection />
    <AdmitionSection />
    <ToDoAdmitionSection />
    <NcaSection />
    <Admition2Section />
    <RutesSection />
    <ComboCardSection />
    <CollegeGrid />
    <SchoolSection />
    <NewsSection />
    <TestimonialSection />
  </div>
);

export default HomePage;
