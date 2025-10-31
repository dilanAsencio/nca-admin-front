"use client";
import React, { useEffect } from "react";

import HeroSection from "@/components/public/home/HeroSection";
import NewsSection from "@/components/public/home/NewsSection";
import SchoolSection from "@/components/public/home/SchoolSection";
import CollegeGrid from "@/components/public/home/school/CollegeGrid";
import TestimonialSection from "@/components/public/home/TestimonialSection";
import AdmitionSection from "@/components/public/home/AdmitionSection";
import ToDoAdmitionSection from "@/components/public/home/ToDoAdmitionSection";
import { useLanding } from "@/providers/landing-context";

const HomePage: React.FC = () => {
 const { handleMenu} = useLanding();
  useEffect(() => {

    handleMenu("home");
  }, []);
  return (
  <div className="content-home flex flex-col gap-14 my-14">
    <HeroSection />
    <AdmitionSection />
    <ToDoAdmitionSection />
    <CollegeGrid />
    <SchoolSection />
    <NewsSection />
    <TestimonialSection />
  </div>
);
}
export default HomePage;
